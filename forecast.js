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
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();

            if (response.ok) {
                let forecastHTML = `<h2>5-Day Forecast for ${city}</h2>`;
                data.list.forEach(item => {
                    const date = new Date(item.dt * 1000);
                    const temperature = item.main.temp;
                    const description = item.weather[0].description;
                    const icon = item.weather[0].icon;
                    forecastHTML += `
                        <div>
                            <p>${date.toDateString()}</p>
                            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                            <p>Temperature: ${temperature}°C</p>
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
