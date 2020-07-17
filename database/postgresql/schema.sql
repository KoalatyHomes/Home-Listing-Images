DROP DATABASE IF EXISTS home_listings;
CREATE DATABASE home_listings;

\c home_listings;

DROP TABLE IF EXISTS realtors CASCADE;
CREATE TABLE realtors (
  realtor_id SERIAL PRIMARY KEY,
  firstName VARCHAR(20) NOT NULL,
  lastName VARCHAR(20) NOT NULL
);

DROP TABLE IF EXISTS listings CASCADE;
CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  address VARCHAR(30) NOT NULL,
  city VARCHAR(30) NOT NULL,
  state VARCHAR(2) NOT NULL,
  zip_code VARCHAR(5) NOT NULL,
  price INT NOT NULL,
  realtor_id INT,
  FOREIGN KEY (realtor_id) REFERENCES realtors (realtor_id)
);

DROP TABLE IF EXISTS images CASCADE;
CREATE TABLE images (
  image_id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  listing_id INT,
  display_order INT,
  FOREIGN KEY (listing_id) REFERENCES listings (id)
);

COPY realtors (realtor_id, firstName, lastName) FROM '/Users/emho/Documents/HackReactor/sdc-photos/database/postgresql/realtors1.csv' delimiter ',' csv header;

COPY listings (id, address, city, state, zip_code, price, realtor_id) FROM '/Users/emho/Documents/HackReactor/sdc-photos/database/postgresql/listings1.csv' delimiter ',' csv header;

COPY images (image_id, image_url, listing_id, display_order) FROM '/Users/emho/Documents/HackReactor/sdc-photos/database/postgresql/images1.csv' delimiter ',' csv header;


/* psql -d postgres -U newuser < database/postgresql/schema.sql */