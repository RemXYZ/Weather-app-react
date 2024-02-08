import { combineEpics } from 'redux-observable';
import { fetchWeatherForNewCitiesEpic } from './epics/weatherEpics';
import { reloadWeatherDataEpic } from './epics/reloadWeatherDataEpic';
import { mapEventsHandlerEpic } from './epics/mapEventsHandlerEpic';

export const rootEpic = combineEpics(
  fetchWeatherForNewCitiesEpic,
  reloadWeatherDataEpic,
  mapEventsHandlerEpic
  // other eppics
);
