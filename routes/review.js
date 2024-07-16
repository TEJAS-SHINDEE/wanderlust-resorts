const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Reviews = require("../models/reviews.js");
const Listing = require("../models/listing.js");


const validateReview = (req, res, next)=>{
    let { error } = reviewSchema.validate(req.body);
    if(error)    {
        let errMsg = error.details.map(el=>el.message).join(",")
        throw new ExpressError(400, errMsg);    
    }   else    {
        next();
   
    }
}

//Reviews
//posts route
//validiate reviews as parameter
router.post("/", 
    validateReview, 
    wrapAsync( async (req,res)=> {
        // console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newreview = new Reviews(req.body.review);

    listing.reviews.push(newreview);
    await newreview.save();
    await listing.save();
    req.flash("success", "New Review Created");



    // console.log("new review saved");
    // res.send("new review saved");
    res.redirect(`/listings/${listing._id}`);
}));

//delete review route
router.delete("/:reviewId", wrapAsync( async (req,res) => {
    let { id , reviewId } = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    await Reviews.findByIdAndDelete(reviewId);
    req.flash("success", "review Deleted");
    res.redirect(`/listings/${id}`)
}));

module.exports = router;