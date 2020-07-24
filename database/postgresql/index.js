const { Client } = require('pg');
const { psql_username, psql_password } = require('./config/psql.login.js');

<<<<<<< HEAD
const host = '54.153.112.42:5432';
=======
const host = '54.153.112.42';
>>>>>>> 8f135484fd9586f4a8ecc0de96863c54b2fe3a61
const database = 'home_listings';

const connectStr = `postgres://${psql_username}:${psql_password}@${host}/${database}`;
const client = new Client(connectStr);

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('psql database connected!');
  }
});

module.exports = client;
