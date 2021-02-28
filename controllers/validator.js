const Joi = require("joi")

const validator = {
    validUserNew: (req, res, next) => {
        const schema = Joi.object({
            userName: Joi.string().trim().required().email({ tlds: {allow: false} }),
            firstName: Joi.string().trim().required().min(2).max(10),
            lastName: Joi.string().trim().required().min(2).max(10),
            email: Joi.string().trim().required().email({minDomainSegments: 1, tlds: {allow: false} }),
            password: Joi.string().trim().required(), // PASS: LMAYUSC, LMINUSC,N0-9,3,8CARAC
            // urlPic: Joi.string().uri().required(),
            // country: Joi.string().required()
        })

        const validation = schema.validate(req.body, {abortEarly:false})
        // .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{3,8}$/)

        //const validation es mi validator, valida el nuevo usuario para evitar duplicados basado en mi schema de Joi, en req.body llegan los campos necesarios a validar
        // abortEarly: false le decimos que ignore el primer false y continúe evaluando, de lo contrario se quedaría en el primer campo, sin saber si el resto tiene errores
        // validation, genera un objeto con propiedad value (nuevo usuario), prop error (si hay errores) prop details (detalla errores)
 
     
        // hay que razonar cómo mostrar errores personalizados en FE 
       
        if (!validation.error) {
            next() // se indica next para que diga al controlador si todo ok
            
         }else {
            res.json({succes: false, errores: validation.error})
           
    }
}
    


}
module.exports = validator