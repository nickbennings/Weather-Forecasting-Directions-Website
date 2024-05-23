## Weather Forecasting Website

This is a simple weather forecasting website that allows users to input a city name and retrieve the current weather information using the OpenWeatherApp API.

### Features
- Input field to enter a city name
- Display of current temperature and weather condition for the entered city
- Error handling for invalid city names or failed API requests

### Usage
1. Enter the name of a city in the input field.
2. Click the "Get Weather" button to retrieve the current weather information for the entered city.
3. The current temperature and weather condition will be displayed below the input field.

### Setup
1. Clone this repository to your local machine.
2. Create a `.env` file in the root directory of the project and add your OpenWeatherApp API key:
    ```
    API_KEY=your_api_key_here
    ```
3. Ensure `.env` is added to `.gitignore` to prevent it from being pushed to the repository.
4. Install the necessary packages:
    ```bash
    npm install
    ```
5. Start the server:
    ```bash
    node server.js
    ```
6. Open your browser and navigate to `http://localhost:3000` to view the website.

### Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Express
- OpenWeatherApp API

### Credits
This project was created by Nick Bennings.

### License
This project is licensed under the MIT License. See the LICENSE file for details.
