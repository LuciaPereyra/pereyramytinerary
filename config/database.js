const mongoose = require("mongoose")

//conexión a base de datos, siempre es async
mongoose.connect("mongodb+srv://LuciaPereyra:MongoDB77@cluster0.d0kmm.mongodb.net/Mytinerary?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    UseUnifiedTopology: true,
    useFindAndModify: false

})
    .then(() => console.log("Database connected"))
    .catch(error => console.log(error)) // catcheo error y lo imprimo. 