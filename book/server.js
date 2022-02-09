// load the things we need
const e = require("express");
const express = require("express");
const app = express();
const port = 3004;
const json = require("./data/books.json");
// const router = express.Router();
// app.use('/', router);

app.set("view engine", "ejs");

//  using res.render to load up an ejs view file

//  home page

const data = json.books;
app.get("/", function (req, res) {
  const limit = 3;
  let randomData = [];
  const dataLength = data.length;
  let prevRand = -1;

  let i = 0;
  while (i < limit) {
    const randomIndex = Math.floor(Math.random() * (dataLength - 1));
    if (prevRand !== randomIndex) {
      randomData.push(data[randomIndex]);
      prevRand = randomIndex;
      console.log(prevRand);
      i++;
    }
  }
  console.log("-------");

  let show = randomData;
  res.render("pages/books", {
    show,
    limit,
  });
});

//  about page
app.get("/about", function (req, res) {
  res.render("pages/about");
});

//  all books page
app.get("/all-books", function (req, res) {
  let show = data;
  // res.json(data);
  res.render("pages/books", {
    show,
  });
});

//  add page
app.get("/add", function (req, res) {
  const keys = Object.keys(data[0]);
  res.render("pages/add", {
    keys,
  });
});

/*  
        Custom APIs
*/

app.get("/sorted-by-latest", (req, res) => {
  let toSort = data;
  function customSort(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? 1 : x > y ? -1 : 0;
    });
  }
  const show = customSort(toSort, "published");

  //   res.render("pages/books", {
  //       show
  //   })

  res.json(show);
});

app.get("/authors", (req, res) => {
  let show = { data: [] };

  data.forEach((i) => {
    show.data.push(i.author);
  });

  res.json(show);
});

//  book info
app.get("/allbooks", (req, res) => {
  let show = { data: [] };
  show.data.push(data);
  res.json(show);
});

// get book by 'isbn'

app.get("/search-by-item", (req, res) => {
  function searchByItem(array, searchingItem) {
    let result = array.filter((i) => {
      if (i.isbn === searchingItem) {
        return i;
      }
    });
    return result;
  }
  res.json(searchByItem(data, "9781484242216"));
});

// get book by 'title'

app.get("/search-by-title", (req, res) => {
  function searchByTitle(array, title) {
    let result = array.filter((i) => {
      if (i.title === title) {
        return i;
      }
    });
    return result;
  }
  res.json(searchByTitle(data, "Pro Git"));
});

// get book by max pages

app.get("/book-with-most-pages", (req, res) => {
  let show = { data: [] };
  let maxPages;
  let max = -9999999999999;

  for (let i = 0; i < data.length; i++) {
    const pages = data[i].pages;
    if (pages > max) {
      max = pages;
      maxPages = data[i];
    }
  }
  show.data.push(maxPages);
  res.json(show);
});

// get book by min pages

app.get("/book-with-least-pages", (req, res) => {
  let show = { data: [] };
  let minPages;
  let min = 9999999999999;

  for (let i = 0; i < data.length; i++) {
    const pages = data[i].pages;
    if (pages < min) {
      min = pages;
      minPages = data[i];
    }
  }
  show.data.push(minPages);
  res.json(show);
});

// get book by min pages

app.get("/publisher-occurences", (req, res) => {
  let show = { data: [] };
  let tmp = [];

  for (let i = 0; i < data.length; i++) {
    tmp.push(data[i].publisher);
  }
  console.log(tmp);

  result = tmp.reduce((acc, curr) => {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});
  show.data.push(result);

  res.json(show);
});

/*
        Not found page
*/

app.get("/*", (req, res) => {
  res.render("pages/not-found");
});

/*
        Not found page
*/

app.listen(port);
