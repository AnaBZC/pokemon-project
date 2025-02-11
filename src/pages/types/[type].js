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
  Box,
  styled
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
  const [open, setOpen] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const POKEMON_IMG_BASE_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  /** 
   * @author azuniga
   * 
   */
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

  const titleStyle = {
    marginBottom: '2rem',
  }

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
    transition: "opacity 0.3s ease-in-out",
  }

  const pagerStyle = {
    justifyContent: 'center',
    marginTop: '2rem',
  }

  const listContainerStyle = {
    justifyContent: 'space-between',
  }

  const FlippableCard = styled('div')({
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    '&:hover': {
      transform: 'rotateY(180deg)'
    }
  })

  const CardFace = styled(Card)({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  const FrontFace = styled(CardFace)({
    backgroundColor: '#ccc',
  });

  const BackFace = styled(CardFace)({
    backgroundColor: '#fff',
    transform: 'rotateY(180deg)',
  });

  const FlipCard = ({p}) => {
    return (
      <Grid item xs={12} sm={6} md={4} sx={{ perspective: '1000px' }}>
        <FlippableCard>
          <FrontFace />

          <BackFace onClick={() => openDetailModal(p.pokemon)}>
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
          </BackFace>
        </FlippableCard>

      </Grid>
    )
  }

  return (
    <Container sx={{ marginTop: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom sx={titleStyle}>
        Pokémon type {pokemonTypeName}
      </Typography>
      <Grid container spacing={2} sx={listContainerStyle}>
        {paginatedList.map((p, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ perspective: '1000px' }}>
            <Card sx={cardStyle} onClick={() => openDetailModal(p.pokemon)}>
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
      //     <Grid item xs={12} sm={6} md={4} sx={{ perspective: '1000px' }} >
      //   <FlippableCard>
      //     <FrontFace />

      //     <BackFace onClick={() => openDetailModal(p.pokemon)}>
      //       <CardContent>
      //         <Box component="img"
      //           src={POKEMON_IMG_BASE_URL + p.pokemon.url.split("/").at(-2) + ".png"}
      //           alt={"Pokemon" + p.pokemon.name}
      //           sx={imageStyle}
      //           className="hover-image"
      //         />

      //         <Typography variant="h6">
      //           {p.pokemon.name.charAt(0).toUpperCase() +
      //             p.pokemon.name.slice(1)}
      //         </Typography>
      //       </CardContent>
      //     </BackFace>
      //   </FlippableCard>

      // </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(pokemons.length / pageSize)}
        onChange={handlePaginationChange}
        sx={pagerStyle}
        color="error"
      />
      <Button
        variant="contained"
        sx={{ marginTop: 2 }}
        onClick={() => router.push("/")}
      >
        Volver a la Lista
      </Button>
      <DetailModal open={open} pokemon={currentPokemon} handleClose={handleClose} />
    </Container>
  );
};

export default TypePage;
