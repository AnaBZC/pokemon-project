import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid2 as Grid,
  Button,
  Pagination,
  Skeleton
} from "@mui/material";
import DetailModal from "@/components/DetailsModal";
import FlipCard from "@/components/FlipCard";
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/theme";
import SearchBar from "@/components/SearchBar";

const TypePage = () => {
  const router = useRouter();
  const { type } = router.query; // Obtiene el parámetro desde la URL
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [paginatedList, setPaginatedList] = useState([]);
  const [pokemonTypeName, setPokemonTypeName] = useState("");
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [open, setOpen] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const POKEMON_IMG_BASE_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  /** 
   * Gets the list of pokemon according to type
   * @author azuniga
   * @param type
   */
  useEffect(() => {
    if (type) {
      axios
        .get(`https://pokeapi.co/api/v2/type/${type}`)
        .then((response) => {
          setPokemons(response.data.pokemon);
          setPokemonTypeName(response.data.name);
          setLoading(false)
        })
        .catch((error) => console.error("Error fetching Pokémon type:", error));
    }
  }, [type]);

  /** 
   * Page the pokemon list
   * @author azuniga
   * @param
   */
  useEffect(() => {
    setPaginatedList(
      pokemons.slice(count * pageSize, count * pageSize + pageSize)
    );
  }, [count, pokemons]);

  const handlePaginationChange = (event, value) => {
    setCount(value - 1);
  };

  const handleSearch = (search) => {
    if(search && search != "") {
      const pokemonQuery = pokemons.filter(p => (p.pokemon.name.toLowerCase()).includes(search.toLowerCase()) )
      setPaginatedList(pokemonQuery)
    } else {
      setPaginatedList(
        pokemons.slice(count * pageSize, count * pageSize + pageSize)
      );
    }
  }

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
      opacity: 1
    }, 
  };

  const titleStyle = {
    marginBottom: '2rem',
  }

  const imageStyle = {
    width: "100%",
    height: "70%",
    opacity: 0,
    top: "30%",
    left: 0,
    bottom: 0,
    right: 0,
    objectFit: "contain",
    transition: "opacity 0.3s ease-in-out",
  }

  const pagerStyle = {
    marginTop: '2rem',
    ul: {
      justifyContent: 'center',
    }
  }

  const listContainerStyle = {
    justifyContent: 'center',
  }

  if(!loading && !pokemons.length) 
    return <>
    <ThemeProvider theme={theme}>
      <Container sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography variant="h2" gutterBottom sx={titleStyle}>
          Pokémon type {pokemonTypeName}
        </Typography>
      <Typography align="center">The list is empty...</Typography>;
      <Button
          variant="contained"
          sx={{ marginTop: 2, color: 'white' }}
          onClick={() => router.push("/")}
          color="blue"
        >
          Back to the list
        </Button>
      </Container>
      </ThemeProvider>
    </>

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography variant="h2" gutterBottom sx={titleStyle}>
          Pokémon type {pokemonTypeName}
        </Typography>
        <SearchBar onSearch={handleSearch}/>
        <div>
        {loading ?
            <Grid container spacing={2} sx={listContainerStyle}>
              
                  <Grid xs={12} sm={6} md={2} key={"1"} >
                    <Skeleton animation="wave" sx={cardStyle}/>
                  </Grid>
                  <Grid xs={12} sm={6} md={2} key={"2"} >
                    <Skeleton animation="wave" sx={cardStyle}/>
                  </Grid>
                  <Grid xs={12} sm={6} md={2} key={"3"}>
                    <Skeleton animation="wave" sx={cardStyle}/>
                  </Grid>

                 
              
              </Grid>
          
          :
            <Grid container spacing={2} sx={listContainerStyle}>
              {paginatedList.map((p, index) => (
                <Grid xs={12} sm={6} md={2} key={index} onClick={() => openDetailModal(p.pokemon)}>
                  <FlipCard p={p} />
                </Grid>
              ))}
            </Grid>
        }
          
        </div>

        <Pagination
          count={Math.ceil(pokemons.length / pageSize)}
          onChange={handlePaginationChange}
          sx={pagerStyle}
        />
        <Button
          variant="contained"
          sx={{ marginTop: 2, color: 'white' }}
          onClick={() => router.push("/")}
          color="blue"
        >
          Back to the list
        </Button>
        <DetailModal open={open} pokemon={currentPokemon} handleClose={handleClose} />
      </Container>
    </ThemeProvider>
  );
};

export default TypePage;
