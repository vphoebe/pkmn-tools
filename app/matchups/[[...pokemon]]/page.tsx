import { notFound, redirect, RedirectType } from "next/navigation";
import MatchupsTool from "../../../components/MatchupsTool";
import { getPokemonData } from "../../../helpers/getPokemonData";
import { getPokemonList } from "../../../helpers/getPokemonList";
import { getAllTypeData } from "../../../helpers/getTypeData";
import React from "react";

interface TypeChartPageProps {
  params: Promise<{ pokemon: string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params }: TypeChartPageProps) {
  const { pokemon } = await params;
  if (!pokemon) {
    redirect(`/matchups/pikachu`, RedirectType.replace);
  }

  const pokemonData = await getPokemonData(pokemon[0]);
  if (!pokemonData) {
    notFound();
  }
  const pokemonList = await getPokemonList();
  const allTypeData = await getAllTypeData();
  return (
    <MatchupsTool
      pokemonList={pokemonList}
      allTypeData={allTypeData}
      pokemonData={pokemonData}
    />
  );
}
