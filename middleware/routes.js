'use strict';

const express = require('express');
const router = express.Router();

const ugly = (req,res,next) => {
  next('something ugly happened');
};

const rando = (req,res,next) => {
  req.number = Math.random();
  next();
};

router.get('/c', rando, (req,res) => {
  res.status(200).send(`Route C ...Number: ${req.number}`);
});

router.get('/d', ugly, (req,res) => {
  res.status(200).send('Route D');
});

module.exports = router;
