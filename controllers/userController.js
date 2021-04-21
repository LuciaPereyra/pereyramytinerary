const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const path = require('path')

const userController = {
    signUp: async (req, res) => {
        var errores = []
        try {
            const { userName, firstName, lastName, email, urlPic, country, password } = req.body
            const userRegistrado = await User.findOne({ userName: userName })
            if (userRegistrado) {
                errores.push({ path: ['useremailExist'] })
                // let error = [{ path: ['useremailExist'] }]
                // res.json({ success: false, error: error })
            }
            if (errores.length === 0) {
                const passHasheado = bcryptjs.hashSync(password, 10)
                var newUser = new User({
                    userName, firstName, lastName, email, urlPic, country, password: passHasheado
                }) // nueva instancia de usuario
            }
            var newUserSaved = await newUser.save() // intenta grabar usuario nuevo
            var token = jwt.sign({ ...newUserSaved }, process.env.KEY_SECRET, {})
            // EL TOKEN SE GENERA CADA VEZ QUE EL USUARIO SE LOGUEA
            return res.json({
                success: true,
                response: {
                    token,
                    userName: newUserSaved.userName,
                    firstName: newUserSaved.firstName,
                    idUser: newUserSaved._id,
                    urlPic: newUserSaved.urlPic,
                }
            })
        } catch (error) {
            return res.json({
                success: errores.length === 0 ? true : false,
                errores: errores,
            })
        }
    },
    logIn: async (req, res) => {
        const { userName, password } = req.body
        const userRegistrado = await User.findOne({ userName: userName }) // primero verifica que el usuario exista, 
        if (!userRegistrado) {
            return res.json({ success: false, error: 'Incorrect email and / or password.' })
        }

        const passMatch = bcryptjs.compareSync(password, userRegistrado.password) // verifica si el usuario existente coincide con el password
        if (!passMatch) {
            return res.json({ success: false, error: 'Incorrect email and / or password.' })
        }
        var token = jwt.sign({ ...userRegistrado }, process.env.KEY_SECRET, {})
        return res.json({
            success: true, response: {
                token,
                firstName: userRegistrado.firstName,
                userName: userRegistrado.userName,
                idUser: userRegistrado._id,
                urlPic: userRegistrado.urlPic
            }
        })
        // respondo al frontEnd con un objeto que tiene el token, nombre de usuario y foto
    },
}
module.exports = userController
