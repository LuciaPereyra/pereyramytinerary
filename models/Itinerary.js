const mongoose = require("mongoose")

const itinerarySchema = new mongoose.Schema({
    cityId: {type: mongoose.Schema.ObjectId, ref: "city"},
    title: {type: String, required:true},
    userName:{type: String, required:true},
    userPic: {type:String, required:true},
    likes: {type: Array, default: []},
    hours: {type:Number, required:true},
    price: {type:Number, required:true},    
    hashtag: {type:Array, required:true},
    
    activities:[{ 
        activityImage:{type:String, required:true}, 
        activityTitle:{type:String, required:true}
    }],
 
    comments:[{
        userPic:{type:String, required:true},
        userName:{type:String, required:true},
        comment:{type:String, required:true} 
    }]
    
}) // acá defino mi Schema (molde)

const Itinerary = mongoose.model("itinerary",itinerarySchema) 

module.exports = Itinerary