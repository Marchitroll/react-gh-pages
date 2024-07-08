import { createTheme } from "@mui/material/styles";
export const temaClaro = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000"
    },
    secondary: {
      main: "#ffffff"
    },
    error: {
      main: "#ff7b00"
    },
    warning: {
      main: "#e00707"
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff",
    },
    action: {
      disabledBackground: '#424242',
      disabled: '#fafafa'
    },
  }
});

export const temaOscuro = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#000000',
    },
    error: {
      main: "#ff7b00"
    },
    warning: {
      main: "#e00707"
    },
    background: {
      default: '#1D1F20',
    },
    text: {
      primary: "#ffffff",
      secondary: "#000000",
    },
    action: {
      disabledBackground: '#424242',
      disabled: '#fafafa'
    }
  }
});