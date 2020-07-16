const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const writeImages = fs.createWriteStream('./database/cassandra/images-cassandra.csv');
writeImages.write('image_id,listing_id,address,city,state,zip_code,price,image_url,display_order\n','utf8');

const imagesDataGen = (writer, encoding, callback) => {
  let targetNumRecords = 60000000;
  let image_id = 0;
  let listing_id = 0;
  const photoIndex = () => faker.random.number({min: 1, max: 35});
  const randomNum = () => faker.random.number({min: 5, max: 7});

  const write = () => {
    let ok = true;
    while (image_id <= targetNumRecords && ok) {
      let photoCounter = 1;
      let totalPhotos = randomNum();
      listing_id++;
      while (photoCounter <= totalPhotos) {
        image_id++;
        const address = faker.address.streetAddress();
        const city = faker.address.city();
        const state = faker.address.stateAbbr();
        const zip_code = faker.address.zipCode('#####');
        const price = faker.random.number({min: 1000, max: 7000}) * 1000;
        const image_url = `https://sdc2.s3-us-west-1.amazonaws.com/photo${photoIndex()}.jpg`;
        const display_order = photoCounter;
        const data = `${image_id},${listing_id},${address},${city},${state},${zip_code},${price},${image_url},${display_order}\n`;
        if (targetNumRecords === 0) {
          writer.write(data, encoding, callback);
        } else {
          ok = writer.write(data, encoding);
        }
        if (image_id % 10000000 === 0) {
          console.log('write ', image_id);
        };
        photoCounter++;
      }
      targetNumRecords--;
    }
    if (targetNumRecords > 0) {
      writeImages.once('drain', write);
    }
  }
  write();
}
imagesDataGen(writeImages, 'utf-8', () => {writeImages.end(); console.log('images generated')});



