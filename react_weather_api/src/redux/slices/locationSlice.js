// src/redux/slices/locationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userLocation: [51.505, -0.09],
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
  },
});

// Actions
export const { setUserLocation } = locationSlice.actions;

// Reducer
export default locationSlice.reducer;
