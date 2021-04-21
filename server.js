const express = require("express") 
const path = require('path')
require("dotenv").config()
require("./config/database")
const cors = require("cors") 
const router = require('./routes/index')
const app = express()



app.use(express.json()) 
app.use(cors()) 

app.use("/api", router)

const port = process.env.PORT || 4000 
const host = process.env.HOST || '0.0.0.0'


app.listen(port, () => console.log(`App listening on port ${port}`))
// app.listen(port,host, () => console.log("App listening on port 4000")) 