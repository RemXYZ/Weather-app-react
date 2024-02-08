// src/redux/slices/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  minPopulation: 0,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

// Actions
export const { setFilters } = filterSlice.actions;

// Reducer
export default filterSlice.reducer;
