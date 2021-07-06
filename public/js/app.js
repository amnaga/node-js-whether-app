console.log("Client side javascript file.")

const whetherSearchForm = document.querySelector('form')
const searctTerm = document.querySelector('input')
const lattitudeData = document.querySelector('#lattitude_data')
const longitudeData = document.querySelector('#longitude_data')
const locationData = document.querySelector('#location_data')
const forecastData = document.querySelector('#forecast_data')
const errorData = document.querySelector('#error_data')

whetherSearchForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    lattitudeData.textContent = "Loading..."
    errorData.textContent = ""
    longitudeData.textContent = ""
    locationData.textContent = ""
    forecastData.textContent = ""
    const location = searctTerm.value
    if(!location){
        lattitudeData.textContent = ""
        longitudeData.textContent = ""
        locationData.textContent = ""
        forecastData.textContent = ""
        errorData.textContent = "Please enter location!"
    }else{
        fetch("http://127.0.0.1:3000/whether?address="+location).then((response)=>{
            response.json().then((data) => {
                console.log(data.error);
                if(data.error){
                    lattitudeData.textContent = ""
                    longitudeData.textContent = ""
                    locationData.textContent = ""
                    forecastData.textContent = ""
                    errorData.textContent = data.error
                }else{
                    errorData.textContent = ""
                    lattitudeData.textContent = data.lattitude
                    longitudeData.textContent = data.longitude
                    locationData.textContent = data.location
                    forecastData.textContent = data.forcast_data
                }
            })
        })
    }
})