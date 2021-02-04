const validator = {
    validate: (req, res, next) => {
        var errores= []
        const { userName, firstName, email, password} = req.body
        if (firstName === "" || email === "" || password === "" || userName ==="") {
            errores.push("Los campos con (*) son obligatorios")
        }
        if (userName.split("@").length !== 2) {
            // valido que el mail tenga dos partes
            errores.push("El mail es incorrecto")
        }
        if (userName.split("@")[1].split(".").length < 2 || userName.split("@")[1].split(".").length > 3) {
            errores.push("El mail esta incorrecto") 
            //divido userName por @ y le digo: la segunda parte ([indice 1]) split por un (".") si hay uno (menos de 2) quiere decir que no hay punto
            // valido que la segunda parte de lo que divide el arroba tenga dos partes o tres pero nunca una o más de tres
        }
        if (password.length < 6){
            // valido que el pass tenga una length mínima de 6
           errores.push("El password debe contener como mín 6 caracteres") 
        }
    
        if (errores.length > 0) {
            res.json({succes: false, error})
        }else {
            next()
        }
        
    }
    


}
module.exports = validator