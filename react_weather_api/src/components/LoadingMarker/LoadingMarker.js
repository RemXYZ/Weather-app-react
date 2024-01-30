import React from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';

// Import the CSS file
import './LoadingMarker.css';

const LoadingMarker = ({ position }) => {
  const icon = L.divIcon({
    className: 'loading-marker', // Refer to the CSS class
    iconSize: [20, 20] // Size of the icon
  });

  return <Marker position={position} icon={icon} />;
};

export default LoadingMarker;
