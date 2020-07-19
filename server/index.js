const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const db = require('../database/mongodb/TourSchedule.js');
const client = require('../database/postgresql/index.js');

const port = 3001;

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// USING PSQL

// GET request
app.get('/api/listings/:id', (req, res) => {
  const id = req.params.id || '1';
  console.log('app.get-listing_id', req.params.id);
  const queryStr1 = `SELECT listings.id, listings.address, listings.city, listings.state, listings.zip_code, listings.price, images.image_id, images.image_url, images.display_order, realtors.firstName, realtors.lastName FROM listings INNER JOIN images ON listings.id = images.listing_id INNER JOIN realtors ON listings.realtor_id = realtors.realtor_id WHERE listings.id = ${id} ORDER BY display_order`;
  client.query(queryStr1)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(404).send(err))
})

app.listen(port, () => {
  console.log('Server is listening on port: ', port);
});


// // USING MONGODB
//
// // Read / GET
// app.get('/api/listings/:id', (req, res) => {
//   const id = req.params.id || '5f06b469fd0850cef70edc02';
//   // console.log('get', req.params.id);
//   db.Tour.find({ _id: id })
//     .then((results) => {
//       res.status(200).send(results);
//     })
//     .catch((err) => {
//       res.status(404).send(err);
//     });
// });

// // GET ALL
// app.get('/api/listings/', (req, res) => {
//   db.Tour.find()
//     .then((results) => {
//       res.status(200).send(results);
//     })
//     .catch((err) => {
//       res.status(404).send(err);
//     });
// });

// // Create / POST
// app.post('/api/listings', (req, res) => {
//   const listing = {
//     Address: req.body.Address,
//     Price: req.body.Price,
//     MainImg: req.body.MainImg,
//     Gallery: req.body.Gallery,
//     GalleryCount: req.body.GalleryCount,
//   };
//   db.Tour.create(listing)
//     .then((results) => {
//       res.status(201).send(results);
//     })
//     .catch((err) => {
//       res.status(404).send(err);
//     });
// });

// // Update / PUT
// app.put('/api/listings/:id', (req, res) => {
//   const id = req.params._id;
//   // console.log('PUT id', id);
//   const listing = {
//     Address: req.body.Address,
//     Price: req.body.Price,
//     MainImg: req.body.MainImg,
//     Gallery: req.body.Gallery,
//     GalleryCount: req.body.GalleryCount,
//   };
//   db.Tour.findOneAndUpdate(id, listing)
//     .then((results) => {
//       res.status(200).send(results);
//     })
//     .catch((err) => {
//       res.status(404).send(err);
//     });
// });

// // Delete / DELETE
// app.delete('/api/listings/:id', (req, res) => {
//   const id = req.query._id;
//   // console.log(id);
//   db.Tour.findOneAndDelete(id)
//     .then((results) => {
//       res.status(200).send(results);
//     })
//     .catch((err) => {
//       res.status(404).send(err);
//     });
// });