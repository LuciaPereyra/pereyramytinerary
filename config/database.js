const mongoose = require('mongoose')

//conexión a base de datos, siempre es async
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false

})
    .then(() => console.log("Database connected"))
    .catch(error => console.log("Error "+error)) // catcheo error y lo imprimo. 

