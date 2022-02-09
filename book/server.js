// load the things we need
const e = require('express');
const express = require('express');
const app = express();
const port = 3004;
const json = require('./data/books.json');
// const router = express.Router();
// app.use('/', router);

debugger
//  set the view engine to ejs
app.set('view engine', 'ejs');

//  using res.render to load up an ejs view file

//  home page 

const data = json.books;
app.get('/', function(req, res) {
    
    const limit = 3;
    let randomData = [];
    const dataLength = data.length;
    let prevRand = -1;
    
    let i = 0
    while(i < limit) {
        const randomIndex = Math.floor(Math.random() * (dataLength -  1));
        if(prevRand !== randomIndex) {
            randomData.push(data[randomIndex]);
            prevRand = randomIndex
            console.log(prevRand);
            i++;
        }
    }
    console.log('-------');

    let show = randomData;
    res.render('pages/books', {
        show,
        limit
    });
});

//  about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

//  all books page
app.get('/all-books', function(req, res) {
    let show = data;
    // res.json(data);
    res.render('pages/books', {
        show
    });
});

//  add page
app.get('/add', function(req, res) {
    const keys = Object.keys(data[0]);
    res.render('pages/add', {
        keys 
    });
});

//  not found page
app.get('/*', (req, res) => {
    res.render('pages/not-found');
});

app.listen(port);
console.log(`http://localhost/${port}`);
