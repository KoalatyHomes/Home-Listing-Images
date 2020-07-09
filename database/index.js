const mongoose = require('mongoose');

// const connection = 'mongodb://172.17.0.2/tourschedule';
const connection = 'mongodb://localhost/tourschedule';

const db = mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = db;
