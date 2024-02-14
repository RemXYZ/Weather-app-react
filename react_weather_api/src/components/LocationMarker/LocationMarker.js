import L from 'leaflet';
import locationIconUrl from './src/loc.png';
import { Marker  } from 'react-leaflet';

const locationIcon = L.icon({
  iconUrl: locationIconUrl,
  iconSize: [38, 38], 
  iconAnchor: [19, 38], 
  popupAnchor: [0, -38]
});
export const LocateButton = ({className, userLocation}) => {
    return <Marker position={userLocation} icon={locationIcon}></Marker>
}   
export default LocateButton;