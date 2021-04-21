const Itinerary = require("../models/Itinerary")

const itineraryController = {

    addItinerary: (req, res) => {
        // agrega itinerarios 
        const { cityId, title, userName, userPic, likes, hours, price, hashtag, activities, comments } = req.body
        const itineraryAAgregar = new Itinerary({
            // creo nuevo itinerario
            cityId, title, userName, userPic, likes, hours, price, hashtag, activities, comments
        })

        itineraryAAgregar.save()
            // grabo nuevo itinerario, 
            .then(async itineraryAgregada => { // lo que devuelve la promesa, aplicale populate el campo citiId, 
                const itineraryPopulada = await itineraryAgregada.populate("cityId").execPopulate()// devuelvo Itinerario populado
                res.json({ success: true, response: itineraryPopulada })
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
        // devolver al front solo el itinerario que me piden por ID
        const id = req.params.id
        console.log(id)
        await Itinerary.find({ cityId: id }).populate("cityId")
            .then(itinerary => res.json({ success: true, respuesta: itinerary }))
            .catch(error => res.json({ success: false, error }))
    },

    addFav: (req, res) => {
        console.log("estoy en controlador addFav")
        const id = req.params.id
        const user = req.user
        Itinerary.findOneAndUpdate(
            { _id: id },
            { $push: { 'likes': user._id } }, { new: true })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ success: false, error }))
    },

    unFav: (req, res) => {
        console.log("estoy en controlador unFav")
        const id = req.params.id
        const user = req.user
        Itinerary.findOneAndUpdate(
            { _id: id },
            { $pull: { 'likes': user._id } }, { new: true })
            .then(data => res.json({ success: true, response: data }))
            .catch(error => res.json({ success: false, error }))
    },

    addComment: async (req, res) => {
        const { idItinerary, comment } = req.body.newComment // capturo id de itinerario 
        const user = req.user
        try {
            const addComment = await Itinerary.findOneAndUpdate(
                { _id: idItinerary },
                { $push: { 'comments': { userPic: user.urlPic, userName: user.firstName, comment: comment, idUser: user._id } } }, { new: true })
            if (addComment) {
                res.json({ success: true, response: addComment })
            } else {
                res.json({ success: false, error: "error while add comments" })
            }
        } catch (error) {
            res.json({ success: false, error })
        }
    },



}
module.exports = itineraryController