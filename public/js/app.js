console.log('client side js is loaded')

const weatherForm = document.querySelector('form')
const search =  document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgSec = document.querySelector('#msg-2')

//msgOne.textContent = 'From JS'


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const slocation = search.value
    console.log(slocation)
    const wurl = '/api/weather?address=' + slocation
    msgSec.textContent = 'Loading'
    //console.log(wurl)
    fetch(wurl).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                msgSec.textContent = data.error
            }else{
                console.log(data.location)
                console.log(data.forecast)
                msgOne.textContent = data.location
                msgSec.textContent = data.forecast
                
            }
        })
})
})

