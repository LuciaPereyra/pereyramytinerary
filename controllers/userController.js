const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userController = {
    signUp: async (req, res) => {
     var errores={details:[]}
     const { userName,firstName,lastName,email,password, urlPic,country} = req.body
     
     const userRegistrado = await User.findOne({userName: userName}) // findOne devuelve un objeto con todos los usuarios, si no existe devuelve: Null
     // valida username, busco en mi DB a traves del modelo, algún usuario cuyo UserName (propiedad de DB) sea el userName (userName que envía el usuario) 
     if (userRegistrado) {
         // si userRegistrado existe responde error, pero si no existe será Null, y seguirá, entonces creamos usuario
         errores.details.push({message:"Nombre de usuario existente"}) 
        }

       // si no hay errores.details, entra al IF y grava el nuevousuario, almacenado en variable newUser
       if(errores.details.length === 0){
           const passHasheado = bcryptjs.hashSync(password, 10)// agrega 10 vueltas más ( longitud)
           //     antes de gravar user tengo que hashear (proteger contraseña)
           //    método p/hashear toma dos param, un "string"(es el pass que quiero hashear) y los solt: x default se pone 10 (nivel de hasheo)
    
            var newUser = new User ({
                userName,firstName,lastName,email,urlPic,password: passHasheado,country 
           }) // nueva instancia de usuario
           
            var newUserSaved = await newUser.save() // gravo usuario nuevo

           // genero token, usando librería jwt, toma tres param: la payload(lo que voy a proteger), la secret key (frase secreta, que se almacena en var de entorno en .env) y las options 
           var token= jwt.sign({...newUserSaved},process.env.KEY_SECRET,{})// spread operation porque sino crea un objeto con prop. newusersave con valor newusersave(objeto dentro de un objeto). crea un objeto con propiedades y valores de lo que hay dentro de newusersaved
           // EL TOKEN SE GENERA CADA VEZ QUE EL USUARIO SE LOGUEA (cuando crea nueva cuenta y cuando ingresa como usuarioregistrado)


        }
        
        return res.json({success: errores.details.length === 0 ? true : false,
                         errores: errores,
                         response: errores.details.length === 0 && {token,userName:newUserSaved.userName,picture:newUserSaved.urlPic}
                        })
                        // una sola respuesta al FE, en base a la validación de errores.details. si es false, mapea errores.details y los envía, tampoco se crea el usuario
                        // el token es lo que se grabará en redux y FE 
     },


    logIn: async (req,res) => {
        const {userName, password} = req.body
        const userRegistrado = await User.findOne({userName:userName}) // primero verifica que el usuario exista, 
        if (!userRegistrado) {
            return res.json ({success: false, mensaje: "El usuario y/o contraseña no existe"})
        }

        const passMatch = bcryptjs.compareSync(password, userRegistrado.password) // verifica si el usuario existente coincide con el password
        //veo si la password conincide, aplico método compareSync a bcryptjs,  dos param para comparar (el pass legible que envía el user y el pass hasheado)
        if(!passMatch){
            return res.json({success:false, mensaje: "El Password no coincide"})
        }
        var token = jwt.sign({...userRegistrado},process.env.KEY_SECRET,{})
        return res.json({success: true, response:{token,userName:userRegistrado.userName, picture:userRegistrado.urlPic}})
        // respondo al frontEnd con un objeto que tiene el token, nombre de usuario y foto

    },

}
module.exports = userController

// método Split devuelve una array con el string dividido por lo que le indico 