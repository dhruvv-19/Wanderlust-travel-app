const express = require("express");
const router = express.Router();
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn} = require("../middleware.js");


// function for schmea validation
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    // console.log(result);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}


// 1: index route => return all listings
router.get("/",
    wrapAsync(async (req, res) => {
        const allListings = await Listing.find({}); //all listings(data)
        res.render("./listings/index.ejs", { allListings });
    }));


// we have to place new route above of show route because of dynamic route(show route)
// 3.1: new route: render form 
router.get("/new",
    isLoggedIn,
    (req, res) => {
        res.render("./listings/new.ejs");
    }
);

// 3.2: create route: store details in DB
router.post(
    "/",
    isLoggedIn,
    validateListing,
    wrapAsync(async (req, res, next) => {
        let listing = req.body.listing;
        const newListing = new Listing(listing);
        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    })
);


// 2: show route for displaying specific data using id
router.get("/:id",
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id).populate("reviews");
        if(!listing){
            req.flash("error", "Listing you requested does not exist");
            return res.redirect("/listings");
        }
        res.render("./listings/show.ejs", { listing });
    }));

// 4.1: edit route: render form for edit details
router.get("/:id/edit",
    isLoggedIn,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
            req.flash("error", "Listing you requested does not exist");
            return res.redirect("/listings");
        }
        res.render("./listings/edit.ejs", { listing });
    }));

// 4.2: update route: PUT request to store updated data in DB(model/collections);
router.put(
    "/:id",
    isLoggedIn,
    validateListing,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
    }));


// 5: delete route to delete data using specific id
router.delete("/:id",
    isLoggedIn,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success", "Listing Deleted!");
        res.redirect("/listings");
    }));


module.exports = router;