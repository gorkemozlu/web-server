//nodemon .\src\app.js -e js,hbs
//http://localhost:3000/api/weather?address=istanbul
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//Define paths for express config
publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../views-templates/views')
const partialsPath = path.join(__dirname,'../views-templates/partials')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server 
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=> {
    res.render('index',{
        title: 'Weather App',
        name: 'gorkem'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Gorkem'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'helpful text',
        name: 'Gorkem'
    })
})

app.get('/api/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address'
        })

    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address 
            })
        })    
    })
    //console.log(req.query.search)
    //res.send({
    //    forecast: 'it is sunny',
    //    location: 'istanbul',
    //    address: req.query.address
    //})
})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title: 'HELP ARTICLE NOT FOUND',
        name: 'Gorkem'
    })
    
})

app.get('*',(req,res)=>{
    res.render('404page',{
        title: '404 PAGE NOT FOUND',
        name: 'Gorkem'
    })
    
})


//app.get('/help',(req,res)=>{
//    res.send({
//        name:'Andrew',
//        age: '27'
//    })
//})//

app.listen(3000,()=>{
    console.log('server is up on 3000 port!!!!')
})