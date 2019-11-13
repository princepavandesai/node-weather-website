const request=require('request')
const geocode=(address, callback) =>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGF2YW4wMDciLCJhIjoiY2sybG9jenc3MDliZDNobzZ0cGw1ZTI0bCJ9.j0I4iORFb0om4dW_RkK0Xw&limit=1'
    request({url, json: true}, (error, response) => {
        if(error){
            callback('There is no network connection', undefined)
        }else if(response.body.features.length===0){
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            callback(undefined,{
            Latitude:response.body.features[0].center[1],
            Longitude:response.body.features[0].center[0],
            Location:response.body.features[0].place_name
        })
        }
    })

}
module.exports=geocode