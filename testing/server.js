'use strict';

const express = require('express');

const app = express();

const barf = (req,res,next) => next('throws an error');

app.get('/a', (req,res) => {
  res.status(200).send('Route A');
});

app.get('/e', barf, (req,res) => {
  res.status(200).send('Route D');
});

// Not Found
app.use('*', (req,res) => {
  res.status(404).send('Not Found!');
});

// Errors
app.use( (err,req,res,next) => {
  res.status(500).send(err);
});

// In order to run tests, we must export the express 'app' as part of an object
// Additionally, because we're now a module and not a standalone app, we export a start() method
// and let something else require and start us up
module.exports = {
  server: app,
  start: (port) => app.listen(port, () => console.log(`Listening on ${port}`)),
};
