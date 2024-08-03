document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forecast-form');
    const cityInput = document.getElementById('city');
    const forecastResult = document.getElementById('forecast-result');

    // Directly assign the API key
    const apiKey = '897f410d6b0153cbd94dd175f70cd132';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const city = cityInput.value.trim();

        if (city === '') {
            alert('Please enter a city name');
            return;
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`);
            const data = await response.json();

            if (response.ok) {
                // Aggregate the data by day
                const dailyForecast = {};
                data.list.forEach(forecast => {
                    const date = new Date(forecast.dt * 1000).toLocaleDateString();
                    if (!dailyForecast[date]) {
                        dailyForecast[date] = {
                            temp: 0,
                            humidity: 0,
                            windSpeed: 0,
                            count: 0,
                            description: forecast.weather[0].description,
                            icon: forecast.weather[0].icon
                        };
                    }
                    dailyForecast[date].temp += forecast.main.temp;
                    dailyForecast[date].humidity += forecast.main.humidity;
                    dailyForecast[date].windSpeed += forecast.wind.speed;
                    dailyForecast[date].count++;
                });

                // Create HTML for each daily forecast
                const forecastHtml = Object.keys(dailyForecast).map(date => {
                    const day = dailyForecast[date];
                    return `
                        <div class="forecast-item">
                            <h3>${date}</h3>
                            <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="${day.description}">
                            <p>Average Temperature: ${Math.round(day.temp / day.count)}°F</p>
                            <p>Description: ${day.description}</p>
                            <p>Average Humidity: ${Math.round(day.humidity / day.count)}%</p>
                            <p>Average Wind Speed: ${Math.round(day.windSpeed / day.count)} m/s</p>
                        </div>
                    `;
                }).join('');

                forecastResult.innerHTML = `<h2>5-Day Forecast for ${city}</h2>${forecastHtml}`;
            } else {
                forecastResult.innerHTML = `<p>Error: ${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching forecast data:', error);
            forecastResult.innerHTML = 'Error: Unable to fetch forecast data';
        }
    });
});
