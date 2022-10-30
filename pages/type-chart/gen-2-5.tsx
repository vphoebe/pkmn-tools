import TypeChartTool, { TypeChartToolProps } from "../../components/Tool";
import { getPokemonList } from "../../lib/getPokemonList";
import { getTypes } from "../../lib/getTypes";

export default function Current({ typeData, pokemonList }: TypeChartToolProps) {
  return <TypeChartTool typeData={typeData} pokemonList={pokemonList} />;
}

export async function getStaticProps() {
  const typeData = await getTypes("generation-v");
  const pokemonList = await getPokemonList();
  return {
    props: { typeData, pokemonList },
  };
}
