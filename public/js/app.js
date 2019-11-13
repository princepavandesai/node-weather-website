console.log('I am from App.js file')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector('#msg1')
const messagtwo=document.querySelector('#msg2')


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location=search.value
    //console.log(location)
    messageone.textContent='Loading data...'
    messagtwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
response.json().then((data) =>{
    if(data.error){
        //console.log(data.error)
        messageone.textContent=data.error
        //messagtwo.textContent=''
    }else{
            messageone.textContent=data.forecast
            messagtwo.textContent=data.location
            //console.log(data.forecast)
            //console.log(data.location)
        }
})
})
})

