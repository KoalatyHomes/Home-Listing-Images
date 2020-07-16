const fs = require('fs');

function countFileLines(filePath){
  return new Promise((resolve, reject) => {
  let lineCount = 0;
  fs.createReadStream(filePath)
    .on("data", (buffer) => {
      let idx = -1;
      lineCount--; // Because the loop will run once for idx=-1
      do {
        idx = buffer.indexOf(10, idx+1);
        lineCount++;
      } while (idx !== -1);
    }).on("end", () => {
      resolve(console.log(lineCount, filePath));
    }).on("error", reject);
  });
};

countFileLines('./postgresql/listings1.csv');
countFileLines('./postgresql/realtors1.csv');
countFileLines('./postgresql/images1.csv');
countFileLines('./cassandra/images-cassandra.csv');