const express = require('express');
const app = express();
const fs = require('fs');
const _ = require('lodash');
const path = require('path');


app.use(express.static(path.join(__dirname + '')));
app.get('/fib', (req, res) => {
  res.sendFile(path.join(__dirname+'/fib.html'))
});
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});