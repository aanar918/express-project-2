const apiRoute  = require('./routes/api')
const adminRoute  = require('./routes/admin')

const express = require("express");
const app = express();
const port = 3004;

app.use('/api', apiRoute);
app.use('/', adminRoute);


app.listen(port);
