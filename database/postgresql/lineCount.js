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

countFileLines('./database/postgresql/listings1.csv');
countFileLines('./database/postgresql/realtors1.csv');
countFileLines('./database/postgresql/images1.csv');
countFileLines('./database/cassandra/images-cassandra.csv');

// filePath = process.argv[2];
// fileBuffer =  fs.readFileSync('./database/postgresql/listings1.csv');
// to_string = fileBuffer.toString();
// split_lines = to_string.split("\n");
// console.log(split_lines.length-1);q