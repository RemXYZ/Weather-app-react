// src/redux/reducers/rootReducer.js
import { configureStore,combineReducers } from '@reduxjs/toolkit';
import locationReducer from './locationSlice';
import weatherReducer from './weatherSlice';
import filterReducer from './filterSlice';
import mapReducer from './mapSlice';

const rootSlicer = combineReducers({
  location: locationReducer,
  weather: weatherReducer,
  filters: filterReducer,
  mapBounds: mapReducer
});

export default rootSlicer;
