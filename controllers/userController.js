const User = require("../models/User")
const bcryptjs = require("bcryptjs")

const userController = {
    signUp: async (req, res) => {
     var errores=[]
       const { userName,firstName,lastName,email,password, urlPic,country} = req.body

       const userRegistrado = await User.findOne({userName: userName}) // findOne devuelve un objeto con todos los usuarios, si no existe devuelve: Null
       // valida username, busco en mi DB a traves del modelo, algún usuario cuyo UserName (propiedad de DB) sea el userName (userName que envía el usuario) 
       if (userRegistrado) {
        // si userValidated existe responde error, pero si no existe será Null, y seguirá, entonces creamos usuario
           errores.push( "Nombre de usuario existente") 
       }

       // si no hay errores, entra al IF y grava el nuevousuario, almacenado en variable 
       if(errores.length === 0){
           const passHasheado = bcryptjs.hashSync(password, 10)// agrega 10 vueltas más (una longitud)
           //     antes de gravar user tengo que hashear
           //    método p/hashear toma dos param, un "string"(es el pass que quiero hashear) y los solt: x default se pone 10 (nivel de hasheo)
    
            var newUser = new User ({
                userName,firstName,lastName,email,urlPic,password: passHasheado,country 
           }) 
           
            var newUserSave = await newUser.save()
           .then(newUser => res.json({ success: true, response: newUser }))
           .catch(error => res.json({ success: false, mensaje: error}))
        }

        return res.json({success: errores.length === 0 ? true: false,
                         errores: errores,
                         response: newUserSave
                        })
                        // una sola respuesta al FE, en base a la validación de errores. si es false, mapea errores y los envía, tampoco se crea el usuario
     },


    logIn: async (req,res) => {
        const {userName, password} = req.body
        const userRegistrado = await User.findOne({userName:userName}) // primero verifica que el usuario exista, 
        if (!userRegistrado) {
            return res.json ({success: false, mensaje: "El usuario y/o contraseña no existe"})
        }

        const passMatch = bcryptjs.compareSync(password, userRegistrado.password)
        //veo si la password conincide, aplico método compareSync a bcryptjs,  dos param para comparar (el pass legible que envía el user y el pass hasheado)
        if(!passMatch){
            return res.json({success:false, mensaje: "El Password no coincide"})
        }
        return res.json({success: true})

    },

}
module.exports = userController

// método Split devuelve una array con el string dividido por lo que le indico 