const Listing = require("../models/listing.js");
const Reviews = require("../models/reviews.js");


module.exports.createReview = async (req,res)=> {
    // console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newreview = new Reviews(req.body.review);
    newreview.author = new Review(req.body.review);
    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    req.flash("success", "New Review Created");

    // console.log("new review saved");
    // res.send("new review saved");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req,res) => {
    let { id , reviewId } = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    await Reviews.findByIdAndDelete(reviewId);
    req.flash("success", "review Deleted");
    res.redirect(`/listings/${id}`)
};