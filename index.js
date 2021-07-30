const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/index', function (req, res) {
    res.render('index.html');
});

app.get('/projects', function (req, res) {
    res.render('projects.html');
});

app.get('/hire-me', function (req, res) {
    res.render('hire-me.html');
});

app.get('/resume', function (req, res) {
    res.render('cv.html');
});

const server = app.listen((process.env.PORT || 3000), () => {
    const port = server.address().port
    console.log(`Express is working on port ${port}.`)
});

