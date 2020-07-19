const { Client } = require('pg');
const { psql_username, psql_password } = require('./config/psql.login.js');

const client = new Client ({
  host: 'localhost',
  port: 5432,
  username: psql_username,
  password: psql_password,
  database: 'home_listings',
});

client.connect()
client
  .query('SELECT NOW()')
  .then(result => console.log('psql connected'))
  .catch(e => console.error(e.stack))

// client.connect(err => {
//   if (err) {
//     console.error('connection error', err.stack);
//   } else {
//     console.log('psql database connected!');
//   }
// });

module.exports = client;



