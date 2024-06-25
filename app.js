document.getElementById('searchButton').addEventListener('click', function(){
    const city = document.getElementById('cityInput').value;
    const apiKey ='30aa2b43a8b8201a109c4737fd9f7d20';
    const apiUrl ='https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric';

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