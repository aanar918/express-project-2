const express = require("express");
const app = express();
const json = require("../data/books.json");

app.set("view engine", "ejs");

/*
        Renders
*/


//  home page

const data = json.books;
app.get("/", function (req, res) {
  const limit = 3;
  let randomData = [];
  const dataLength = data.length;
  let prevRands = [];

  let i = 0;
  while (i < limit) {
    const randomIndex = Math.floor(Math.random() * (dataLength - 1));
    if (!prevRands.includes(randomIndex)) {
      randomData.push(data[randomIndex]);
      prevRands.push(randomIndex);
      // console.log(prevRands);
      i++;
    } else continue;
  }
  // console.log("-------");

  let show = randomData;
  res.render("pages/books", {
    show,
    limit,
  });
});

//  api docs page

app.get("/apis", function (req, res) {
  res.render("pages/api");
});

//  about page

app.get("/about", function (req, res) {
  res.render("pages/about");
});

//  all books page

app.get("/all-books", function (req, res) {
  let show = data;
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
        Not found page
*/

app.get("/*", (req, res) => {
  res.render("pages/not-found");
});

 module.exports = app