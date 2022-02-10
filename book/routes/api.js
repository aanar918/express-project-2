const express = require("express");
const app = express();
const json = require("../data/books.json");

const data = json.books;

/*
		Custom functions
*/

//		Search by item value

function searchByValue(array, searchingItem, key) {

	const map = new Map();
	for(let i = 0; i < array.length; i++) {
		map.set(array[i].isbn, array[i]);
		console.log(map.has(array[i].isbn), array[i]);

	}
	// let targetKey = key + '';
	// targetKey = targetKey.toString();
	// console.log(targetKey)
	// console.log(map);
	
  let result = array.filter((i) => {
	//   console.log(i)
    if (i.title === searchingItem) {
      return i;
    }
  });
  return result;
}

//		Find extreme pages

const getExtremePages = (arr, extreme) => {
	let result;
  
	if (extreme === -1) {
	  let min = 9999999999999;
	  for (let i = 0; i < arr.length; i++) {
		const current = arr[i].pages;
		if (current < min) {
		  min = current;
		  result = arr[i];
		}
	  }
	} else if (extreme === 1) {
	  let max = -9999999999999;
	  for (let i = 0; i < arr.length; i++) {
		const current = arr[i].pages;
		if (current > max) {
		  max = current;
		  result = arr[i];
		}
	  }
	}
	return result;
  }



/*  
        Custom APIs
*/

//      GET Sorted by latest

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

//      Ahow authors only

app.get("/authors", (req, res) => {
  let show = { data: [] };

  data.forEach((i) => {
    show.data.push(i.author);
  });

  res.json(show);
});

//   Get all book info

app.get("/allbooks", (req, res) => {
  let show = { data: [] };
  show.data.push(data);
  res.json(show);
});

// Get book by 'isbn'

app.get("/search-by-item", (req, res) => {
  res.json(searchByValue(data, "9781484242216", 'isbn'));
});

// Get book by 'title'

app.get("/search-by-title", (req, res) => {
  res.json(searchByValue(data, "Pro Git", 'title'));
});

// Get book with most pages

app.get("/book-with-most-pages", (req, res) => {
  let show = { data: [] };
  show.data.push(getExtremePages(data, 1));
  res.json(show);
});

// Get book with least pages

app.get("/book-with-least-pages", (req, res) => {
  let show = { data: [] };
  show.data.push(getExtremePages(data, -1));
  res.json(show);
});

//      Get publisher occurences

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

//      Delete book

app.get("/delete", (req, res) => {
  let show = { data: [] };
  show.data.push(searchByValue(data, '9781593279509', 'isbn'));
  res.json(show);
});

module.exports = app;
