const request = require("request")

const forcast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=d3839221ef60f0fadd79445599ede9b1&query="+latitude+","+longitude
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback("Unable to connect whether forcast!",undefined)
        }else if(body.error){
            callback(body.error.info, undefined)
        }else{
            callback(undefined,"It is currently "+body.current.temperature+" degree out." + "There is a "+ body.current.weather_descriptions)
        }
    })
}

module.exports = forcast