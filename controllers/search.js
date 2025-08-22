const Listing = require("../models/listing.js");

module.exports.search = async (req, res) => {
  let searchTerm = req.query.query;
  let listings = await Listing.find({ $text: { $search: searchTerm } });
  if (!listings.length > 0) {
    req.flash(
      "error",
      "No matching listings found. Please try a different search term."
    );
    res.redirect("/listings");
  } else {
    res.render("listings/search", { listings });
  }
};