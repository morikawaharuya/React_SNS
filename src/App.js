import React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import Navbar from './compornents/Navbar';
import ApiContextProvider from './context/ApiContext'
import Main from './compornents/Main';

const theme = createTheme({
  palette:{
    primary:indigo,
    secondary:{
      main:'#f44336'
    },
  },
  typography:{
    fontFamily:'Comic Neue',
  }
})

function App() {
  return (
    <ApiContextProvider>
      <ThemeProvider theme={theme}>
        <Navbar/>
        <div className="badge">
        <Main/>
        </div>
        
      </ThemeProvider>
    </ApiContextProvider>
    
  );
}

export default App;
