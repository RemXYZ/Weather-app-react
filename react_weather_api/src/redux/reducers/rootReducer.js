// src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
import weatherReducer from './weatherReducer';
import filterReducer from './filterReducer';
import mapBoundsReducer from './mapReducer';

const rootReducer = combineReducers({
  location: locationReducer,
  weather: weatherReducer,
  filters: filterReducer,
  mapBounds: mapBoundsReducer
});

export default rootReducer;
