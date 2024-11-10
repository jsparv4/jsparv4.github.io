function getLatLonFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const lat = parseFloat(urlParams.get('lat'));
    const lon = parseFloat(urlParams.get('lon'));

    console.log("Extracted Latitude:", lat, "Longitude:", lon); // Debug log

    if (isNaN(lat) || isNaN(lon)) {
        console.error('Invalid latitude or longitude in URL');
        document.getElementById('weather-info').textContent = 'Invalid location data.';
        return null;
    }
    
    return { lat, lon };
}

async function fetchWeather(lat, lon) {
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
            document.getElementById('weather-info').textContent = `${currentTemperature}°F`;
        } else {
            document.getElementById('weather-info').textContent = 'Temperature not in Fahrenheit.';
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-info').textContent = 'Failed to load temperature.';
    }
}

// Get latitude and longitude and call fetchWeather
const coordinates = getLatLonFromUrl(); // Renamed variable to 'coordinates'
if (coordinates) {
    fetchWeather(coordinates.lat, coordinates.lon);
}
