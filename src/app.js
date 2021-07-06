const hbs = require("hbs")
const path = require("path")
const express = require("express")
const app = express()
const publicDirPath=path.join(__dirname,"../public")
const templatesDirPath=path.join(__dirname,"../templates/views")
const partialsDirPath=path.join(__dirname,"../templates/partials")
const forcast = require("./utils/forcast")
const geocode = require("./utils/geocode")

app.set("view engine", "hbs")
app.set("views", templatesDirPath)
hbs.registerPartials(partialsDirPath)

app.use(express.static(publicDirPath))

app.get('',(req, res)=>{
    res.render("index",{
        title:"Whether App",
        name: "Naga"
    })
})

app.get('/about',(req, res)=>{
    res.render("about",{
        title:"About page",
        name: "Naga"
    })
})

app.get('/whether',(req, res)=>{
    if(!req.query.address){
        res.send({
            "message":"No address found!"
        })
    }else{
        geocode(req.query.address,(error, {latitude,longitude,location} = {}) => {
            if(error){
                return res.send({
                    "error":error
                })
            }
            if(!latitude || !longitude){
                return res.send({
                    "error":"Invalid address data"
                })
            }
            forcast(latitude, longitude, (error, forcastData) => {
                if(error){
                    return res.send({
                        "error":error
                    })
                }
                return res.send({
                    "lattitude":latitude,
                    "longitude":longitude,
                    "location":location,
                    "forcast_data": forcastData
                })
            })
        })
    }
})


app.get('help/*',(req, res) => {
    res.render("404-page",{
        "infoMessage":"Page not found",
        "Title" : "Error page",
        "name" : "Naga"
    })
})

app.get('*',(req, res) => {
    res.render("404-page",{
        "infoMessage":"Page not found",
        "Title" : "Error page",
        "name" : "Naga"
    })
})

app.listen(3000,()=>{
    console.log("Server is running on 3000 Port")
})