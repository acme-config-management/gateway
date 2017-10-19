'use strict'

const express = require('express');
const request = require('request');
const { promisify } = require('util');
const requestAsync = promisify(request);

const app = express();
const port = 9000;
let services = [];

process.argv.forEach((service, i) => {
  if (i > 1) {
    services.push(service);
  }
});

services = services.map(service => requestAsync(service));

app.get('/', (req, res) => {
  Promise.all(services)
    .then(response => {
      console.log(response)
      res.json({ a: response[0], b: response[1]})
    })
    .catch(err => { console.log(err) });
});

app.listen(port);
