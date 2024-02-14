import { MapContainer, TileLayer, useMapEvents, useMap  } from 'react-leaflet';


export const LocateButton = ({className}) => {
    const map = useMap(); // Hook to access the map instance
  
    const handleLocate = () => {
      map.locate().on("locationfound", (e) => {
        map.flyTo(e.latlng, map.getZoom());
      });
      // .on("locationerror", (e) => {
      //   console.log(e);
      //   alert("Could not find your location");
      // });
    };
  
    return <button className={className} onClick={handleLocate}>Locate Me</button>;
  };