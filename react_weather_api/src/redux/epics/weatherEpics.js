import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { switchMap, map, catchError, filter, withLatestFrom, startWith, endWith  } from 'rxjs/operators';
import { fetchCitiesInBounds } from '../../api/overpassApi';
import { fetchWeatherForCity } from '../../api/weatherApi';
import { fetchWeatherStart, fetchWeatherEnd, setWeatherData, setError } from '../slices/weatherSlice';

// Helper function to merge new weather data with existing, preventing duplicates
function mergeWeatherData(existingData, newData) {
  const newDataById = new Map(newData.map(item => [item.id, item]));
  existingData.forEach(item => newDataById.set(item.id, item)); // If item exists, it won't be overwritten
  return Array.from(newDataById.values());
}

export const fetchWeatherForNewCitiesEpic = (action$, state$) => action$.pipe(
  ofType('FETCH_WEATHER_FOR_NEW_CITIES'),
  withLatestFrom(state$),
  switchMap(([action, state]) => {
    // console.log(action)
    const { weatherData } = state.weather;
    const payload = action.payload || { 
      southWest: { lat: 0, lng: 0 }, 
      northEast: { lat: 0, lng: 0 } 
    };
    // console.log(payload)
    
    return from(fetchCitiesInBounds(payload)).pipe(
      switchMap(cities => {
        const sortedCities = cities
        .sort((a, b) => b.population - a.population)
        .slice(0, 20);
        
        // Only fetch weather for cities that aren't already displayed
        const newCities = sortedCities.filter(city => !weatherData.some(w => w.id === city.id));
        
        return from(Promise.all(newCities.map(city => {
          
          return fetchWeatherForCity(city.lat, city.lon).then(weather => {
            return {
              ...weather,
              cityName: city.name,
              population: city.population,
              id: city.id,
              lat: city.lat,
              lon: city.lon,
            }
          })
        }))).pipe(
          map(newWeatherData => {
            // Merge with existing weather data
            const updatedWeatherData = mergeWeatherData(weatherData, newWeatherData);
            return setWeatherData(updatedWeatherData);
          }),
          // Emit fetchWeatherEnd action whether the stream was successful or had an error
          endWith(fetchWeatherEnd()),
          catchError(error => of(setError(error.message)))
        );
      }),
      // Start the stream by dispatching fetchWeatherStart
      startWith(fetchWeatherStart())
    );
  })
);

