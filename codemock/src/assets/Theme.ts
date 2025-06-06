"use client";

import { createTheme } from "@mui/material";
declare module '@mui/material/styles' {
  interface Palette {
    primary_darker: Palette['primary'];
  }
  interface PaletteOptions {
    primary_darker?: PaletteOptions['primary'];
  }
}

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
    primary_darker: {
      main: '#315980',
      light: '#2B4E70',
      dark: '#254360',
    },
  },
  typography: {
    fontFamily: 'var(--font-noto-sans)',
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-noto-sans), "Noto Sans"',
        },
        label: {
          fontFamily: 'var(--font-noto-sans), "Noto Sans"',
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--font-noto-sans), "Noto Sans"',
        },
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      }
    },
  }
});

export default theme;