import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import theme from '@/styles/theme';

export default function HeaderBar() {

  // Styles.
  const contentStyles = {
    color: theme.palette.primary.main,
    flexGrow: 1 
  };

  return (
    <Box sx={contentStyles}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
            Pokémon
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}