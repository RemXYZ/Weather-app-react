// src/redux/selectors.js
import { createSelector } from '@reduxjs/toolkit';

export const weatherDataSelector = (state) => state.weather.weatherData;
export const loadingSelector = createSelector(
  (state) => state.weather.loading_box,
  (loading_box) => loading_box
);
