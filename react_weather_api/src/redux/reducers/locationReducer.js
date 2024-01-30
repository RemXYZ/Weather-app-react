// src/redux/reducers/locationReducer.js
const initialState = {
    userLocation: [51.505, -0.09], // Default location
  };
  
  const locationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_LOCATION':
        return { ...state, userLocation: action.payload };
      default:
        return state;
    }
  };
  
  export default locationReducer;
  