const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

// create stream and name file
const writeListings = fs.createWriteStream('./database/postgresql/listings1.csv');

// write headers for CSV file
writeListings.write('id,address,city,state,zip_code,price,realtor_id\n', 'utf8');

const listingsDataGen = (writer, encoding, callback) => {
  let numRecords = 10000000;
  let id = 0;
  const write = () => {
    let ok = true;
    while (numRecords > 0 && ok) {
      id++;
      const address = faker.address.streetAddress();
      const city = faker.address.city();
      const state = faker.address.stateAbbr();
      const zip_code = faker.address.zipCode('#####');
      const price = faker.random.number({min: 1000, max: 7000}) * 1000;
      const realtor_id = faker.random.number({min: 1, max: 5000000});
      const data = `${id},${address},${city},${state},${zip_code},${price},${realtor_id}\n`;
      if (numRecords === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
      numRecords--;
    }
    if (numRecords > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

listingsDataGen(writeListings, 'utf-8', () => {writeListings.end()});