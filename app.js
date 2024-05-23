document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city');
    const weatherResult = document.getElementById('weather-result');

    // Fetch the API key from the server
    let apiKey;
    fetch('/apikey')
        .then(response => response.json())
        .then(data => {
            apiKey = data.apiKey;
            console.log('API Key:', apiKey);  // Add this line to verify the API key is fetched
        })
        .catch(error => {
            console.error('Error fetching API key:', error);
        });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const city = cityInput.value.trim();

        if (city === '') {
            alert('Please enter a city name');
            return;
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();

            if (response.ok) {
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;

                weatherResult.innerHTML = `
                    <h2>Weather in ${city}</h2>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                    <p>Temperature: ${temperature}°C</p>
                    <p>Description: ${description}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                `;
            } else {
                weatherResult.innerHTML = `<p>Error: ${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherResult.innerHTML = 'Error: Unable to fetch weather data';
        }
    });
});
