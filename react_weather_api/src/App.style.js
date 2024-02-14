/* App.css */
import MapComponent from './components/MapComponent/MapComponent';
import ChartsPanel from './components/ChartsPanel/ChartsPanel';
import styled from 'styled-components';


const maxMediaWidth = 1040;
export const AppStyle = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr; 
  grid-template-areas: "map charts"; 
  height: 100vh;

  @media (max-width: ${maxMediaWidth}px) {
    grid-template-columns: 1fr; 
    grid-template-areas:
      "map"
      "charts";
  }
`;

export const MapComponentStyle = styled(MapComponent)`
  grid-area: map; 
  height: calc(100vh - 50px); 
  padding: 30px;
`;

export const RightSidebarStyle = styled.div`
  grid-area: charts; 
  @media (max-width: ${maxMediaWidth}px) {
    height: 500px;
  }
`;

export const ChartsPanelStyle = styled(ChartsPanel)`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

/* Toggle Theme button styles */
export const ToggleThemeBtn = styled.button`
  position: relative;
  margin-top: 20px;
  margin-bottom: 30px;
  left: 50%; 
  transform: translateX(-50%);
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #5c6bc0; 
  border: none;
  border-radius: 20px; 
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  z-index: 100; 
  transition: background-color 0.3s, box-shadow 0.3s;
  &:hover {
    background-color: #3949ab; 
    box-shadow: 0 6px 8px rgba(0,0,0,0.3); 
  }
  @media (max-width: ${maxMediaWidth}px) {
    top: auto;
    bottom: 20px; 
    left: 50%;
    transform: none;
  }
`;



