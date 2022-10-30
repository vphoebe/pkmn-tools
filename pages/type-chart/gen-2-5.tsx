import Head from "next/head";
import React from "react";
import TypeChartTool, { TypeChartToolProps } from "../../components/Tool";
import { getPokemonList } from "../../lib/getPokemonList";
import { Generation, getTypes } from "../../lib/getTypes";

export default function Gen2To5({
  typeData,
  pokemonList,
  gen,
}: TypeChartToolProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Type chart (Gens. 2-5) | vphoebe&apos;s pkmn tools</title>
      </Head>
      <TypeChartTool typeData={typeData} pokemonList={pokemonList} gen={gen} />
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const gen: Generation = "generation-v";
  const typeData = await getTypes(gen);
  const pokemonList = await getPokemonList();
  return {
    props: { typeData, pokemonList, gen },
  };
}
