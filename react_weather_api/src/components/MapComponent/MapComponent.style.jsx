import styled from 'styled-components';
import { LocateButton } from '../LocateButton/LocateButton';
import { MapContainer } from 'react-leaflet';
import FilterPanel from '../FilterPanel/FilterPanel';
// Your styled components here
export const MapContainerStyle = styled(MapContainer)`
position: relative;
height: 80%; 
border-radius: 20px;
margin: 30px;
`;


export const LocateButtonStyle = styled(LocateButton)`
  position: absolute;
  top: 10px; 
  right: 10px;
  z-index: 1000;
  padding: 10px 20px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #f8f8f8;
    color: #333;
  }

  &:focus {
    outline: none;
    border-color: #665;
  }
`;




export const FilterPanelContainerStyle = styled(FilterPanel)`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  padding: 10px;
  box-sizing: border-box;
`;