interface ListedType {
  name: string;
  url: string;
}

export interface TypeData {
  id: number;
  name: string;
  half: string[];
  double: string[];
  none: string[];
}

interface RawTypeData {
  id: number;
  name: string;
  damage_relations: any;
  past_damage_relations?: any;
  generation: {
    name: string;
    url: string;
  };
}

export type Generation = "generation-i" | "generation-v" | "current";

function trimDataToGeneration(data: RawTypeData[], generation: Generation) {
  const filteredData = data.filter((d) => {
    if (generation !== "current") {
      const lastDigitTest = /(\d)\/$/;
      const typeIntroducedGenNumberMatches =
        d.generation.url.match(lastDigitTest);
      if (typeIntroducedGenNumberMatches) {
        const genNumber = parseInt(typeIntroducedGenNumberMatches[1]);
        if (generation === "generation-i") return genNumber <= 1;
        if (generation === "generation-v") return genNumber <= 5;
      }
    }
    return true;
  });
  return filteredData.map((obj) => {
    let damageObject = obj.damage_relations;
    if (generation) {
      const pastDamageRelations = obj.past_damage_relations.find(
        (pdr: any) => pdr.generation.name === generation
      );
      if (pastDamageRelations)
        damageObject = pastDamageRelations.damage_relations;
    }
    return {
      id: obj.id,
      name: obj.name,
      half: damageObject.half_damage_to.map((a: { name: string }) => a.name),
      double: damageObject.double_damage_to.map(
        (a: { name: string }) => a.name
      ),
      none: damageObject.no_damage_to.map((a: { name: string }) => a.name),
    };
  });
}

export async function getTypeList() {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  const { results } = (await res.json()) as { results: ListedType[] };
  // pokeapi returns glitch types, need to filter them out
  const regex = /type\/\d{1,2}\/$/;
  const realTypes = results.filter((result) => regex.test(result.url));
  return realTypes;
}

export async function getTypes(generation: Generation): Promise<TypeData[]> {
  const list = await getTypeList();
  const promises = list.map((t) => fetch(t.url));
  const responses = await Promise.all(promises);
  const data: RawTypeData[] = await Promise.all(
    responses.map((res) => res.json())
  );
  const trimmedData = trimDataToGeneration(data, generation);
  return trimmedData;
}
