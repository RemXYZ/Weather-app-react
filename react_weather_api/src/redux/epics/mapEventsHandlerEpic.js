import { ofType } from 'redux-observable';
import { useDispatch, useSelector } from 'react-redux';
import { debounceTime, switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { setError } from '../slices/weatherSlice';
import { fetchWeatherForNewCities } from '../actions/weatherActions';

const MAP_MOVED = 'MAP_MOVED';

export const mapEventsHandlerEpic = (action$, state$) => action$.pipe(
    ofType(MAP_MOVED), // Listen for map moved actions
    debounceTime(800), // Wait for 1 second without additional moves
    withLatestFrom(state$),
    switchMap(([action, state]) => {
        const { southWest, northEast } = action.payload;
        console.log(southWest, northEast)
        // useDispatch({
        //     type: "FETCH_WEATHER_FOR_NEW_CITIES",
        //     payload: action.payload
        // });
        return of(fetchWeatherForNewCities({
            southWest,
            northEast
        }));
    }),
    catchError(error => of(setError(error.message)))
);