const mongoose = require("mongoose")

const itinerarySchema = new mongoose.Schema({
    cityId: {type: mongoose.Schema.ObjectId, ref: "city"},
    title: {type: "String", required:true},
    userName:{type:"String", required:true},
    userPic: {type:"String", required:true},
    likes: {type:"Number", required:false, default:0},
    hours: {type:"Number", required:true},
    price: {type:"Number", required:true},    
    hashtag: {type:"Array", required:true},
    
    activities:[
        {activityImage:{type:"String", required:true}}, 
        {activityTitle:{type:"string", required:true}}
        ],
 
    comments:[
        {userPic:{type:"String", required:false}},
        {userName:{type:"String", required:false}},
        {comment:{type:"String", required:false}} 
        ]
    
}) // acá defino mi Schema (molde)

const Itinerary = mongoose.model("itinerary",itinerarySchema) 

module.exports = Itinerary