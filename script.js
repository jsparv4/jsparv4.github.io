// Fetch weather data from the API
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Get the temperature and weather code for the current hour
    const temperature = Math.round(data.hourly.temperature_2m[0]); // Round the temperature
    const weatherCode = data.hourly.weather_code[0];

    // Map the weather code to a description
    const weatherDescription = getWeatherDescription(weatherCode);

    // Display the temperature and description
    weatherInfoElement.textContent = `Current Weather in Lexington, KY: ${temperature}°F, ${weatherDescription}`;
  })
  .catch((error) => {
    // Show an error message if the fetch fails
    weatherInfoElement.textContent = "Unable to load weather data.";
    console.error("Error fetching weather data:", error);
  });
