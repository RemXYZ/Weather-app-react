import { ofType } from 'redux-observable';
import { debounceTime, switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { fetchWeatherForNewCities, setError } from '../actions/weatherActions';

const MAP_MOVED = 'MAP_MOVED';

export const mapEventsHandlerEpic = (action$, state$) => action$.pipe(
    ofType(MAP_MOVED), // Listen for map moved actions
    debounceTime(800), // Wait for 1 second without additional moves
    withLatestFrom(state$),
    switchMap(([action, state]) => {
        const { southWest, northEast } = action.payload;
        
        return of(fetchWeatherForNewCities({
            southWest,
            northEast
        }));
    }),
    catchError(error => of(setError(error.message)))
);