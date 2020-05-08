const request = require('request')


const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=de95d5841a5d052483fea96005b29c35&query=' + latitude +',' + longitude + '&units=f'
    request({url, json: true}, (error,{body}) =>{
         if(error) {
                callback("Unable to connect to weather services", undefined)
            } else if (body.error) {
                callback("Unable to find location", undefined)
            } else {
                callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. Feels like " + body.current.feelslike + " " + " degrees. The humidity is " + body.current.humidity + "%" )
            }

})
}

module.exports = forecast