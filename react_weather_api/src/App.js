import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './themes/lightTheme';
import { darkTheme } from './themes/darkTheme';
import { GlobalStyles } from './themes/GlobalStyles';
import { AppStyle, MapComponentStyle, RightSidebarStyle, ChartsPanelStyle, ToggleThemeBtn } from './App.style.js';


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
    <AppStyle>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <MapComponentStyle />
        <RightSidebarStyle>
          <ToggleThemeBtn onClick={toggleTheme}>Toggle Theme</ToggleThemeBtn>
          <ChartsPanelStyle/>
        </RightSidebarStyle>
      </ThemeProvider>
      
    </AppStyle>
  );
}

export default App;
