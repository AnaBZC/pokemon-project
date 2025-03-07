import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/type?offset=0&limit=30";

export const fetchPokemons = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        return [];
    }
};