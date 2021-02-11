const passport = require("passport")
const jwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const User = require("../models/User")

// jwt es quien emite el token, cuando el usuario se loguea (y cuando crea una cuenta, porque luego también se loguea) 
// passport es quien controla el token (policía) a traves de una estrategia

module.exports = passport.use(new jwtStrategy({ // exportamos estrategia, linkea passport con jwt, relacionamos quien emite token con quien debe controlarlo
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // acá indico a passport que saque el jwtoken de la header de la petición (json) 
    secretOrKey: process.env.KEY_SECRET // aca indicamos que lo decodifique usando la clave secreta (como lo interpretará)
}, (payload, done)=>{
    User.findById(payload._doc._id)// en payload guarda 
    .then(user=> {
        if(!user){
            return done(null,false)
        }else{
            return done(null,user)
        }
    })
    .catch(error=>{
        return done(error, false)
    })
}))



//(primer parametro) el usuario se loguea y genera un nuevo token, lo emite JWT(agarra todos los datos del usuario logueado, lo encripta con frase secreta y devuelve al Front),
// lo controla el passport, cuando le hagan un pedido de la ruta protegida, extrae el token de esa petición desde header  c/ la estrategia establecida,
// interpretalo decodificando c/clave secreta en .env. y buscá el usuario con ese id
// (segundo param, función de callback, recibe dos parám), acá hacemos la búsqueda. 
//payload: acá cae el token, ya los decodificó y busca si existe el usuario, a traves del modelo de usuario busca por id dentro de la payload
// si el usuario no existe cae en el then (porque la promesa se resuelve pero no lo encuentra, es null), 
//cae en el catch si la promesa no se resuelve (ERROR)
//DONE ES UNA FUNCIÓN QUE SE EJECUTA CUANDO TERMINA LA BÚSQUEDA (SE RESUELVA O NO LA PROMESA) SI HAY ERROR SE ALOJA EN ERROR Y NO HAY USUARIO (FALSE)
// DONE SI LA PROMESA SE RESUELVE SE ALOJA EN USER, SI ES NULL (NO HAY OBJETO CON USUARIO) ERROR NULL, FALSE USER. 