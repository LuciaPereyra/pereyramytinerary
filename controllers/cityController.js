const City = require("../models/City")

const cityController = {
    // devolver al front todas las cities
    addCity: (req, res) => {
        // creo nueva instancia de mi modelo 
        const cityAAgregar = new City({
            cityName: req.body.cityName,
            cityPic: req.body.cityPic
        })
        cityAAgregar.save()
            .then(cityAAgregar => {
                return res.json({ success: true, response: cityAAgregar })
            })
            .catch(error => {
                return res.json({ success: false, response: error })
            })

    },

    allCities: async (req, res) => {
        // devolver al frontend la lista de todas las ciudades, la info vendrá de una base de datos
        const data = await City.find()
        res.json({
            respuesta: data

        })
    },

    singleCity: async (req, res) => {
        // devolver al front solo la city que me piden por ID
        const id = req.params.id
        const capturoId = await City.findById(id)
        try {
            res.json({ success: true, respuesta: capturoId })
        } catch (error) {
            return res.json({ success: false, response: error })
        }
    }
}
module.exports = cityController