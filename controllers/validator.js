const Joi = require("joi")

const validator = {
    validUserNew: (req, res, next) => {
        const schema = Joi.object({
            userName: Joi.string().trim().required().email({ minDomainSegments: 1, tlds: { allow: false } }),
            firstName: Joi.string().trim().required().min(2).max(10),
            lastName: Joi.string().trim().required().min(2).max(10),
            email: Joi.string().trim().required().email({ minDomainSegments: 1, tlds: { allow: false } }),
            password: Joi.string().trim().required().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,8}$/), // PASS: LMAYUSC, LMINUSC,N0-9,6,8CARAC
            urlPic: Joi.string().uri(),
            country: Joi.string(),
            googlePic: Joi.string(),
            google: Joi.string(),
        })

        const validation = schema.validate(req.body, { abortEarly: false })

        if (!validation.error) {
            next() // se indica next para que diga al controlador si todo ok   
        } else {
            res.json({ success: false, errores: validation.error })

        }
    }



}
module.exports = validator