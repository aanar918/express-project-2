const express = require("express");
const app = express();
const json = require("../data/books.json");

const data = json.books;

/*  
        Custom APIs
*/

//      sorted by latest

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

  res.json(show);
});

//      show authors only

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

// get book with most pages

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

// get book with least pages

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

//      get publisher occurences

app.get("/publisher-occurences", (req, res) => {
  let show = { data: [] };
  let publishers = [];

  for (let i = 0; i < data.length; i++) {
    publishers.push(data[i].publisher);
  }

  result = publishers.reduce((acc, curr) => {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});
  show.data.push(result);

  res.json(show);
});

module.exports = app 