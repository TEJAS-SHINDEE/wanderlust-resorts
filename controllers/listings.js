const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res)=>{
    const  allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req,res)=>{    
    res.render("./listings/new.ejs");
};

module.exports.showListing = async (req,res)=>{
    let { id } = req.params;
    const listings = await Listing.findById(id)
        .populate({
            path : "reviews",
            populate : {        //nested populate for reviews and author
                path : "author",
            }
        })
        .populate("owner");
    if(!listings)   {
        req.flash("error", "Listing you requested is Not Exits");
        res.redirect("/listings");

    }
    console.log(listings);
    res.render("./listings/show.ejs", { listings });
};

module.exports.creatListing = async (req,res,next)  => {

   let responce =  await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send();

        res.send("done");    

    let url = req.file.path;
    let filename = req.file.filename;
        
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geomerty = responce.body.feature[0].geometry;

    let savedListing = await newListing.save();
    
    req.flash("success","New Listing Created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req,res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing)    {
        req.flash("error", "Listings you requested for does not exits!");
        req.redirect("/listings");
    }
    let originalImgaeUrl = listing.image.url;
    originalImgaeUrl = originalImgaeUrl.replace("/upload","/upload/h_300,w_250")
    res.render("./listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req,res)   => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined")    {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated")
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);  //call function of middleware in listings
    // console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};