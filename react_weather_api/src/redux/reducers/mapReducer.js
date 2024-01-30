const initialState = {
    southWest: { lat: 0, lng: 0 },
    northEast: { lat: 0, lng: 0 },
  };

const mapBoundsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_MAP_BOUNDS':
        return action.payload;
      default:
        return state;
    }
  };


export default mapBoundsReducer;