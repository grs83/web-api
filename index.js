const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();

MongoClient.connect('mongodb://localhost/library', (err, client) => {
  if (err) {
    console.log(err);
    res.sendStatus(500);
    process.exit(1);
  }
  const db = client.db('library');
  const books = db.collection('books');

  app.get('/note', (req, res) => {
    books
      .find()
      .toArray()
      .then(results => res.send(results))
      .catch(() => res.sendStatus(500));
  });

  app.use(jsonParser);

  app.post('/note', (req, res) => {
    books.insertOne(req.body);
    res.sendStatus(201);
  });

  app.put('/note', (req, res) => {
    books
      .findOneAndUpdate(
        { title: req.body.find },
        {
          $set: {
            title: req.body.title
          }
        }
      )
      .then(result => {
        if (result.lastErrorObject.updatedExisting) {
          res.sendStatus(201);
        } else {
          res.sendStatus(204);
        }
      })
      .catch(() => res.sendStatus(500));
  });
});

app.listen(3000, () => {
  console.log('3000 Is listening!');
});
