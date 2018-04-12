const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.post('/note', (req, res) => {
  MongoClient.connect('mongodb://localhost/library', (err, client) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      process.exit(1);
    }
    const db = client.db('library');
    const books = db.collection('books');

    books.insertOne(req.body);

    res.sendStatus(201);
  });
  console.log(req.body);
});

app.listen(3000, () => {
  console.log('3000 Is listening!');
});
