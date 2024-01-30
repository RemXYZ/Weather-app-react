
const WEATHER_API_URL = "https://api.weatherapi.com/v1/current.json";
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeatherForCity = (lat, lon) => {
    // Construct the URL with the latitude and longitude
    const url = `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${lat},${lon}&aqi=no`;
    // console.log(process.env)
    // console.log(url)
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            // Check if the response contains the current weather data
            if (data && data.current) {
                // console.log(data.current)
                return {
                    temperature: data.current.temp_c, // Temperature in Celsius
                    condition: data.current.condition.text, // Weather condition text
                    icon: data.current.condition.icon, // Icon URL
                    pressure: data.current.pressure_mb // Pressure in millibars
                };
            } else {
                throw new Error('Unexpected weather data structure');
            }
        })
        .catch(error => {
            // Handle errors here
            console.error(error);
        });
};
