const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const ROOT_URL = '/home/runner/Personal-Portfolio/views/' 

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log("Listening on port 3000.")
});

app.get('/', function (req, res) {
    res.sendFile(ROOT_URL + 'index.html');
});

app.get('/index', function (req, res) {
    res.sendFile(ROOT_URL + 'index.html');
});

app.get('/projects', function (req, res) {
    res.sendFile(ROOT_URL + 'projects.html');
});

app.get('/hire-me', function (req, res) {
    res.sendFile(ROOT_URL + 'hire-me.html');
});

app.get('/resume', function (req, res) {
    res.sendFile(ROOT_URL + 'cv.html');
});

