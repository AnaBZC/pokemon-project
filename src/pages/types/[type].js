import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid2 as Grid,
  Card,
  CardContent,
  Button,
  Pagination,
  CardMedia,
  Box
} from "@mui/material";
import DetailModal from "@/components/DetailsModal";

const TypePage = () => {
  const router = useRouter();
  const { type } = router.query; // Obtiene el parámetro desde la URL
  const [pokemons, setPokemons] = useState([]);
  const [paginatedList, setPaginatedList] = useState([]);
  const [pokemonTypeName, setPokemonTypeName] = useState("");
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [open, setOpen] = React.useState(false);
  const [ currentPokemon, setCurrentPokemon] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const POKEMON_IMG_BASE_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  useEffect(() => {
    if (type) {
      axios
        .get(`https://pokeapi.co/api/v2/type/${type}`)
        .then((response) => {
          setPokemons(response.data.pokemon);
          setPokemonTypeName(response.data.name);
        })
        .catch((error) => console.error("Error fetching Pokémon type:", error));
    }
  }, [type]);

  useEffect(() => {
    setPaginatedList(
      pokemons.slice(count * pageSize, count * pageSize + pageSize)
    );
  }, [count, pokemons]);

  if (!pokemons.length)
    return <Typography align="center">Cargando...</Typography>;

  const handlePaginationChange = (event, value) => {
    setCount(value - 1);
  };

  const openDetailModal = (pokemon) => {
    setOpen(true)
    setCurrentPokemon(pokemon.url)
  }

  // Style
  const cardStyle = {
    minWidth: '200px',
    minHeight: '200px',
    padding: 2,
    textAlign: "center",
    cursor: "pointer",
    position: "relative",
    transition: "0.3s",
    "&:hover .hover-image": {
      //transform: "scale(1.05)",
      opacity: 1
    }, // Efecto de escala en hover
  };

  const imageStyle = {
    width: "100%",
    height: "70%",
    opacity: 0,
    position: "absolute",
    top: "30%",
    left: 0,
    bottom: 0,
    right: 0,
    objectFit: "contain",
    //transform: "translate(-50%, -50%)",
    transition: "opacity 0.3s ease-in-out",
  }


  const listContainerStyle = {
    justifyContent: 'space-between',
  }

  return (
    <Container sx={{ marginTop: 4, textAlign: "center" }}>
      <DetailModal open={open} pokemon={currentPokemon} handleClose={handleClose}/>
      <Typography variant="h4" gutterBottom>
        Pokémon de tipo {pokemonTypeName}
      </Typography>
      <Grid container spacing={2} sx={listContainerStyle}>
        {paginatedList.map((p, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={cardStyle} onClick={()=> openDetailModal(p.pokemon)}>
              <CardContent>
                <Box component="img"
                  src={POKEMON_IMG_BASE_URL + p.pokemon.url.split("/").at(-2) + ".png"}
                  alt={"Pokemon" + p.pokemon.name}
                  sx={imageStyle} 
                  className="hover-image"
                />

                <Typography variant="h6">
                  {p.pokemon.name.charAt(0).toUpperCase() +
                    p.pokemon.name.slice(1)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(pokemons.length / pageSize)}
        onChange={handlePaginationChange}
      />
      <Button
        variant="contained"
        sx={{ marginTop: 2 }}
        onClick={() => router.push("/")}
      >
        Volver a la Lista
      </Button>
    </Container>
  );
};

export default TypePage;
