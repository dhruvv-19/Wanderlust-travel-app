const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1559673598-2d806415669a?auto=format&fit=crop&w=2070&q=80";

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Review" 
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});


const Listing = mongoose.model("Listing", listingSchema); 
module.exports = Listing;