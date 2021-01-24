const mongoose = require("mongoose")

const citySchema = new mongoose.Schema({
    cityName:{type:"String",required:true},
    cityPic:{type:"String",required:true}
}) // acá defino mi Schema (molde)

const City = mongoose.model("city",citySchema) 

module.exports = City