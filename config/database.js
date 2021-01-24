const mongoose = require("mongoose")

//conexión a base de datos, siempre es async
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    UseUnifiedTopology: true,
    useFindAndModify: false

})
    .then(() => console.log("Database connected"))
    .catch(error => console.log(error)) // catcheo error y lo imprimo. 