import { createTheme } from '@mui/material/styles';
import {
  PRIMARY,
  PRIMARY_HOVER,
  SECONDARY_CYAN,
} from '../constants/adVentureConstants';

export const adVentureTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: PRIMARY, dark: PRIMARY_HOVER },
    secondary: { main: SECONDARY_CYAN },
    background: {
      default: '#020617',
      paper: 'rgba(255, 255, 255, 0.04)',
    },
    error: { main: '#f87171' },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      disabled: '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      fontSize: '1.25rem',
    },
    h3: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      fontSize: '1.125rem',
    },
  },
  shape: { borderRadius: 12 },
});
