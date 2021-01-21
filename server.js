const express = require("express") // acá importamos librería express con sintaxis vieja 
const cors = require("cors") // agregado para que cualquier front pueda consumir mi back
const router = require("./routes/index")


const app = express() // creamos un servidor (app que será una instancia de este express y será mi aplicación)

// middlewares, funciones que se ejecutan antes de llegar a la ruta

app.use(cors()) // le digo que ejecute middleware y que aplique cors


app.use("/api", router)

// le digo, cuando te hagan un pedido de tipo get, a esta ruta ejecutale el controlador (a la api le llegaran pedido a rutas distinas y de tipos distintos, ej get es para pedir. ejecuta esta funcion llamada controlador)

//request: traerá datos del pedido que están haciendo

// response: ejecutará la respuesta del backend al pedido del front

app.listen(4000, () => console.log("App listening on port 4000")) // a mi app la pondremos a escuchar el puerto 4000 (levanto el servidor), la funcion de colvald funciona para que imprima en consola que esta escuchando el port 4000


// este es mi backend, estoy levantando una api que la consumirá mi front 