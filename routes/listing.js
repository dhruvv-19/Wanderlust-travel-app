const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


// index and create routes
router.route("/")
    .get(wrapAsync(listingController.index)) // index route
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createNewListing) // create route
    );

// render form for creating new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// show/edit/update/delete routes grouped by ID
router.route("/:id")
    .get(wrapAsync(listingController.showListing)) // show route
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing) // update route
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.deleteListing) // delete route
    );

// edit form route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditFrom)
);

module.exports = router;
