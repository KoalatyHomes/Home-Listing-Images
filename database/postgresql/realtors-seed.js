const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const writeRealtors = fs.createWriteStream('./database/postgresql/realtors1.csv');
const realtorsDataGen = (writer, encoding, callback) => {
  let i = 10000000;
  let realtor_id = 0;
  function write() {
    let ok = true;
    do {
      i--;
      realtor_id++;
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const data = `${realtor_id}, ${firstName}, ${lastName}\n`
      if (i === 0) {
        writeRealtors.write(data, encoding, callback);
      } else {
        ok = writeRealtors.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writeRealtors.once('drain', write);
    }
  }
  write();
}

realtorsDataGen(writeRealtors, 'utf8', () => {writeRealtors.end()});

// const listingsWriter = csvWriter();
// const listingsDataGen = () => {
//   let price = Math.floor(Math.random() * (7000 - 1000) + 1000) * 1000;
//   let realtor = Math.floor(Math.random() * (8000000 - 1) + 1);
//   listingsWriter.pipe(fs.createWriteStream(`./database/postgresql/listings.csv`));
//   for (let i = 0; i < 10000000; i++) {
//     listingsWriter.write({
//       id: i,
//       address: faker.address.streetAddress(),
//       city: faker.address.city(),
//       state: faker.address.stateAbbr(),
//       zip_code: faker.address.zipCode(),
//       price: price,
//       realtor_id: realtor,
//     })
//   }
//   listingsWriter.end()
//   console.log('listings generated');
// }

// const imagesWriter = csvWriter();
// const imagesDataGen = () => {
//   let photoNum = faker.random.number(1, 35);
//   let counter = 0;
//   imagesWriter.pipe(fs.createWriteStream(`./database/postgresql/images.csv`));
//   for (let i = 0; i < 80000000; i++) {
//     for (let j = 0; j < 10; j++) {
//       imagesWriter.write({
//         image_id: counter++,
//         image_url: `https://listingphotos1.s3-us-west-1.amazonaws.com/photo${photoNum}.jpg`,
//         listing_id: i,
//       })
//     }
//   }
//   imagesWriter.end()
//   console.log('images generated');
// }

// const realtorsWriter = csvWriter();
// const realtorsDataGen = () => {
//   realtorsWriter.pipe(fs.createWriteStream(`./database/postgresql/realtors.csv`));
//   for (let i = 0; i < 10000000; i++) {
//     realtorsWriter.write({
//       realtor_id: i,
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName()
//     })
//   }
//   realtorsWriter.end()
//   console.log('realtors generated');
// }