import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Container, Grid2 as Grid, useTheme } from "@mui/material";
import { useRouter } from "next/router";

// Llamada al API
import { fetchPokemons } from "../../api/api";
import PokeballIcon from "./PokeballIcon";

const PokemonTypeList = () => {
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const router = useRouter();

  /** 
   * Gets the list of pokemon types.
   * @author azuniga
   * @param
   */
  useEffect(() => {
    const getPokemons = async () => {
      const data = await fetchPokemons();
      setPokemonTypes(data);
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
    background: "linear-gradient(135deg, #003865, 50%, #0d2134 100%)",
    padding: 2,
    textAlign: "center",
    border: '10px solid #ccc',
    width: '50px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const titleStyle = {
    marginBottom: 4,
  }

  const listContainerStyle = {
    justifyContent: 'space-between',
  }

  return (
    <Container sx={contentStyles}>
      <Typography variant='h2' align='center' sx={titleStyle}>
        Pokémon Type List
      </Typography>
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        {pokemonTypes.map((type, index) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={index} onClick={() => router.push(`/types/${type.url.split('/').at(-2)}`)}>
            <Card sx={cardStyle}>
              <CardContent sx={{

              }}>
                <Typography variant='h5' sx={{ marginBottom: '1rem' }}>
                  {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                </Typography>
                <PokeballIcon />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PokemonTypeList;