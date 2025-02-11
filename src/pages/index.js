import Head from "next/head";
import PokemonList from "../components/PokemonList";
import HeaderBar from "../components/Heder";
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/theme";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
       <div>
      <HeaderBar/>
      <Head>
        <title>Pokémon App</title>
        <meta name="description" content="A simple Pokémon list app using Next.js" />
      </Head>
      <PokemonList />
    </div>
    </ThemeProvider>
   
  );
}