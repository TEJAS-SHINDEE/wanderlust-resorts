const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();

// const mongoose = require('mongoose');
// const initData = require("./data.js");
// const Listing = require("../models/listing.js"); // Ensure the correct path


// mongoose.connect(MONGO_URL)
//   .then(() => {
//     console.log('Connected to DB');
//     return Listing.deleteMany({});
//   })
//   .then(() => {
//     return Listing.insertMany(initData.data);
//   })
//   .then(() => {
//     console.log('Data initialized');
//     mongoose.disconnect();
//   })
//   .catch(err => {
//     console.error('Error:', err);
//     mongoose.disconnect();
//   });
