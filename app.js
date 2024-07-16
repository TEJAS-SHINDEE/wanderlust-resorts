const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");

main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views" , path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOption = {
    secret : "mysupercsrest",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000
    }
};

// basic api
app.get("/" ,  wrapAsync((req,res)=>{
    res.send("hi I am root");
    })
);

app.use(session(sessionOption));
app.use(flash());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// listings
app.use("/listings",listings);

//review
app.use("/listings/:id/reviews",reviews);


// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404, "Page Not Found"));
// });

app.use((err,req,res,next)=>{
    let { statusCode , message ="Something Went Wrong"} = err;
    res.status(statusCode).send(message);
    // res.send("something went wrong");
    res.status(statusCode).render("error.ejs",{ message });
});

app.listen(8080, ()=>{
    console.log("server is listening");
});






// app.get("/testListing" ,async (req,res)=>{
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         description : "By the beach",
//         price : 1200,
//         location : "Calangute, Goa",
//         country : "India"
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });