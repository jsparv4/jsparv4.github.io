// Select the weather information element
const weatherInfoElement = document.getElementById("weather-info");

// Open-Meteo API URL with correct endpoint
const apiUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=37.9887&longitude=-84.4777&hourly=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=1";

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
    const currentHour = new Date().getHours();
    const temperature = Math.round(data.hourly.temperature_2m[currentHour]);
    const weatherCode = data.hourly.weather_code[currentHour];

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

// Function to convert weather codes into descriptions
function getWeatherDescription(code) {
  const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Cloudy",
    45: "Foggy",
    48: "Rime fog",
    51: "Drizzle",
    53: "Light rain",
    55: "Moderate rain",
    56: "Freezing drizzle",
    57: "Freezing rain",
    61: "Light rain showers",
    63: "Moderate rain showers",
    65: "Heavy rain showers",
    66: "Freezing rain showers",
    67: "Heavy freezing rain showers",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",
    85: "Light snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with light hail",
    99: "Thunderstorm with heavy hail",
  };
  return weatherDescriptions[code] || "Unknown weather condition";
}
