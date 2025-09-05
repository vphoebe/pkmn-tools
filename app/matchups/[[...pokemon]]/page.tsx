import type { Metadata } from "next"
import { RedirectType, notFound, redirect } from "next/navigation"
import React from "react"

import MatchupsTool from "@/components/MatchupsTool"

import { getPokemonData } from "@/helpers/getPokemonData"
import { getPokemonList } from "@/helpers/getPokemonList"
import { getAllTypeData } from "@/helpers/getTypeData"

interface TypeChartPageProps {
  params: Promise<{ pokemon: string[] | undefined }>
}

// render each pokemon once, on demand, and cache forever
export const dynamic = "force-static"
export const revalidate = false

export async function generateMetadata({
  params,
}: TypeChartPageProps): Promise<Metadata> {
  const { pokemon } = await params

  return {
    title: `${pokemon[0]} type matchups`,
  }
}

export default async function MatchupsPage({ params }: TypeChartPageProps) {
  const { pokemon } = await params
  if (!pokemon) {
    redirect(`/matchups/pikachu`, RedirectType.replace)
  }

  const pokemonData = await getPokemonData(pokemon[0])
  if (!pokemonData) {
    notFound()
  }
  const pokemonList = await getPokemonList()
  const allTypeData = await getAllTypeData()
  return (
    <MatchupsTool
      pokemonList={pokemonList}
      allTypeData={allTypeData}
      pokemonData={pokemonData}
    />
  )
}
