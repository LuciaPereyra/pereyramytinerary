const express = require("express")
const router = express.Router()
const cityController = require("../controllers/cityController")

router.route("/cities") // la ruta a la que te pegan es /cities y el método get, ejecutá éste controlador
.get(cityController.allCities)

router.route("/city/:id")
.get(cityController.singleCity)
// le digo, cuando te hagan un pedido de tipo get, a esta ruta ejecutale el controlador (a la api le llegaran pedido a rutas distinas y de tipos distintos, ej get es para pedir. ejecuta esta funcion llamada controlador)

//request: traerá datos del pedido que están haciendo

// response: ejecutará la respuesta del backend al pedido del front

module.exports = router 
// exportamos la variable creada en el mismo componente