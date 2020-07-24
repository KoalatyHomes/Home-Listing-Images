const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const client = require('../database/postgresql/index.js');
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;

const port = 3001;

// if (cluster.isMaster) {
//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
// } else {
  const app = express();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.use(express.static(path.join(__dirname, '/../client/dist')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));



  app.get('/api/listings/:id', (req, res) => {
    const id = req.params.id || '1';
    const queryStr = `SELECT listings.id, listings.address, listings.city, listings.state, listings.zip_code, listings.price, images.image_id, images.image_url, images.display_order, realtors.firstName, realtors.lastName FROM listings INNER JOIN images ON listings.id = images.listing_id INNER JOIN realtors ON listings.realtor_id = realtors.realtor_id WHERE listings.id = ${id} ORDER BY display_order`;
    client.query(queryStr)
      .then((result) => res.status(200).send(result))
      .catch((err) => res.status(404).send(err))
  });

  app.post('/api/listings/:id/images', (req, res) => {
    const { id } = req.params;
    const { image_url } = req.body;
    const queryStr = `INSERT INTO images (image_url, listing_id, display_order) VALUES ('${image_url}', ${id}, (SELECT MAX(display_order)+1 FROM images WHERE listing_id = 9900001))`;
    client.query(queryStr)
    .then((result) => res.status(204).send(result))
    .catch((err) => res.status(404).send(err))
  });

  app.patch('/api/listings/:id/images/:image_id', (req, res) => {
    const { id } = req.params;
    const { image_url } = req.body;
    const queryStr = `UPDATE images SET image_url = '${image_url}' WHERE image_id = ${id}`;
    client.query(queryStr)
      .then((result) => res.status(201).send(result))
      .catch((err) => res.status(404).send(err))
  });

  app.delete('/api/listings/:id/images/:image_id', (req, res) => {
    const { id } = req.params;
    const queryStr = `DELETE FROM images WHERE image_id = ${id}`;
    client.query(queryStr)
      .then((result) => res.status(204).send(result))
      .catch((err) => res.status(404).send(err))
  });

  app.get('/:listing_id', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });

  app.listen(port, () => {
    console.log('Server is listening on port: ', port);
  });
// }
