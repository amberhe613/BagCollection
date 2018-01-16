var express  = require("express"),
    passport = require("passport"),
    router   = express.Router({mergeParams: true}),
    User     = require("../models/user");

//HOME PAGE
router.get("/", function(req, res) {
    res.render("landing");
});

//show register form
router.get("/register", function(req, res){
    res.render("authentication/register");
});

//handling user sign up
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err);
            return res.render("authentication/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Bag Collection" + user.username);
            res.redirect("/bagList");
        });
    });
});

// LOGIN ROUTES
// render login form
router.get("/login", function(req, res) {
    res.render("authentication/login");
})

// handling login logic
// router.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/bagList",
        failureRedirect: "/login"
    }), function(req, res){
        req.flash("success", "Logged in successfully!");
});

//LOGOUT ROUTES
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

router.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next();
});

module.exports = router;