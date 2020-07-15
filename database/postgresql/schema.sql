DROP DATABASE IF EXISTS home_listings;
CREATE DATABASE home_listings;

USE home_listings;

CREATE TABLE listings (
  id INT SERIAL PRIMARY KEY,
  address VARCHAR(30) NOT NULL,
  city VARCHAR(20) NOT NULL,
  state VARCHAR(2) NOT NULL,
  zip_code INT(5) NOT NULL,
  price INT NOT NULL,
  realtor_id INT,
  FOREIGN KEY (realtor_id) REFERENCES realtors (realtor_id)
)

CREATE TABLE images (
  image_id INT SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  listing_id INT,
  FOREIGN KEY (listing_id) REFERENCES listings (id)
)

CREATE TABLE realtors (
  realtor_id INT SERIAL PRIMARY KEY,
  firstName VARCHAR(20) NOT NULL,
  lastName VARCHAR(20) NOT NULL
)


/* run psql < database/postgresql/schema.sql */