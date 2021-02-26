const express = require("express") 
const path = require('path')
require("./config/database")
require("dotenv").config()
const cors = require("cors") 
const router = require("./routes/index")

const app = express()



app.use(express.json()) 
app.use(cors()) 

app.use("/api", router)

const port = process.env.PORT || 4000 
const host = process.env.HOST || '0.0.0.0'


app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`))
// app.listen(port,host, () => console.log("App listening on port 4000")) 