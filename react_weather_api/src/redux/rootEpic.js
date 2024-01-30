import { combineEpics } from 'redux-observable';
import { fetchCitiesEpic } from './epics/fetchCitiesEpic';
import { fetchWeatherEpic } from './epics/fetchWeatherEpic';
import { fetchWeatherForNewCitiesEpic } from './epics/weatherEpics';
import { reloadWeatherDataEpic } from './epics/reloadWeatherDataEpic';
import { mapEventsHandlerEpic } from './epics/mapEventsHandlerEpic';

export const rootEpic = combineEpics(
  fetchWeatherForNewCitiesEpic,
  reloadWeatherDataEpic,
  mapEventsHandlerEpic
  // Add other epics as needed
);
