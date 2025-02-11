import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Container, Grid2 as Grid, useTheme, CardActionArea, Link } from "@mui/material";

// Llamada al API
import { fetchPokemons } from "../../api/api";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      const data = await fetchPokemons();
      console.log("data traia", data)
      setPokemons(data);
    };

    getPokemons();
  }, []);

  const theme = useTheme();

  // Styles.
  const contentStyles = {
    marginTop: 4,
  };

  const cardStyle = {
    minWidth: '200px',
    //backgroundColor: theme.palette.error.main,
    padding: 2,
    textAlign: "center"
  }

  const titleStyle = {
    marginBottom: 4,
  }

  const listContainerStyle = {
    justifyContent: 'space-between',
  }

  return (
    <Container sx={contentStyles}>
      <Typography variant="h3" align="center" sx={titleStyle}>
        Pokémon List
      </Typography>
      <Grid container spacing={2} sx={listContainerStyle}>
        {pokemons.map((pokemon, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={cardStyle}>

                <CardContent sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.error.main,
                  },
                }}>
                  <Typography variant="h5">
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                  </Typography>
                </CardContent>

              </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PokemonList;