const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const BASE_URL = "https://personal-portfolio-node-redesign.willmcmahan.repl.co/"
// const EMAIL_PASS = process.env['EMAIL_PASS']
const EMAIL_USER = process.env['EMAIL_USER']
const CLIENT_ID = process.env['CLIENT_ID']
const CLIENT_SECRET = process.env['CLIENT_SECRET']
const REFRESH_TOKEN = process.env['REFRESH_TOKEN']

const oauth2Client = new OAuth2(
     CLIENT_ID, // ClientID
     CLIENT_SECRET, // Client Secret
     BASE_URL // Redirect URL
);

oauth2Client.setCredentials({
     refresh_token: REFRESH_TOKEN
});

const accessToken = oauth2Client.getAccessToken()

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS
//   }
// });

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: EMAIL_USER, 
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.get('/*', function (req, res) {
    res.redirect('/');
});

app.post('/service/send', function (req, res) {
    const { name, message } = req.body

    const mailOptions = {
        from: EMAIL_USER,
        to: 'wmcmahan14@gmail.com',
        subject: name,
        text: message
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(500).send({ content: "Unfortunately, there was an issue on the backend and the email did not send. Please try again, I would like to discuss this opportunity further."});
            console.log(error);
        } else {
            res.status(200).send({ content: "Thanks for reaching out to me! I look forward to discussing this opportunity further."});
            console.log('Email sent: ' + info.response);
        }
    });
    
})

const server = app.listen((process.env.PORT || 3000), () => {
    const port = server.address().port
    console.log(`Express is working on port ${port}.`)
});

