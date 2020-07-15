const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const writeRealtors = fs.createWriteStream('./database/postgresql/realtors1.csv');
writeRealtors.write('realtor_id,firstName,lastName\n', 'utf8');
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
