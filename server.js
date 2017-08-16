const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();//makes the express app
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to appen to server.log');
        }
    });
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenence.hbs');
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {//this is a basic route
    res.render('home.hbs', {
        pageTitle: 'This is some text that I have added to the document',
        welcomeMessage: 'Welcome to my site this is awesome',
        currentYear: new Date().getFullYear()
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});
//this will show a json message that there was an error
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});
// /bad route for when the request fails, send back json data, with an errorMessage

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
