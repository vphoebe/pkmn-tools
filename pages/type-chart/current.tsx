import Head from "next/head";
import React from "react";
import Banner from "../../components/Banner";
import TypeChartTool, { TypeChartToolProps } from "../../components/Tool";
import { getPokemonList } from "../../lib/getPokemonList";
import { Generation, getTypes } from "../../lib/getTypes";

export default function Current({
  typeData,
  pokemonList,
  gen,
}: TypeChartToolProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Type chart (Gen. 6+) | vphoebe&apos;s pkmn tools</title>
      </Head>
      <Banner
        type="alert"
        message="Gen. 9 data (Scarlet/Violet) is not yet available. Please check back soon."
      />
      <TypeChartTool typeData={typeData} pokemonList={pokemonList} gen={gen} />
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const gen: Generation = "current";
  const typeData = await getTypes(gen);
  const pokemonList = await getPokemonList();
  return {
    props: { typeData, pokemonList, gen },
  };
}
