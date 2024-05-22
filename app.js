document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city');
    const weatherResult = document.getElementById('weather-result');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const city = cityInput.value.trim();

        if (city === '') {
            showAlert('Please enter a city name', 'danger');
            return;
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
            const data = await response.json();

            if (response.ok) {
                const temperature = Math.round(data.main.temp - 273.15);
                const description = data.weather[0].description;
                showWeather(`${temperature}°C, ${description}`);
            } else {
                showError('Error: Unable to fetch weather data');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            showError('Error: Unable to fetch weather data');
        }
    });

    function showWeather(weatherInfo) {
        weatherResult.innerHTML = `
            <div class="alert alert-success" role="alert">
                ${weatherInfo}
            </div>
        `;
    }

    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.textContent = message;

        weatherResult.innerHTML = '';
        weatherResult.appendChild(alertDiv);
    }

    function showError(errorMessage) {
        showAlert(errorMessage, 'danger');
    }
});
