const Itinerary = require("../models/Itinerary")

const itineraryController={

    addItinerary: (req, res) => {
        // agrega itinerarios 
        const {cityId, title, userName, userPic, likes, hours, price, hashtag, activities, comments} = req.body
        const itineraryAAgregar = new Itinerary({
            // creo nuevo itinerario
               cityId, title, userName, userPic, likes, hours, price, hashtag, activities, comments})
    
        itineraryAAgregar.save()
        // grabo nuevo itinerario, 
            .then (async itineraryAgregada => { // lo que devuelve la promesa, aplicale populate el campo citiId, 
                const itineraryPopulada = await itineraryAgregada.populate("cityId").execPopulate()// devuelvo Itinerario populado
                 res.json({ success: true, response: itineraryPopulada})
            })
            .catch(error => {
                return res.json({ success: false, response: error })
            })


    },
        allItineraries: async (req, res) => {
            // devolver al frontend la lista de todos los itinerarios, la info vendrá de una base de datos
            const data = await Itinerary.find()
            res.json({
                respuesta: data

            })
        },

    itinerariesById: async (req, res) => {
        // devolver al front solo la el itinerario que me piden por ID
      
       Itinerary.find({cityId:id}).populate("cityId")
      .then(itinerary=> res.json({success:true, respuesta:itinerary}))
      .catch(error=>res.json({success:false, error}))
    }

     


}
module.exports = itineraryController