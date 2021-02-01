const express = require("express")
const router = express.Router()
const cityController = require("../controllers/cityController")
const itineraryController = require("../controllers/itineraryController")


router.route("/cities") 
.get(cityController.allCities)
.post(cityController.addCity)

router.route("/city/:id")
.get(cityController.singleCity)

router.route("/itinerary")
.get(itineraryController.allItineraries)
.post(itineraryController.addItinerary)

router.route("/itinerary/:id")
.get(itineraryController.itinerariesById)






module.exports = router 
