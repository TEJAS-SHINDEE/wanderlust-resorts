const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    Comment : String,
    rating : Number,
    createdAt : Date,

    author : {
        type: Schema.Types.ObjectId,
        ref : "User",
    },
});


module.exports = mongoose.model("Review", reviewSchema);