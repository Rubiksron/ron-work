'use strict';

const express = require('express');

const notFound = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

const Posts = require('./models/posts.js');
const postsDatabase = new Posts();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

// Posts Routes
app.get('/posts', getPosts);
app.get('/posts/:id', getPost);
app.post('/posts', addPost);
app.put('/posts/:id', replacePost);
app.delete('/posts/:id', deletePost);

function getPosts(req,res,next) {
  let count = postsDatabase.count();
  let results = postsDatabase.get();
  res.json({count,results});
}

function getPost(req,res,next) {
  let id = parseInt(req.params.id);
  let record = postsDatabase.get(id);
  res.json(record[0]);
}

function addPost(req,res,next) {
  let {author,title,article} = req.body;
  let record = postsDatabase.post({author,title,article});
  res.json(record);
}

function replacePost(req,res,next) {
  let id = parseInt(req.params.id);
  let {author,title,article} = req.body;
  let record = {id,author,title,article};
  let updatedRecord = postsDatabase.put(id, record);
  res.json(updatedRecord);
}

function deletePost(req,res,next) {
  let id = parseInt(req.params.id);
  let result = postsDatabase.delete(id);
  res.json(result);
}

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};
