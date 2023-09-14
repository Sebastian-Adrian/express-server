const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const emailConfig = require('./emailConfig.js');
const path = require('path')
const transporter = nodemailer.createTransport(emailConfig);
const app = express();


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'dist/index.html');
});




// E-Mail-Versandroute
app.post('/api/send-email', async (req, res) => {
    const { from, subject, text, name } = req.body;

    const mailOptions = {
        to: emailConfig.auth.user,
        from: `${name} <${from}>`,
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