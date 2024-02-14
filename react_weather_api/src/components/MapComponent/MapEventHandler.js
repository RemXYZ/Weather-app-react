import { MapContainer, TileLayer, useMapEvents, useMap  } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { setMapBounds } from '../../redux/slices/mapSlice';

export const MapEventsHandler = () => {
const dispatch = useDispatch();
const map = useMapEvents({
    moveend: () => {
        const bounds = map.getBounds();
        const payload =  {
            southWest: { lat: bounds.getSouthWest().lat, lng: bounds.getSouthWest().lng },
            northEast: { lat: bounds.getNorthEast().lat, lng: bounds.getNorthEast().lng },
        }
        // console.log(payload)
        dispatch({
            type: "MAP_MOVED",
            payload: payload
        });
        // console.log(payload)
        dispatch(setMapBounds(payload))
    },
});

return null;
};