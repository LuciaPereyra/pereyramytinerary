const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: String, // no va requerido ni default porque se hará validación
    firstName:String,
    lastName: String,
    email: String,
    password: String,
    urlPic: String,
    country: String
})

const User = mongoose.model("user", userSchema)

module.exports = User