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

app.get('/', (req, res) => {

  services = services.map(service => requestAsync(service));

  Promise.all(services)
    .then(response => {
      res.json({ a: response[0], b: response[1]})
    });
});

app.listen(port);
