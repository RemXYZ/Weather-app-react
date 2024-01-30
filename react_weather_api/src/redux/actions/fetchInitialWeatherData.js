// Action to initiate fetching of initial weather data
export const fetchInitialWeatherData = () => async (dispatch) => {
  try {
    // Perform your data fetching logic here
    const initialData = await someApiCallToFetchWeatherData();
    dispatch(setWeatherData(initialData)); 
  } catch (error) {
    console.error('Error fetching initial weather data:', error);
    // Handle error, maybe dispatch an error action
  }
};
