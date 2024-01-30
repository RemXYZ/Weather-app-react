import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './themes/lightTheme';
import { darkTheme } from './themes/darkTheme';
import { GlobalStyles } from './themes/GlobalStyles';
import './App.css';

import MapComponent from './components/MapComponent/MapComponent';
import ChartsPanel from './components/ChartsPanel/ChartsPanel';

function App() {
  const [theme, setTheme] = useState('light');

  

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className='app-style'>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <div className='right-sidebar'>
          <button onClick={toggleTheme} className='toggle-theme-btn'>Toggle Theme</button>
          <ChartsPanel className="charts-panel"/>
        </div>
        <MapComponent />
      </ThemeProvider>
      
    </div>
  );
}

export default App;
