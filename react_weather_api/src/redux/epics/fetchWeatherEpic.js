import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FETCH_WEATHER, setWeather, setError as setWeatherError } from '../slices/weatherSlice';

const WEATHER_API_URL = "https://api.weatherapi.com/v1/current.json";
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchWeatherEpic = action$ => action$.pipe(
  ofType(FETCH_WEATHER),
  switchMap(action => {
    const { lat, lon } = action.payload;
    const url = `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${lat},${lon}&aqi=no`;

    return from(fetch(url)).pipe(
      switchMap(response => response.json()),
      map(data => {
        if (data && data.current) {
          return setWeather({
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon,
          });
        }
        throw new Error('Unexpected weather data structure');
      }),
      catchError(error => of(setWeatherError(error.message)))
    );
  })
);
