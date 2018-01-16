var express = require("express"),
    Bag     = require("../models/bag"),
    Comment = require("../models/comment"),
    router  = express.Router({mergeParams: true}),
    middleware = require("../middleware");
    
//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Bag.findById(req.params.id).populate("comments").exec(function(err, foundBag){
        if (err){
            res.redirect("/bagList" + req.params.id);
        } else {
            res.render("comments/new", {bag: foundBag});
        }
    });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup bag using ID
    //create new comment
    //connect new comment to bag
    //redirect bag show page
    Bag.findById(req.params.id, function(err, bag){
        if (err){
            console.log(err);
            res.redirect("/bagList");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    bag.comments.push(comment._id);
                    bag.save();
                    req.flash("success", "Comment created!");
                    res.redirect("/bagList/" + bag._id);
                }
            });
        }
    });
});

// UPDATE ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, req.body.comment, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {bag_id: req.params.id, comment: foundComment});
        }
    });
});

// EDIT ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment editted!");
            res.redirect("/bagList/" + req.params.id);
        }
    });
});

// DESTORY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, req.body.comment, function(err, deleteComment){
        if(err){
            res.redirect("/bagList/" + req.params.id);
            req.flash("error", "Something Wrong~");
        } else {
            req.flash("success", "Comment deleted!");
            res.redirect("/bagList/" + req.params.id);
        }
    });
});

router.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next();
});


module.exports = router;