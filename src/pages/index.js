import Head from "next/head";
import PokemonTypeList from "../components/PokemonTypeList";
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/theme";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Head>
          <title>Pokémon App</title>
          <meta name="description" content="A simple Pokémon list app using Next.js" />
        </Head>
        <PokemonTypeList />
      </div>
    </ThemeProvider>

  );
}