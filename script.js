// Get the current year and set it in the span with id 'copyright-year'
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Fetch weather data from Open-Meteo API
function fetchWeather() {
  // Define the location for weather data to be Garden Springs area in Lexington, KY
  const latitude = 38.0370;
  const longitude = -84.5379;
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`;

  // Fetch data from Open-Meteo API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weather = data.current_weather;
      displayWeather(weather);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.getElementById('temperature').textContent = "Unable to retrieve weather data.";
      document.getElementById('condition').textContent = "";
    });
}

// Function to display the weather data on the page
function displayWeather(weather) {
  const temperature = weather.temperature; // Current temperature in Fahrenheit
  const condition = weather.weathercode; // Weather condition code (Open-Meteo returns a code, we'll translate it)

  // Map weather code to a human-readable condition (you can expand this list as needed)
  const conditionMap = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog in the mountains",
    51: "Light rain",
    53: "Moderate rain",
    55: "Heavy rain",
    61: "Showers",
    63: "Heavy showers",
    80: "Thunderstorms",
    95: "Severe thunderstorms",
  };

  // Update the page with the weather information
  document.getElementById('temperature').textContent = `Temperature: ${temperature} °F`;
  document.getElementById('condition').textContent = `Condition: ${conditionMap[condition] || "Unknown"}`;
}

// Call the fetchWeather function when the page loads
window.addEventListener('load', fetchWeather);
