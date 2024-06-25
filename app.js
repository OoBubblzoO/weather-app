document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '30aa2b43a8b8201a109c4737fd9f7d20';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherDisplay = document.getElementById('weatherDisplay');
            if (data.cod === 200) {
                weatherDisplay.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
            } else {
                weatherDisplay.innerHTML = `<p> City not found</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});

document.getElementById('searchZipButton').addEventListener('click', function(){
    const zip = document.getElementById('zipcodeInput').value;
    const country = document.getElementById('countryInput').value;
    const apiKey = '30aa2b43a8b8201a109c4737fd9f7d20';

    //Geocoding API to get longitude and latitude

    const geoUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${apiKey}`;

    fetch(geoUrl)
        .then(response => response.json())
        .then(locationData => {
            if  (!locationData || !locationData.lat || !locationData.lon){
                throw new Error('Location not found');
            }
            const { lat, lon } = locationData;

            // 5 day forecast data
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

            return fetch(forecastUrl);
        })
        .then(response => response.json())
        .then(forecastData => {
            const forecastDisplay = document.getElementById('weatherDisplay');
            forecastDisplay.innerHTML = '<h2>5-Day Forecast</h2>';

            for (let i = 0; i < forecastData.list.length; i+=8) { // Get forecast every 24 hours
                const forecast = forecastData.list[i];
                const date = new Date(forecast.dt *1000).toLocaleDateString();
                forecastDisplay.innerHTML += `
                    <div>
                        <h3>${date}</h3>
                        <p>Temperature: ${forecast.main.temp}°F</p>
                        <p>Weather: ${forecast.weather[0].description}</p>
                        <p>Humidity: ${forecast.main.humidity}%</p>
                        <p>Wind Speed: ${forecast.wind.speed} mph</p>
                    </div>
                `; 
            } 
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
})