const { Client } = require('pg');
const { psql_username, psql_password } = require('./config/psql.login.js');

const host = '54.153.112.42';
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
