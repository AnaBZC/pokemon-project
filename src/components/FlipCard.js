import React from 'react';
import { Card, CardContent, Typography, styled, Box } from '@mui/material';

const CardContainer = styled('div')({
  perspective: '1000px', // Perspectiva para el efecto 3D
  width: '200px', // Ancho de la tarjeta
  height: '300px', // Alto de la tarjeta
  margin: '20px', // Margen para separar de otros elementos
});

const FlippableCard = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 0.6s', // Duración de la animación
  transformStyle: 'preserve-3d', // Mantiene el efecto 3D
  '&:hover': {
    transform: 'rotateY(180deg)', // Gira la tarjeta al hacer hover
  },
});

const CardFace = styled(Card)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden', // Oculta la parte trasera de la cara
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra para mejor apariencia
  border: '10px solid #ccc',
});

const FrontFace = styled(CardFace)({
  backgroundColor: '#6200ea', // Color de la cara frontal
  backgroundImage: `url(/pokemon-card.png)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
});

const BackFace = styled(CardFace)({
  backgroundColor: '#d4c902', // Color de la cara trasera
  transform: 'rotateY(180deg)', // Gira la cara trasera 180 grados

});

const FlipCard = ({ p }) => {
  const POKEMON_IMG_BASE_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  //Style
  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    transition: "opacity 0.3s ease-in-out",
  }


  return (
    <CardContainer>
      <FlippableCard>
        {/* Cara frontal */}
        <FrontFace>
        </FrontFace>

        {/* Cara trasera */}
        <BackFace>
          <CardContent>
            <Box component="img"
              src={POKEMON_IMG_BASE_URL + p.pokemon.url.split("/").at(-2) + ".png"}
              alt={"Pokemon" + p.pokemon.name}
              sx={imageStyle}
            />

            <Typography variant="h4" >
              {p.pokemon.name.charAt(0).toUpperCase() +
                p.pokemon.name.slice(1)}
            </Typography>
          </CardContent>
        </BackFace>
      </FlippableCard>
    </CardContainer>
  );
};

export default FlipCard;