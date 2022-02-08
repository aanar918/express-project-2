// load the things we need
const express = require('express');
const app = express();
const port = 3004;
let json = require('./data/books.json');

//  set the view engine to ejs
app.set('view engine', 'ejs');

//  use res.render to load up an ejs view file

//  index page 
const data = json.books;

app.get('/', function(req, res) {
    res.render('pages/books', {
        data
    });
});

//  about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

//  about page
app.get('/add', function(req, res) {
    const keys = Object.keys(data[0])
    res.render('pages/add', {
        keys
    });
});

//  not found page
app.get('/*', (res, req) => {
    res.render('pages/not-found');
});

app.listen(port);
console.log(`http://localhost/${port}`);
