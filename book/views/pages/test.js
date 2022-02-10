const fs = require('fs')

fs.writeFileSync("foo.txt", "bar2");
fs.appendFileSync("junk.csv", "Line:");