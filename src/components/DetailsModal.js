import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DetailModal({ open, pokemon, handleClose }) {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const theme = useTheme();


  /** 
   * Gets the details of the selected pokemon
   * @author azuniga
   * @param
   */
  useEffect(() => {
    if (pokemon) {
      axios
        .get(pokemon)
        .then((response) => {
          setPokemonDetail(response.data);
        })
        .catch((error) => console.error("Error fetching Pokémon type:", error));
    }
  }, [pokemon]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    height: "400px",
    background: "linear-gradient(135deg, #f2e607 40%, #494603 100%)",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    border: "10px solid #ccc",
    borderRadius: "10px",
  };

  const imageStyle = {
    border: "2px solid #ccc",
    width: "150px",
    height: "150px",
    margin: "auto",
  };

  const titleWrapperStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem",
  };

  const abilitiesWrapperStyle = {
    display: "flex",
    alignItems: "center",
  };

  const abilityTextStyle = {
    backgroundColor: "#003865",
    color: "#fff",
    marginLeft: "1rem",
    padding: "0.5rem",
    borderRadius: "10px",
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {pokemonDetail ? (
          <Box sx={style}>
            <IconButton sx={{ marginLeft: 'auto' }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Box
              component="img"
              src={pokemonDetail.sprites.front_default}
              alt={"Pokemon" + pokemonDetail.name}
              sx={imageStyle}
            />
            <Box sx={titleWrapperStyle}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                {pokemonDetail.name}
              </Typography>
              <Typography id="modal-modal-title" variant="h3" component="h2">
                {pokemonDetail.base_experience}
              </Typography>
            </Box>
            <Box sx={abilitiesWrapperStyle}>
              <Typography align="center">Abilities</Typography>
              {pokemonDetail.abilities.slice(0, 2).map((ability, index) => (
                <Typography id="modal-modal-description" sx={abilityTextStyle}>
                  {ability.ability.name}
                </Typography>
              ))}
            </Box>
          </Box>
        ) : (
          <Typography align="center">Cargando...</Typography>
        )}
      </Modal>
    </div>
  );
}
