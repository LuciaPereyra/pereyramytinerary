const express = require("express")
const router = express.Router()
require('../config/passport')
const passport = require('passport')
const cityController = require("../controllers/cityController")
const itineraryController = require("../controllers/itineraryController")
const userController = require("../controllers/userController")
const validator = require("../controllers/validator")


router.route("/cities") 
.get(cityController.allCities)
.post(cityController.addCity)

router.route("/city/:id")
.get(cityController.singleCity)

router.route("/itinerary")
.get(itineraryController.allItineraries)
.post(itineraryController.addItinerary)
.put(passport.authenticate("jwt",{session:false}),itineraryController.addComment)


router.route("/itinerary/:id")
.get(itineraryController.itinerariesById)
.post(itineraryController.itinerariesById)

router.route("/user/signup")
.post(validator.validUserNew, userController.signUp)

router.route("/user/login")
.post(userController.logIn)

router.route('/itinerary/like/:id')
.put(passport.authenticate("jwt",{session:false}),itineraryController.addFav)

router.route('/itinerary/unlike/:id')
.put(passport.authenticate("jwt",{session:false}),itineraryController.unFav)

module.exports = router 
