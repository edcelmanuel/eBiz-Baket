const dotenv = require("dotenv")
dotenv.config()

const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const port = process.env.PORT
var server = app.listen(port, () => console.log(`Listening on port ${port}`))

const rootRoute = require("./routes/root")

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*")

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, content-type, X-Custom-Header, Upgrade-Insecure-Requests, Authorization"
    )

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true)

    // Pass to next layer of middleware
    next()
})

app.use(express.static("public"))

app.use("/", rootRoute)
