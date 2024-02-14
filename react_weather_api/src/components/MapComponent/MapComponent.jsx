import React, { useEffect } from 'react';
import { TileLayer  } from 'react-leaflet';

import { useDispatch, useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';
import { LocateButtonStyle, MapContainerStyle, FilterPanelContainerStyle, LoadingScreenContainer } from './MapComponent.style';
import styled from 'styled-components';

import WeatherMarker from '../WeatherMarker/WeatherMarker';

import { setUserLocation } from '../../redux/slices/locationSlice';
import { setFilters } from '../../redux/slices/filterSlice'; 
import { setMapBounds } from '../../redux/slices/mapSlice';


import LoadingScreen from '../LoadingScreen/LoadingScreen';
import LoadingMarker from '../LoadingMarker/LoadingMarker';
import LocationMarker from '../LocationMarker/LocationMarker';

import { MapEventsHandler } from './MapEventHandler';



const MapComponent = ({className}) => {
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
    if (sortedWeatherData.some(city => city === undefined)) {
      alert("Proszę wpisać API klucz");
    }
  }, [weatherData]); // Efekt będzie uruchomiony za każdym razem, gdy weatherData się zmieni


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
    <div className={className}>
      <FilterPanelContainerStyle onFilterChange={newValue => dispatch(setFilters(newValue))} className="filter-panel"/>
      <div style={divStyle}>
        {isLoading && <LoadingScreen className="loading-screen"/>} {/* Render loading screen if loading state is true */}
      </div>
      
      <MapContainerStyle center={userLocation} key={userLocation.toString()} zoom={13} className='map-box'>
        <LocateButtonStyle/>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEventsHandler weatherData={weatherData} />
        {sortedWeatherData
        .filter(city => city.population >= filters.minPopulation)
        .filter(city => {
          return city.cityName && city.cityName.toLowerCase().includes(filters.name ? filters.name.toLowerCase() : '')
        })
        .map(city => {
          return city.loading
            ? <LoadingMarker key={city.id} position={[city.lat, city.lon]} />
            : <WeatherMarker key={city.id} position={[city.lat, city.lon]} weather={city} />;
        })}
        <LocationMarker userLocation={userLocation}></LocationMarker>
      </MapContainerStyle>
    </div>
  );
};

export default MapComponent;
