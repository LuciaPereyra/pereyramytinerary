const passport = require("passport")
const jwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const User = require("../models/User")

module.exports = passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // acá indico a passport que saque el jwtoken de la header de la petición (json) 
    secretOrKey: process.env.KEY_SECRET // aca indicamos que lo decodifique usando la clave secreta (como lo interpretará)
}, (payload, done) => {
    User.findById(payload._doc._id)// en payload guarda 
        .then(user => {
            if (!user) {
                return done(null, false)
            } else {
                return done(null, user)
            }
        })
        .catch(error => {
            return done(error, false)
        })
}))
