const request= require('request')

const forecast= (Latitude, Longitude, callback)=>{/*Number of arguments must and should match in function i.e. 3*/
    const url='https://api.darksky.net/forecast/a7644833943193753bb70026e3f5fb67/'+Latitude+','+Longitude+'?units=si'
    request({url, json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to Weather Service', undefined)
        }else if(response.body.error){
            callback('Unable to find Location', undefined)
        }
        else{
            
            callback(undefined,
                response.body.daily.data[0].summary+'It is currently '+ response.body.currently.temperature +' degree out.'+ 'There is a '+response.body.currently.precipProbability +'% chance of rain.'
            )
            
        }
        
    })
}

module.exports=forecast