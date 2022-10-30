import TypeChartTool, { TypeChartToolProps } from "../../components/Tool";
import { getPokemonList } from "../../lib/getPokemonList";
import { Generation, getTypes } from "../../lib/getTypes";

export default function Current({
  typeData,
  pokemonList,
  gen,
}: TypeChartToolProps) {
  return (
    <TypeChartTool typeData={typeData} pokemonList={pokemonList} gen={gen} />
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
