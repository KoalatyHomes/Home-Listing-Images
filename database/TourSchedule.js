const mongoose = require('mongoose');
const db = require('./index.js');

mongoose.Promise = global.Promise;

const tourSchema = new mongoose.Schema({
  Address: String,
  Price: Number,
  MainImg: String,
  Gallery: [String],
  GalleryCount: Number,
},
{
  timestamps: false,
});

module.exports.Tour = mongoose.model('Tour', tourSchema);
