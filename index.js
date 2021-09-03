const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');

const EMAIL_PASS = process.env['EMAIL_PASS']
const EMAIL_USER = process.env['EMAIL_USER']

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.get('/index', function (req, res) {
    res.redirect('/');
});

app.get('/projects', function (req, res) {
    res.render('projects.ejs');
});

app.get('/hire-me', function (req, res) {
    res.render('hire-me.ejs');
});

app.get('/resume', function (req, res) {
    res.render('cv.ejs');
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
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).send({})
})

const server = app.listen((process.env.PORT || 3000), () => {
    const port = server.address().port
    console.log(`Express is working on port ${port}.`)
});

