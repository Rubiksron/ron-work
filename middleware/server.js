'use strict';

const express = require('express');
const routes = require('./routes.js');

const app = express();

const PORT = process.env.PORT || 8080;

const timeStamp = (req,res,next) => {
  req.requestTime = new Date();
  next();
};

const logger = (req,res,next) => {
  console.log(req.requestTime, req.method, req.path);
  next();
};

const square = (number) =>
  (req,res,next) => {
    req.number = number * number;
    next();
  };


app.use(timeStamp);
app.use(logger);

app.use(routes);

app.get('/a', (req,res) => {
  res.status(200).send('Route A');
});

app.get('/b', square(4), (req,res) => {
  res.status(200).send(`Route B ...Number: ${req.number}`);
});


// Not Found
app.use('*', (req,res) => {
  res.status(404).send('Not Found!');
});

// Errors
app.use( (err,req,res,next) => {
  res.status(500).send(err);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
