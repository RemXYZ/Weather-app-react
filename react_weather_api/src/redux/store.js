// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import rootSlicer from './slices/rootSlicer'; 

import { rootEpic } from './rootEpic';

// Create the epic middleware
const epicMiddleware = createEpicMiddleware();

// Create the store with the rootReducer and apply the epic middleware
const store = configureStore({
  reducer: rootSlicer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
});

// Run the root epic
epicMiddleware.run(rootEpic);

export default store;

