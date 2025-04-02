"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3E70A1',
      light: '#D8E2EC',  
      dark: '#122130',  
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#501794',
      light: '#7C3BBD', 
      dark: '#3B0E6D', 
      contrastText: '#FFFFFF'
    },
  },
});

export default theme;