// import express from 'express'; // ES2015 modules, not supported by default by all versions of Node
const express = require('express');

const server = express();

// needed to teach express how to read JSON data from req.body
server.use(express.json()); // remember to invoke json()

server.get('/', (req, res) => {
  // always retrun the correct http status code based on the operation performed
  res.status(200).json({ msg: 'Hello, World!' });
});

// see a list of lessons { id: 1, name: 'intro to node' }
let lessons = [
  { id: 1, name: 'intro to node' },
  { id: 2, name: 'intro to express' }
];

let nextId = 3; // hack, not needed for databases

// GET /lessons
server.get('/lessons', (req, res) => {
  res.status(200).json({ data: lessons });
});

// POST /lessons -> add a lesson to the lessons array -> respond with the lessons array
server.post('/lessons', (req, res) => {
  // client will axios.post('https://api.com/lessons, data);
  const data = req.body;

  lessons.push({ id: nextId++, ...data });

  res.status(201).json({ data: data, lessons });
});

server.put('/lessons/:id', (req, res) => {
  const id = Number(req.params.id);
  const changes = req.body;

  const found = lessons.find((lesson) => lesson.id === id);

  if (found) {
    Object.assign(found, changes);

    res.status(200).json({ data: lessons });
  } else {
    res.status(404).json({ message: 'Lesson not found' });
  }
  // return the lessons array
});

server.delete('/lessons/:id', (req, res) => {
  const id = Number(req.params.id);

  lessons = lessons.filter((l) => l.id !== id);

  res.status(200).json({ data: lessons });
});

const port = 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));

// npm run server
