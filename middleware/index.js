// all the middleware goes here
var middlewareObj = {};
var Bag                   = require("../models/bag");
var Comment               = require("../models/comment");
var User                  = require("../models/user");


middlewareObj.checkBagOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Bag.findById(req.params.id, function(err, foundBag){
            if(err){
                req.flash("error", "Bag not found!");
                res.redirect("back");
            } else {
                // does user own the collection?
                if(foundBag.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have the permission to do that!");
                    res.redirect("/bagList/" + req.params.id);
                } 
            }
        });
    } else {
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not found!");
                res.redirect("back");
            } else {
                // does user own the collection?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have the permission to do that!");
                    res.redirect("/bagList/" + req.params.id);
                } 
            }
        });
    } else {
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}

module.exports = middlewareObj;
