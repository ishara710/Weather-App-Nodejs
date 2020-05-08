const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
const app = express()
const port = (process.env.PORT || 3000)

// Define Paths for Express Config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.use(express.static(path.join(__dirname,'../public')))
hbs.registerPartials(partialsPath)

// Setup handlebars, engines views location
app.set('view engine','hbs') 
app.set('views', viewsPath)
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ishara Mahapatra'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'Help Me',
        title: 'Help Page',
        name: 'Ishara Mahapatra'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ishara Mahapatra'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        res.send({
            error: 'Please provide a search address'
        })
    } else {
        geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
            if (error) {
                res.send({
                    error: 'error'
                })
            }
            
            forecast(latitude,longitude,(error,forecastData) => {
                if (error) {
                    res.send({
                        error: 'error'
                    })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
                // console.log('Error', error)
                // console.log('Data', data)
                
            })
        })
    }
    
})

app.get('/help/*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Ishara Mahapatra',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Ishara Mahapatra',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is set up at port' + port)
})