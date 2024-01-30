// /src/api/overpassApi.js
const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

export const fetchCitiesInBounds = ({ southWest, northEast }) => {
  // Clamp the latitude and longitude values to valid ranges
  const south = Math.max(-90, Math.min(90, southWest.lat));
  const west = Math.max(-180, Math.min(180, southWest.lng));
  const north = Math.max(-90, Math.min(90, northEast.lat));
  const east = Math.max(-180, Math.min(180, northEast.lng));

  const query = `[out:json];node["place"="city"]["population"](${south},${west},${north},${east});out;`;

  return fetch(`${OVERPASS_API_URL}?data=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      // Process and return city data including population
      return data.elements.map(city => ({
        id: city.id,
        name: city.tags.name,
        lat: city.lat,
        lon: city.lon,
        population: city.tags.population ? parseInt(city.tags.population, 10) : undefined
      }));
    })
    .catch(error => console.error(error.message));
};
