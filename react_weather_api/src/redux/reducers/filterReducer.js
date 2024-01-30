// src/redux/reducers/filterReducer.js
const initialState = {
    name: '',
    minPopulation: 0,
  };
  
  const filterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FILTERS':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  
  export default filterReducer;
  