const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const listingsWriter = csvWriter();
const listingsDataGen = () => {
  listingsWriter.pipe(fs.createWriteStream('./database/postgresql/listings.csv'));
  for (let i = 0; i < 10; i++) {
    listingsWriter.write({
      id: i + 1,
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip_code: faker.address.zipCode(),
      main_image_id: 1,
      realtor_id: Math.floor(Math.random() * (1000000 - 1) + 1)
    })
  }
  listingsWriter.end()
  console.log('listings generated');
}

const imagesWriter = csvWriter();
const imagesDataGen = () => {
  imagesWriter.pipe(fs.createWriteStream('./database/postgresql/images.csv'));
  for (let i = 0; i < 10; i++) {
    imagesWriter.write({
      image_id: i + 1,
      image_url: `https://listingphotos1.s3-us-west-1.amazonaws.com/photo${(Math.floor(Math.random() * (35 - 1) + 1))}.jpg`,
      listing_id: Math.floor(Math.random() * (10000000 - 1) + 1),
    })
  }
  imagesWriter.end()
  console.log('images generated');
}

const realtorsWriter = csvWriter();
const realtorsDataGen = () => {
  realtorsWriter.pipe(fs.createWriteStream('./database/postgresql/realtors.csv'));
  for (let i = 0; i < 10; i++) {
    realtorsWriter.write({
      realtor_id: i + 1,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    })
  }
  realtorsWriter.end()
  console.log('realtors generated');
}

listingsDataGen();
imagesDataGen();
realtorsDataGen();