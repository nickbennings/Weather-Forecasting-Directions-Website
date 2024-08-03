document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forecast-form');
    const cityInput = document.getElementById('forecast-city');
    const forecastResult = document.getElementById('forecast-result');

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
                const dailyForecast = {};
                data.list.forEach(item => {
                    const date = new Date(item.dt * 1000).toDateString();
                    if (!dailyForecast[date]) {
                        dailyForecast[date] = {
                            temperature: item.main.temp,
                            description: item.weather[0].description,
                            icon: item.weather[0].icon
                        };
                    }
                });

                let forecastHTML = `<h2>5-Day Forecast for ${city}</h2>`;
                Object.keys(dailyForecast).forEach(date => {
                    const { temperature, description, icon } = dailyForecast[date];
                    forecastHTML += `
                        <div>
                            <p>${date}</p>
                            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                            <p>Temperature: ${temperature}°F</p>
                            <p>Description: ${description}</p>
                        </div>
                    `;
                });
                forecastResult.innerHTML = forecastHTML;
            } else {
                forecastResult.innerHTML = `<p>Error: ${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching forecast data:', error);
            forecastResult.innerHTML = 'Error: Unable to fetch forecast data';
        }
    });
});
