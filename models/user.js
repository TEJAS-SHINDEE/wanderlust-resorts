
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email : String,
    
});

userSchema.plugin(passportLocalMongoose);  // automatically generate username, hash(), salt value

module.exports = mongoose.model('User', userSchema);