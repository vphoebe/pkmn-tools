import Head from "next/head";
import React from "react";
import TypeChartTool, { TypeChartToolProps } from "../../components/Tool";
import { getPokemonList } from "../../lib/getPokemonList";
import { Generation, getTypes } from "../../lib/getTypes";

export default function Gen1({
  typeData,
  pokemonList,
  gen,
}: TypeChartToolProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Type chart (Gen. 1) | vphoebe&apos;s pkmn tools</title>
      </Head>
      <TypeChartTool typeData={typeData} pokemonList={pokemonList} gen={gen} />
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const gen: Generation = "generation-i";
  const typeData = await getTypes(gen);
  const pokemonList = await getPokemonList();
  return {
    props: { typeData, pokemonList, gen },
  };
}
