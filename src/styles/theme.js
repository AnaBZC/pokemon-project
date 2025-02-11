import { createTheme } from "@mui/material";
import { dark } from "@mui/material/styles/createPalette";


const theme = createTheme({
  typography: {
    fontFamily: '"Albert Sans", sans-serif',
    h1: {
      fontSize: 32,
      fontWeight: 700,
    },
    h2: {
      fontSize: 24,
      fontWeight: 700,
    },
    h3: {
      fontSize: 18,
      fontWeight: 700,
    },
    h4: {
      fontSize: 16,
      fontWeight: 700,
    },
    h5: {
      fontSize: 14,
      fontWeight: 700,
    },
    h6: {
      fontSize: 12,
      fontWeight: 700,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: '#ccc',
      dark: '#4f5254',
      light: '#f2f2f2',
    },
    warning: {
      main: '#ffc67e',
      light: '#fff289',
    },
    success: {
      main: '#a3f4b5',
      dark: '#97f089',
      light: '#d7ffd1',
    },
    error: {
      main: '#ffb9b9',
      light: '#d6cfff',
    },
  }
});

export default theme;