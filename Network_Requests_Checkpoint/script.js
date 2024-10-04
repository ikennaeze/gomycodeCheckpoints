const getWeather = () => {
    const apiKey = `818211910a94f30525fb69a0f5a5ce73`
    const locationInput = document.getElementById('location-input')

    if(!locationInput.value){
        document.getElementById('error-msg').innerHTML = 'Please enter a city'
        return;
    }

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${apiKey}`
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${locationInput.value}&appid=${apiKey}`

    fetch(currentWeatherURL)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => {
        console.error('Error finding the weather:', error)
        document.getElementById('error-msg').style.display = 'block'
        document.getElementById('error-msg').innerHTML = 'This has been an error fetching the weather data for this location. Please try again. '
    })

    fetch(forecastURL)
    .then(response => response.json())
    .then(data => displayHourlyForecast(data.list))
    .catch(error => {
        console.error('Error finding the hourly forecast:', error)
        document.getElementById('error-msg').innerHTML = 'This has been an error fetching the hourly forecast for this location. Please try again. '
    })
}

const displayWeather = (data) => {
    
    const tempContainer = document.getElementById('temp-container')
    const weatherInfo = document.getElementById('weather-info')
    const weatherIcon = document.getElementById('weather-icon')
    const hourlyForecast = document.getElementById('hourly-forecast')

    //clear previous content
    tempContainer.innerHTML = ''
    weatherInfo.innerHTML = ''
    hourlyForecast.innerHTML = ''

    if(data.cod == '404') {
        weatherInfo.innerHTML = `<p>${data.message}</p>`
    }else{

        const cityName = data.name
        const temperature = Math.round(data.main.temp - 273.15)
        const description = data.weather[0].description
        const iconCode = data.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`

        const temperatureHTML = `<p class="text-[36pt]">${temperature}°C</p>`
        const weatherHTML = `
            <p class="text-[20pt] text-center">${cityName}</p>
            <p>${description}</p>
            `
        tempContainer.innerHTML = temperatureHTML
        weatherInfo.innerHTML = weatherHTML
        weatherIcon.src = iconUrl
        weatherIcon.alt = description

        showImage()
    }
}

const displayHourlyForecast = (hourlyData) => {
    const hourlyForecast = document.getElementById('hourly-forecast')
    const next24Hours = hourlyData.slice(0, 8)

    next24Hours.forEach(item => {

        const dateTime = new Date(item.dt * 1000)
        const hour = dateTime.getHours()
        const temperature = Math.round(item.main.temp - 273.15)
        const iconCode = item.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`

        const hourlyItemHTML = `
        <div class="flex flex-col flex-grow-0 flex-shrink-0 flex-auto items-center w-20 mr-6">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon"
            <span>${temperature}°C</span>
        </div>
        `
        hourlyForecast.innerHTML += hourlyItemHTML
    })
}

const showImage = () => {
    const weatherIcon = document.getElementById('weather-icon')
    weatherIcon.style.display = 'block'
}

let searchBtn = document.getElementById('search-button')
searchBtn.addEventListener('click', getWeather)