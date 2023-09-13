const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const emailConfig = require('./emailConfig.js');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport(emailConfig);

// E-Mail-Versandroute
app.post('/api/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: emailConfig.auth.user,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('E-Mail erfolgreich gesendet');
        res.sendStatus(200);
    } catch (error) {
        console.error('Fehler beim Senden der E-Mail', error);
        res.status(500).send('Fehler beim Senden der E-Mail');
    }
});

// Express-Server starten
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});