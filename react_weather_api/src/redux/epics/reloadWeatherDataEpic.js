import { ofType } from 'redux-observable';
import { interval, of, from } from 'rxjs';
import { switchMap, withLatestFrom, takeUntil, catchError, map } from 'rxjs/operators';
import { fetchWeatherForCity } from '../../api/weatherApi';
import { setWeatherData, setError } from '../actions/weatherActions';

const RELOAD_INTERVAL = 3600*1000; // 1 hour in milliseconds

export const reloadWeatherDataEpic = (action$, state$) => action$.pipe(
  ofType('MAP_LOADED'),
  switchMap(() => interval(RELOAD_INTERVAL).pipe(
    withLatestFrom(state$),
    switchMap(([, state]) => {
      console.log('reloading', state.weather.weatherData);

      // Extract the latest map bounds from your weatherData state
      // Assuming each city in weatherData contains its lat and lng
      const cities = state.weather.weatherData;
      if (cities.length === 0) {
        return of(); // No cities to update
      }

      return from(Promise.all(cities.map(city => {
        return fetchWeatherForCity(city.lat, city.lon).then(weather => ({
          ...weather,
          cityName: city.cityName,
          population: city.population,
          id: city.id,
          lat: city.lat,
          lon: city.lon,
        }))
      }))).pipe(
        map(existedWeatherData => {
          console.log('reloading2', existedWeatherData);
          return setWeatherData(existedWeatherData);
        }),
        catchError(error => of(setError(error.message)))
      );
    }),
  )),
  takeUntil(action$.pipe(ofType('STOP_RELOADING')))
);
