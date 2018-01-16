var mongoose   = require("mongoose");

// Schema Setup
var bagSchema = new mongoose.Schema({
    brand: String,
    name:  String,
    image: String,
    price: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        username: String
    }, 
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
        ]
})

module.exports = mongoose.model("Bag", bagSchema);