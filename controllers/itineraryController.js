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
        // devolver al front solo el itinerario que me piden por ID
        const id = req.params.id
      await Itinerary.find({cityId:id}).populate("cityId")
      .then(itinerary=> res.json({success:true, respuesta:itinerary}))
      .catch(error=>res.json({success:false, error}))
    },
    
    addFav: (req, res) => {
        const id = req.params.id
        Itinerary.findOneAndUpdate({ _id: id }, { $addToSet: { likes: req.user._id } })
          .then(data => res.json({ success: true, response: data }))
          .catch(error => res.json({ success: false, error }))
      },
    
      modifyFav: (req, res) => {
        const id = req.params.id
        Itinerary.findOneAndUpdate({ _id: id }, { $pull: { likes: req.user._id } })
          .then(data => res.json({ success: true, response: data }))
          .catch(error => res.json({ success: false, error }))
      },

      postComment: async (req,res) => {
        const {id} = req.body // capturo id de itinerario por la url
        const {comment}= req.body
        const {user}=req
        await Itinerary.findOneAndUpdate({_id:id},{$push:{'comments':{userName:user.userName,userPic:user.urlPic,comments:comment}}},{new:true})
       .then(comentarioagregado=> res.json({success: true, response:comentarioagregado}))
       .catch(error =>res.json({success:false, error}))

    },
     


}
module.exports = itineraryController