const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log("DB Connection Error:", err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});

        // Transform image object into image URL string
        const listings = initData.data.map(listing => ({
            ...listing,
            image: listing.image?.url || "",  // Use URL if available, fallback to ""
            owner: "6881d1c92a9c1f99dcf6b908", // Add static owner ID
        }));

        await Listing.insertMany(listings);
        console.log("Data was initialized");
    } catch (err) {
        console.error("Error initializing data:", err);
    }
};

initDB();
