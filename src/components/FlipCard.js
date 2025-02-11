import React from 'react';
import { Card, CardContent, Typography, styled, Box } from '@mui/material';

const CardContainer = styled('div')({
  perspective: '1000px', 
  width: '200px', 
  height: '300px', 
  margin: '20px', 
});

const FlippableCard = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  transition: 'transform 0.6s', 
  transformStyle: 'preserve-3d', 
  '&:hover': {
    transform: 'rotateY(180deg)', 
  },
});

const CardFace = styled(Card)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
  border: '10px solid #ccc',
});

const FrontFace = styled(CardFace)({
  backgroundColor: '#6200ea', 
  backgroundImage: `url(/pokemon-card.png)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
});

const BackFace = styled(CardFace)({
  backgroundColor: '#d4c902', 
  transform: 'rotateY(180deg)', 

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