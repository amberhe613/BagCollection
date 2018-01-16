var mongoose   = require("mongoose"),
    Bag        = require("./models/bag"),
    Comment    = require("./models/comment");
    
var data = [
    {
        brand: "CHLOÉ", 
        name:  "Mini Marcie' Leather Crossbody Bag", 
        image: "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/6/_102347526.jpg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838&dpr=2&quality=60",
        description: "Richly pebbled leather in two complimentary hues refines the look of a perfectly proportioned Italian tote subtly branded with an inlaid Gancio charm at the exterior zip pocket."
    },
    {
        brand: "CHLOÉ", 
        name:  "Mini Marcie' Leather Crossbody Bag", 
        image: "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/6/_102347526.jpg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838&dpr=2&quality=60",
        description: "Richly pebbled leather in two complimentary hues refines the look of a perfectly proportioned Italian tote subtly branded with an inlaid Gancio charm at the exterior zip pocket."
    },    
    {
        brand: "CHLOÉ", 
        name:  "Mini Marcie' Leather Crossbody Bag", 
        image: "https://n.nordstrommedia.com/ImageGallery/store/product/Zoom/6/_102347526.jpg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838&dpr=2&quality=60",
        description: "Richly pebbled leather in two complimentary hues refines the look of a perfectly proportioned Italian tote subtly branded with an inlaid Gancio charm at the exterior zip pocket."
    }
    ]
function seedDB(){
    Bag.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed!");
        // add a few bags
        data.forEach(function(seed){
            Bag.create(seed, function(err, data){
                if(err){
                    console.log(err);
                }
                console.log("added a bag");
                //create a comment
                Comment.create(
                {
                    text: "This bag is great, but I wish it to be cheaper.",
                    author: "Lily"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        data.comments.push(comment._id);
                        data.save();
                        console.log("Created new comment")
                    }
                });
            });
        });
    });  
}

module.exports = seedDB;