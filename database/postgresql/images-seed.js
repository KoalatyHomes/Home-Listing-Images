const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const writeImages = fs.createWriteStream('./database/postgresql/images1.csv');
const imagesDataGen = (writer, encoding, callback) => {
  let i = 80000000;
  let image_id = 0;
  const photoNum = () => faker.random.number({min: 1, max: 35});
  function write() {
    let ok = true;
    do {
      i--;
      image_id++;
      const image_url = `https://listingphotos1.s3-us-west-1.amazonaws.com/photo${photoNum()}.jpg`
      const listing_id = faker.random.number({min: 1, max: 10000000});
      const data = `${image_id}, ${image_url}, ${listing_id}\n`
      if (i === 0) {
        writeImages.write(data, encoding, callback);
      } else {
        ok = writeImages.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writeImages.once('drain', write);
    }
  }
  write();
}

imagesDataGen(writeImages, 'utf8', () => {writeImages.end()});
