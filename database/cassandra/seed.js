const fs = required('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const writeImages = fs.createWriteStream('./database/cassandra/images-cassandra.csv');
const imagesDataGen = (writer, encoding, callback) => {
}