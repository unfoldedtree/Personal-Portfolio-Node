const mailer = require('./mailer.js');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.get('/assets/img/open-graph/ogimage.jpg', function (req, res) {
    res.render('/assets/img/open-graph/ogimage.jpg')
})

app.get('/*', function (req, res) {
    res.redirect('/');
});

app.post('/service/send', async function (req, res) {
    const { name, message } = req.body
    
    const resp = await mailer.sendEmail(name, message)

    res.status(resp.status).send({ content: resp.message })
})

const server = app.listen((process.env.PORT || 3000), () => {
    const port = server.address().port
    console.log(`Express is working on port ${port}.`)
});

