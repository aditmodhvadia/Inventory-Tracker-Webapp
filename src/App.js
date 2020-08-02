import React from 'react';
import { ThemeProvider, Button } from '@material-ui/core';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      </div>
    </ThemeProvider>
  );
}

export default App;
