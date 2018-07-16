const express = require('express');
const app = express();
const fs = require('fs');
const _ = require('lodash');
const path = require('path');


app.use(express.static(path.join(__dirname + '')));
app.get('/fib', (req, res) => {
  res.sendFile(path.join(__dirname+'/fib.html'))
});

app.get('/add', (req, res) => {
  const buf = fs.readFileSync('./add.wasm');
  const wasmModule = new WebAssembly.Module(new Uint8Array(buf));
  const wasmInstance = new WebAssembly.Instance(wasmModule);
  console.log(wasmInstance.exports.add(2,3));
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});