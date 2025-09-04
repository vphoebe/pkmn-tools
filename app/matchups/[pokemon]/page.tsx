import { notFound } from "next/navigation";
import TypeChartTool from "../../../components/ToolContainer";
import { getPokemonData } from "../../../helpers/getPokemonData";
import { getPokemonList } from "../../../helpers/getPokemonList";
import { getAllTypeData } from "../../../helpers/getTypeData";
import React from "react";

interface TypeChartPageProps {
  params: Promise<{ pokemon: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params }: TypeChartPageProps) {
  const { pokemon } = await params;

  if (!pokemon || Array.isArray(pokemon)) {
    notFound();
  }

  const pokemonData = await getPokemonData(pokemon);
  if (!pokemonData) {
    notFound();
  }
  const pokemonList = await getPokemonList();
  const allTypeData = await getAllTypeData();
  return (
    <TypeChartTool
      pokemonList={pokemonList}
      allTypeData={allTypeData}
      pokemonData={pokemonData}
    />
  );
}
