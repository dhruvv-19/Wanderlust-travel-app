if (process.env.NODE_ENC != "production") {
    require('dotenv').config();
};

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStretagy = require("passport-local");
const User = require("./models/user.js");


// routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));
app.engine('ejs', ejsMate);


const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

// session middleware
app.use(session(sessionOptions));
app.use(flash());

// using passport and passport-local
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStretagy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// middleware for flash
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser", async(req, res) => {
//     let fakeUser = new User({
//         email: "abc@gmail.com",
//         username: "abc",
//     });

//     let registeredUser = await User.register(fakeUser, "abc@12"); //"abc@12" is a password
//     res.send(registeredUser);
// });

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => console.log("connected to DB"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}



app.get("/", (req, res) => {
    res.send("I'm home page");
});


// using router
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


// middlewares for errors

// for 404, page not found
app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "page not found!"));
});

// // for validation error
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong!!" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs", { message });
});


app.listen(8080, () => {
    console.log("server is listening on port 8080");
});