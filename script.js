async function fetchWeather(lat, lon) {
    try {
        const pointResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
        if (!pointResponse.ok) {
            throw new Error(`Failed to fetch point data: ${pointResponse.status}`);
        }
        const pointData = await pointResponse.json();

        if (!pointData.properties || !pointData.properties.forecast) {
            throw new Error('Forecast URL not found in point data');
        }

        const forecastUrl = pointData.properties.forecast;
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error(`Failed to fetch forecast data: ${forecastResponse.status}`);
        }
        const forecastData = await forecastResponse.json();

        if (!forecastData.properties || !forecastData.properties.periods || !forecastData.properties.periods[0]) {
            throw new Error('Unexpected forecast data structure');
        }

        const currentWeather = forecastData.properties.periods[0];
        const weatherElement = document.getElementById('weather-info');
        if (weatherElement) {
            weatherElement.textContent =
                `Weather: ${currentWeather.temperature}°${currentWeather.temperatureUnit}, ${currentWeather.shortForecast}`;
        } else {
            console.error('Weather info element not found in the document.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const weatherElement = document.getElementById('weather-info');
        if (weatherElement) {
            weatherElement.textContent = 'Failed to load weather data.';
        }
    }
}
