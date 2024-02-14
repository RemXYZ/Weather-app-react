import styled from 'styled-components';
import { Marker, Popup, Tooltip } from 'react-leaflet';
// Stylowane komponenty

export const WeatherPopup = styled.div`
  font-family: Arial, sans-serif; 
  text-align: center;
`;

export const PopupHeading = styled.h3`
  margin: 0.5em 0;
`;

export const PopupImage = styled.img`
  width: 40px; 
  height: 40px;
`;

export const PopupParagraph = styled.p`
  margin: 0.5em 0;
`;