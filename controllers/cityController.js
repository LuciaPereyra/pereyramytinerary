const data = [ // este es mi array de objetos con las propiedades y valor de cada ciudad
    {
        _id: 1,
        cityName: "Istanbul",
        cityPic: "/assets/Estambul.jpg"
    },
    {
        _id: 2,
        cityName: "Rio de Janeiro",
        cityPic: "/assets/Riodejaneiro.jpg"
    },
    {
        _id: 3,
        cityName: "Prague",
        cityPic: "/assets/Praga.jpg"
    },
    {
        _id: 4,
        cityName: "Sydney",
        cityPic: "/assets/Sydney.jpeg"
    },
]

const cityController = {
    // devolver al front todas las cities
    allCities: (req, res) => { // ruta del backend, se modifica en fetch 
        // devolver al frontend la lista de todas las ciudades, la info vendrá de una base de datos
        res.json({
            respuesta: data

        }) // este es el controlador, con una función de colvald que recibe dos parametros: request y response. el back responderá con archivo.json "bienvenido"
    },


    singleCity: (req, res) => { // devolverá id dinámico, no es el mismo id que en frontend 
        // capturo id que viene en el endopoint al cual me estan pegando 
        // devolver al front solo la city que me piden por ID
        const id = parseInt(req.params.id)
        data.map(info => {
            if (info._id === id) {
                res.json({
                    respuesta: info
                })
            }
        })
    }
}
module.exports = cityController