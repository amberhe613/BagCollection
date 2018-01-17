var express               = require("express"),
    app                   = express(),
    request               = require("request"),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    Bag                   = require("./models/bag"),
    Comment               = require("./models/comment"),
    methodOverride        = require("method-override"),
    expressSanitizer      = require("express-sanitizer"),
    seedDB                = require("./seed"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    flash                 = require('connect-flash'),
    User                  = require("./models/user");

// REQUIRE ROUTE    
var commentRoutes = require("./routes/comments"),
    bagRoutes     = require("./routes/bags"),
    indexRoute    = require("./routes/index");
    
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();//seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Amber is the best and cutest girl in the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(expressSanitizer());


app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoute);
app.use("/bagList", bagRoutes);
app.use("/bagList/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The BagHual Sever Has been Started!");
});