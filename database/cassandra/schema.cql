CREATE KEYSPACE IF NOT EXISTS home_listings with REPLICATION = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};

USE home_listings;

CREATE TABLE IF NOT EXISTS images_by_listing (
  image_id int,
  listing_id int,
  address text,
  city text,
  state text,
  zip_code text,
  price int,
  image_url text,
  display_order int,
  PRIMARY KEY (listing_id, display_order)
);

CREATE TABLE IF NOT EXISTS listings_by_realtors (
  listing_id int,
  realtor_id int,
  firstName text,
  lastName text,
  PRIMARY KEY (realtor_id, listing_id)
);

COPY images_by_listing (image_id, listing_id, address, city, state, zip_code, price, image_url, display_order) FROM './database/cassandra/images-cql1.csv' WITH DELIMITER=',' AND HEADER=TRUE;


