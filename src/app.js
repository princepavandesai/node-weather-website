const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//Define paths for express config
const publicdirpath=path.join(__dirname, '../public')
const viewpath=path.join(__dirname, '../templates/views')
const partialpath=path.join(__dirname, '../templates/partials')

//Setup static directory to serve
app.use(express.static(publicdirpath))

//Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)

app.get('', (req, res) =>{
    res.render('index',{
        title:'Weather App',
        name:'Pavan'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title:'About Me',
        name:'Pavan'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title:'Help Page',
        name:'Pavan'
    })
})

app.get('/product', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error:'You have to provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:'[]'
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a address term'
        })        
    }
    geocode(req.query.address, (error, { Latitude, Longitude, Location } = {}) =>{
        if(error){
           return res.send({ error:error })
        }
        forecast(Latitude, Longitude, (error, forecastdata) =>{
            if(error){
                return res.send({ error:error })
            }
            res.send({
                forecast:forecastdata,
                location:Location
                //address:req.query.address

        })
    })
    
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
        title:'404 Page',
        name:'Pavan',
        errormsg:'Help article not found'    
    })
})
app.get('*', (req, res) =>{
    res.render('404', {
        title:'404 Page',
        name:'Pavan',
        errormsg:'Page not found'
    })
    
})

app.listen(3000,()=>{
    console.log('Server is up and running!')
})
