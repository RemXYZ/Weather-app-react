// src/redux/reducers/weatherReducer.js
const initialState = {
  weatherData: [],
  error: null,
  loading: false,
  loading_box: false
};
  
  // Helper function to merge new weather data with existing, preventing duplicates
// function mergeWeatherData(existingData, newData) {
//   const newDataById = new Map(newData.map(item => [item.id, item]));
//   existingData.forEach(item => newDataById.set(item.id, item)); // If item exists, it won't be overwritten
//   return Array.from(newDataById.values());
// }

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'FETCH_WEATHER_START_FOR_CITY':
    //   // Mark the specific city as loading
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //     weatherData: state.weatherData.map(city => 
    //       city.id === action.payload ? { ...city, loading: true } : city
    //     ),
    //   };
    // case 'FETCH_WEATHER_END_FOR_CITY':
    //   // Mark the specific city as not loading
    //   return {
    //     ...state,
    //     weatherData: state.weatherData.map(city => 
    //       city.id === action.payload ? { ...city, loading: false } : city
    //     ),
    //   };
    case 'FETCH_WEATHER_START':
      return { ...state, loading_box: true };
    case 'FETCH_WEATHER_END':
      return { ...state, loading_box: false };
    case 'SET_WEATHER_DATA':
      return { ...state, weatherData: action.payload };
    case 'SET_ERROR':
      // Set error and stop loading
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
    }
};
  
  
  export default weatherReducer;
  