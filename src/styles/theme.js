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
      color: 'white'
    },
    h6: {
      fontSize: 12,
      fontWeight: 700,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: '#ccc',
      dark: '#4f5254',
      light: '#E6E6E6',
    },
    gray: {
      main: '#ccc',
      dark: '#4f5254',
      light: '#E6E6E6',
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
    blue: {
      main: '#003865',
      dark: '#0d2134',
      light: '#d9e4ed',
    },
  },
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff", // Fondo del paginador
          padding: "10px",
          borderRadius: "10px",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "white", // Color del texto
          backgroundColor: "#ccc", // Color de los botones
          "&:hover": {
            backgroundColor: "#d9e4ed",
          },
          "&.Mui-selected": {
            backgroundColor: "#003865",
            color: "white",
            fontWeight: "bold",
          },
        },
      },
    },
  },
});

export default theme;