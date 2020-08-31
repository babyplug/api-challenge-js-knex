require('dotenv').config()

const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path')

const port = process.env.PORT || 3000
// setting static
let publicDir = path.join(__dirname, "/public");

// route
const routes = require('./routes')

// SETUP 
app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}))

app.use('/api/public', express.static(publicDir))
app.use('/api', routes)

app.use((_, res) => {
	res.status(404).send('Error 404: Page not found !')
})

app.listen(port, () => {
	console.log("server is running on port: ", port)
})
