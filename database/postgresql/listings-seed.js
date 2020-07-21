const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

// create stream and name file
const writeListings = fs.createWriteStream('./database/postgresql/listings1.csv');

// write headers for CSV file
writeListings.write('id,address,city,state,zip_code,price,realtor_id\n', 'utf8');

const listingsDataGen = (writer, encoding, callback) => {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i--;
      id++;
      const address = faker.address.streetAddress();
      const city = faker.address.city();
      const state = faker.address.stateAbbr();
      const zip_code = faker.address.zipCode();
      const price = faker.random.number({min: 1000, max: 7000}) * 1000;
      const realtor_id = faker.random.number({min: 1, max: 10000000});
      const data = `${id}, ${address}, ${city}, ${state}, ${zip_code}, ${price}, ${realtor_id}\n`
      if (i === 0) {
        writeListings.write(data, encoding, callback);
      } else {
        ok = writeListings.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writeListings.once('drain', write);
    }
  }
  write();
}

listingsDataGen(writeListings, 'utf8', () => {writeListings.end()});