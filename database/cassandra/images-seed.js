const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const writeImages = fs.createWriteStream('./database/cassandra/images-cassandra.csv');
writeImages.write('image_id,listing_id,address,city,state,zip_code,price,image_url,display_order\n', 'utf8');

const imagesDataGen = (writer, encoding, callback) => {
  let i = 1000000;
  let id = 0;
  const photoNum = () => faker.random.number({min: 1, max: 35});
  const randomNum = () => faker.random.number({min: 8, max: 11});
  function write() {
    let ok = true;
    do {
      i--;
      let j = 1
      let totalPhotos = randomNum();
      do {
        j++;
        id++;
        const image_id = id;
        const listing_id = i + 1;
        const address = faker.address.streetAddress();
        const city = faker.address.city();
        const state = faker.address.stateAbbr();
        const zip_code = faker.address.zipCode();
        const price = faker.random.number({min: 1000, max: 7000}) * 1000;
        const image_url = `https://listingphotos1.s3-us-west-1.amazonaws.com/photo${photoNum()}.jpg`;
        const display_order = j - 1;
        const data = `${image_id}, ${listing_id}, ${address}, ${city}, ${state}, ${zip_code}, ${price}, ${image_url}, ${display_order}\n`
        if (i === 0) {
          writeImages.write(data, encoding, callback);
        } else {
          ok = writeImages.write(data, encoding);
        }
      } while (j < totalPhotos);
    } while (i > 0 && ok);

    if (i > 0) {
      writeImages.once('drain', write);
    }
  }
  write();
}
imagesDataGen(writeImages, 'utf8', () => {writeImages.end(); console.log('images generated')});



