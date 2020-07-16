const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const writeRealtors = fs.createWriteStream('./database/postgresql/realtors1.csv');
writeRealtors.write('realtor_id,firstName,lastName\n', 'utf8');
const realtorsDataGen = (writer, encoding, callback) => {
  let numRecords = 5000000;
  let realtor_id = 0;
  const write = () => {
    let ok = true;
    while (numRecords > 0 && ok) {
      realtor_id++;
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const data = `${realtor_id},${firstName},${lastName}\n`;
      if (numRecords === 0) {
        writeRealtors.write(data, encoding, callback);
      } else {
        ok = writeRealtors.write(data, encoding);
      }
      numRecords--;
    }
    if (numRecords > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

realtorsDataGen(writeRealtors, 'utf-8', () => {writeRealtors.end()});
