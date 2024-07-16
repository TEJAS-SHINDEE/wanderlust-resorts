const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: String,
  image: {
    filename : String,
    url : String,
  },

  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type : Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});

// called by another function
listingSchema.post("findOneAndDelete",async (listings)=>  {
  if(listings)  {
    await Review.deleteMany({reviews : {$in : listings.reviews}});

  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;