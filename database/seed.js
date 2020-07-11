const faker = require('faker');
const db = require('./TourSchedule.js');
const mongoose = require('mongoose');

const imgSet = [
  ['https://homeimages-samm1337.s3-us-west-1.amazonaws.com/1/ISf0de44v3b57z0000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/1/ISjfjcc59joe0v0000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/1/ISnauc1mul4eoz0000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/1/ISr1mzzgafb7wv0000000000+(1).jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/1/ISr1mzzgafb7wv0000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/1/ISzfaio0yrfxtr0000000000.jpg'],
  ['https://homeimages-samm1337.s3-us-west-1.amazonaws.com/2/ISbhznacf2gu8h0000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/2/ISbxfnppd1ej9h0000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/2/ISne1pen6j5fhi0000000000+(1).jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/2/ISne1pen6j5fhi0000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/2/ISrx2iql5ui21h0000000000.jpg'],
  ['https://homeimages-samm1337.s3-us-west-1.amazonaws.com/3/IS7qj6orjxc7f30000000000+(1).jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/3/IS7qj6orjxc7f30000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/3/ISfc6dco7v02m30000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/3/ISjzmwxoe1qiv80000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/3/ISvk7swyowse750000000000.jpg'],
  ['https://homeimages-samm1337.s3-us-west-1.amazonaws.com/4/ISnyklo2oj0hpp1000000000+(1).jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/4/ISnyklo2oj0hpp1000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/4/ISrhq1hkk8bhzp1000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/4/ISv4nx69sr8epp1000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/4/ISvk3xlmqq63qp1000000000.jpg'],
  ['https://homeimages-samm1337.s3-us-west-1.amazonaws.com/5/IS7avgfvf74irq1000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/5/ISv0whh8v2f1at1000000000+(1).jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/5/ISv0whh8v2f1at1000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/5/ISvoij8406ly7t1000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/5/ISvwc8md2fwc2r1000000000.jpg', 'https://homeimages-samm1337.s3-us-west-1.amazonaws.com/5/ISzbn5gie6icat1000000000.jpg']
];

const data = [];
for (let x = 0; x < 100; x++) {
  let imgGall = imgSet[Math.floor(Math.random() * 5)];
  let set = {
    Address: faker.address.streetAddress(),
    Price: Number(faker.commerce.price()) * 3000,
    MainImg: imgGall[0],
  };
  let gallery = imgGall;
  set.Gallery = gallery;
  set.GalleryCount = gallery.length;
  data.push(set);
}

db.Tour.create(data)
  .then(() => {
    mongoose.disconnect();
  });
