const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const writeImages = fs.createWriteStream('./database/cassandra/images-cql1.csv');
writeImages.write('image_id,listing_id,address,city,state,zip_code,price,image_url,display_order\n','utf-8');

const imagesDataGen = (writer, encoding, callback) => {
  let image_id = 0;
  let listing_id = 1;
  const photoIndex = () => faker.random.number({min: 1, max: 35});
  const randomNum = () => faker.random.number({min: 5, max: 7});
  const addressGenerator = () => faker.address.streetAddress();
  const cityGenerator = () => faker.address.city();
  const stateGenerator = () => faker.address.stateAbbr();
  const zip_codeGenerator = () => faker.address.zipCode('#####');
  const priceGenerator = () => faker.random.number({min: 1000, max: 7000}) * 1000;

  const write = () => {
    let ok = true;
    while (listing_id <= 10000000 && ok) {
      let photoCounter = 1;
      let totalPhotos = randomNum();
      const address = addressGenerator();
      const city = cityGenerator();
      const state = stateGenerator();
      const zip_code = zip_codeGenerator();
      const price = priceGenerator();

      while (photoCounter <= totalPhotos) {
        image_id++;
        const image_url = `https://sdc4.s3-us-west-1.amazonaws.com/p${photoIndex()}.jpg`;
        const display_order = photoCounter;
        const data = `${image_id},${listing_id},${address},${city},${state},${zip_code},${price},${image_url},${display_order}\n`;
        if (listing_id === 10000000) {
          writer.write(data, encoding, callback);
        } else {
          ok = writer.write(data, encoding);
        }
        if (listing_id % 10000000 === 0) {
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
imagesDataGen(writeImages, 'utf-8', () => {writeImages.end(); console.log('images generated')});



