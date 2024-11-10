async function fetchWeather(lat, lon) {
    try {
        const pointResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
        const pointData = await pointResponse.json();

        // Verify if forecast URL exists in the point data
        if (!pointData.properties || !pointData.properties.forecast) {
            throw new Error('Forecast URL not found in point data');
        }

        const forecastUrl = pointData.properties.forecast;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // Ensure forecast data structure matches your expectations
        if (!forecastData.properties || !forecastData.properties.periods || !forecastData.properties.periods[0]) {
            throw new Error('Unexpected forecast data structure');
        }

        const currentWeather = forecastData.properties.periods[0];
        document.getElementById('weather-info').textContent =
            `Weather: ${currentWeather.temperature}°${currentWeather.temperatureUnit}, ${currentWeather.shortForecast}`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-info').textContent = 'Failed to load weather data.';
    }
}
