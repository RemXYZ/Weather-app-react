import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';
import { LocateButtonStyle, MapBoxStyle, FilterPanelContainer, LoadingScreenContainer } from './MapComponentStyle';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import WeatherMarker from '../WeatherMarker/WeatherMarker';
import FilterPanel from '../FilterPanel/FilterPanel';
import { setUserLocation } from '../../redux/slices/locationSlice';
import { setFilters } from '../../redux/slices/filterSlice'; 
import { setMapBounds } from '../../redux/slices/mapSlice';


import LoadingScreen from '../LoadingScreen/LoadingScreen';
import LoadingMarker from '../LoadingMarker/LoadingMarker';


const LocateButton = () => {
  const map = useMap(); // Hook to access the map instance

  const handleLocate = () => {
    map.locate().on("locationfound", (e) => {
      map.flyTo(e.latlng, map.getZoom());
    });
  };

  return <button className="locate-button" onClick={handleLocate}>Locate Me</button>;
};

const MapEventsHandler = () => {
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

const MapComponent = () => {
  const dispatch = useDispatch();
  const userLocation = useSelector(state => state.location.userLocation);
  const weatherData = useSelector(state => state.weather.weatherData);
  const filters = useSelector(state => state.filters);
  const mapBounds = useSelector(state => state.mapBounds);
  
  // console.log(mapBounds)
  const sortedWeatherData = weatherData
  .filter(city => {
    // Check if city is within current map bounds
    return city.lat >= mapBounds.southWest.lat && city.lat <= mapBounds.northEast.lat
        && city.lon >= mapBounds.southWest.lng && city.lon <= mapBounds.northEast.lng;
  })
  .sort((a, b) => b.population - a.population)
  .slice(0, 20);
  

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        dispatch(setUserLocation([latitude, longitude]));
        // console.log(latitude, longitude)
        const payload = {
          southWest: { lat: latitude - 0.05, lng: longitude - 0.05 },
          northEast: { lat: latitude + 0.05, lng: longitude + 0.05 },
        };
        // dispatch({ type: 'FETCH_WEATHER_FOR_NEW_CITIES', payload });
        dispatch({
          type: "MAP_MOVED",
          payload: payload
        });
        dispatch(setMapBounds(payload))
      },
      () => {
        const payload1 = {
          southWest: { lat: userLocation[0] - 0.05, lng: userLocation[1] - 0.05 },
          northEast: { lat: userLocation[0] + 0.05, lng: userLocation[1] + 0.05 },
        };
        dispatch({
          type: "MAP_MOVED",
          payload: payload1
        });
        dispatch(setMapBounds(payload1))
        console.error("Unable to retrieve your location");
      }
    );
  }, [dispatch]); 



  const isLoading = useSelector(state => state.weather.loading_box); // Get loading state
  // console.log(sortedWeatherData)
  const divStyle = {
    height: '30px' // Set the width to 100 pixels
  };
  return (
    <div className="map-container">
      <FilterPanel onFilterChange={newValue => dispatch(setFilters(newValue))} className="filter-panel"/>
      <div style={divStyle}>
        {isLoading && <LoadingScreen className="loading-screen"/>} {/* Render loading screen if loading state is true */}
      </div>
      
      <MapContainer center={userLocation} key={userLocation.toString()} zoom={13} className='map-box'>
        <LocateButton/>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEventsHandler weatherData={weatherData} />
        {sortedWeatherData
        .filter(city => city.population >= filters.minPopulation)
        .filter(city => city.cityName && city.cityName.toLowerCase().includes(filters.name ? filters.name.toLowerCase() : ''))
        .map(city => {
          return city.loading
            ? <LoadingMarker key={city.id} position={[city.lat, city.lon]} />
            : <WeatherMarker key={city.id} position={[city.lat, city.lon]} weather={city} />;
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
