// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    setYear();
    initializeWeather();
});

// Function to set the current year in the footer
function setYear() {
    document.getElementById("year").textContent = new Date().getFullYear();
}

// Function to initialize fetching and displaying weather
function initializeWeather() {
    const lat = 38.0395; // Your latitude
    const lon = -84.546; // Your longitude
    fetchWeather(lat, lon).then(displayWeather).catch(handleWeatherError);
}

// Function to fetch weather data from NWS API
async function fetchWeather(lat, lon) {
    const pointResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
    const pointData = await pointResponse.json();
    const forecastUrl = pointData.properties.forecast;

    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    // Return the current weather (first period)
    return forecastData.properties.periods[0];
}

// Function to display weather in the footer
function displayWeather(currentWeather) {
    document.getElementById('weather').textContent =
        `Weather: ${currentWeather.temperature}°${currentWeather.temperatureUnit}, ${currentWeather.shortForecast}`;
}

// Function to handle errors
function handleWeatherError(error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('weather').textContent = 'Failed to load weather data.';
}
