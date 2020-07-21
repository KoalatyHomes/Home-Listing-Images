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
  FOREIGN KEY (listing_id) REFERENCES listings (id) ON DELETE CASCADE
);
