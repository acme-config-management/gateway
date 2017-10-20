'use strict'

const express = require('express');
const request = require('request');
const { promisify } = require('util');
const requestAsync = promisify(request);

const app = express();
const port = 8080;
let services = [];

process.argv.forEach((service, i) => {
  if (i > 1) {
    services.push(service);
  }
});

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.get('/', (req, res) => {
  Promise.all(services.map(service => requestAsync(service)))
    .then(response => {
      res.json({ a: response[0].body, b: response[1].body})
    });
});

app.listen(port);
