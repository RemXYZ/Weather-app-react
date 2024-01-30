import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FETCH_CITIES, setCities, setError as setCitiesError } from '../actions/cityActions';

const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

export const fetchCitiesEpic = action$ => action$.pipe(
  ofType(FETCH_CITIES),
  switchMap(action => {
    const { southWest, northEast } = action.payload;
    const query = `[out:json];node["place"="city"]["population"](south,west,north,east);out;`;
    const fullQuery = query
      .replace("south", southWest.lat)
      .replace("west", southWest.lng)
      .replace("north", northEast.lat)
      .replace("east", northEast.lng);

    return from(fetch(`${OVERPASS_API_URL}?data=${encodeURIComponent(fullQuery)}`)).pipe(
      switchMap(response => response.json()),
      map(data => setCities(data.elements.map(city => ({
        id: city.id,
        name: city.tags.name,
        lat: city.lat,
        lon: city.lon,
        population: city.tags.population ? parseInt(city.tags.population, 10) : undefined
      })))),
      catchError(error => of(setCitiesError(error.message)))
    );
  })
);
