const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewCreatedBy} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");


// review route
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
);


// review delete route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewCreatedBy,
    wrapAsync(reviewController.deleteReview)
);


module.exports = router;