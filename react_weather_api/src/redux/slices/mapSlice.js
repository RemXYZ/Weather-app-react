// src/redux/slices/mapSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  southWest: { lat: 0, lng: 0 },
  northEast: { lat: 0, lng: 0 },
};

export const mapSlice = createSlice({
  name: 'mapBounds',
  initialState,
  reducers: {
    setMapBounds: (state, action) => {
      state.southWest = action.payload.southWest;
      state.northEast = action.payload.northEast;
    },
  },
});

// Actions
export const { setMapBounds } = mapSlice.actions;

// Reducer
export default mapSlice.reducer;
