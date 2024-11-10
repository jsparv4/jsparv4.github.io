async function fetchWeather() {
    // Hard-coded latitude and longitude for Lexington, KY
    const lat = 38.0396;
    const lon = -84.546;

    try {
        console.log("Fetching point data...");
        const pointResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
        console.log("Point response status:", pointResponse.status);

        if (!pointResponse.ok) {
            throw new Error(`Failed to fetch point data: ${pointResponse.status}`);
        }
        const pointData = await pointResponse.json();
        console.log("Point data:", pointData);

        if (!pointData.properties || !pointData.properties.forecast) {
            throw new Error('Forecast URL not found in point data');
        }

        console.log("Fetching forecast data...");
        const forecastUrl = pointData.properties.forecast;
        const forecastResponse = await fetch(forecastUrl);
        console.log("Forecast response status:", forecastResponse.status);

        if (!forecastResponse.ok) {
            throw new Error(`Failed to fetch forecast data: ${forecastResponse.status}`);
        }
        const forecastData = await forecastResponse.json();
        console.log("Forecast data:", forecastData);

        if (!forecastData.properties || !forecastData.properties.periods || !forecastData.properties.periods[0]) {
            throw new Error('Unexpected forecast data structure');
        }

        const currentTemperature = forecastData.properties.periods[0].temperature;
        const temperatureUnit = forecastData.properties.periods[0].temperatureUnit;

        if (temperatureUnit === 'F') {
            document.getElementById('weather-info').textContent = `LEX: ${currentTemperature}°F`;
        } else {
            document.getElementById('weather-info').textContent = 'Temperature not in Fahrenheit.';
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-info').textContent = 'Failed to load temperature.';
    }
}

// Call the function to display Lexington weather
fetchWeather();
