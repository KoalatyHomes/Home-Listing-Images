const fs = require('fs');

const countFileLines = (filePath) => {
  return new Promise((resolve, reject) => {
  let lineCount = 0;
  fs.createReadStream(filePath)
    .on("data", (buffer) => {
      let idx = -1;
      lineCount--;
      do {
        idx = buffer.indexOf(10, idx+1);
        lineCount++;
      } while (idx !== -1);
    }).on("end", () => {
      resolve(console.log(lineCount, filePath));
    }).on("error", reject);
  });
};

countFileLines('./database/postgresql/listings1.csv');
countFileLines('./database/postgresql/realtors1.csv');
countFileLines('./database/postgresql/images1.csv');
countFileLines('./database/cassandra/images-cql1.csv');