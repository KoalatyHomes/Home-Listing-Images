const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const writeImages = fs.createWriteStream('./database/postgresql/images1.csv');
writeImages.write('image_id,image_url,listing_id,display_order\n', 'utf-8');
const imagesDataGen = (writer, encoding, callback) => {
  let listing_id = 1;
  let image_id = 0;
  const photoIndex = () => faker.random.number({min: 1, max: 35});
  const randomNum = () => faker.random.number({min: 6, max: 9});

  const write = () => {
    let ok = true;
    while (listing_id <= 10000000 && ok) {
      let photoCounter = 1;
      let totalPhotos = randomNum();
      while (photoCounter <= totalPhotos) {
        image_id++;
        const image_url = `https://sdc4.s3-us-west-1.amazonaws.com/p${photoIndex()}.jpg`;
        const display_order = photoCounter;
        const data = `${image_id},${image_url},${listing_id},${display_order}\n`;
        if (listing_id === 10000000) {
          writer.write(data, encoding, callback);
        } else {
          ok = writer.write(data, encoding);
        }
        if (image_id % 10000000 === 0) {
          console.log('write ', image_id);
        };
        photoCounter++;
      }
      listing_id++;
    }
    if (listing_id <= 10000000) {
      writer.once('drain', write);
    }
  }
  write();
}

imagesDataGen(writeImages, 'utf-8', () => {writeImages.end()});
