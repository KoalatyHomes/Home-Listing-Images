CREATE KEYSPACE IF NOT EXISTS home_listings with REPLICATION = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};

USE home_listings;

CREATE TABLE images_by_listing (
  image_id int serial,
  listing_id int,
  address text,
  city text,
  state text,
  zip_code int,
  price int,
  image_url text,
  display_order int,
  PRIMARY KEY (listing_id, display_order)
)
WITH CLUSTERING ORDER BY (display_order ASC)
