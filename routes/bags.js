var express = require("express"),
    Bag     = require("../models/bag"),
    router  = express.Router({mergeParams: true}),
    middleware = require("../middleware");

//Index Route
router.get("/", function(req, res) {
    // Get all bags from DB
    Bag.find({}, function(err, BagList){
        if(err){
            console.log(err);
        } else {
            res.render("bagsList/bagList", {bagList: BagList});
        }
    })
});

//Create Route
router.post("/", middleware.isLoggedIn, function(req, res) {
    req.body.bag.body = req.sanitize(req.body.bag.body);
    // Create a new bag
    Bag.create(req.body.bag, function(err, newBag){
        if(err){
            res.render("bagsList/new");
        } else {
            newBag.author.id = req.user._id;
            newBag.author.username = req.user.username;
            newBag.save();
            res.redirect("/bagList");
        }
    });
});

//NEW - show form to create new collection
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("bagsList/new");
});

// SHOW - shows more info about one bag
router.get("/:id", function(req, res) {
    //find the bag with provided ID
    Bag.findById(req.params.id).populate("comments").exec(function(err, foundBag){
        if (err){
            res.redirect("/bagList");
        } else {
            res.render("bagsList/show", {bag: foundBag});
        }
    });
});

// UPDATE ROUTE
router.get("/:id/edit", middleware.checkBagOwnership, function(req, res) {
    Bag.findById(req.params.id, function(err, foundBag){
        if(err){
            res.redirect("/bagsList");
        } else {
            res.render("bagsList/edit", {bag: foundBag});
        }
    });
});

// EDIT ROUTE
router.put("/:id", middleware.checkBagOwnership, function(req, res){
    Bag.findByIdAndUpdate(req.params.id, req.body.bag, function(err, updatedBag){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/bagList/" + updatedBag._id);
        }
    });
});

// DESTORY ROUTE
router.delete("/:id", middleware.checkBagOwnership, function(req, res){
    Bag.findByIdAndRemove(req.params.id, req.body.bag, function(err, deleteBag){
        if(err){
            res.redirect("/bagList");
        } else {
            res.redirect("/bagList");
        }
    });
});

router.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

module.exports = router;