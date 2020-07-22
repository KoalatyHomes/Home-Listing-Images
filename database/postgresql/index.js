const { Client } = require('pg');
const { psql_username, psql_password } = require('./config/psql.login.js');

const client = new Client ({
  host: '54.153.112.42',
  // host: 'localhost',
  port: 5432,
  username: psql_username,
  password: psql_password,
  database: 'home_listings',
});

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('psql database connected!');
  }
});

module.exports = client;
