const express = require("express")
const router = express.Router()
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

router.route("/itinerary/:id")
.get(itineraryController.itinerariesById)

router.route("/user/signup")
.post(validator.validate, userController.signUp)

router.route("/user/login")
.post(userController.logIn)






module.exports = router 

// Método GET, es un pedido, lleva los datos de forma "visible" al navegador web (cliente) por medio de la URL.
// Método POST, responde al pedido de forma "oculta" (el cliente no lo puede ver) en base a lo que responde el controlador de origen. 
