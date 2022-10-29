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

export async function getTypeList() {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  const { results } = (await res.json()) as { results: ListedType[] };
  // pokeapi returns glitch types, need to filter them out
  const regex = /type\/\d{1,2}\/$/;
  const realTypes = results.filter((result) => regex.test(result.url));
  return realTypes;
}

export async function getTypes(): Promise<TypeData[]> {
  const list = await getTypeList();
  const promises = list.map((t) => fetch(t.url));
  const responses = await Promise.all(promises);
  const data = await Promise.all(responses.map((res) => res.json()));
  const trimmedData = data.map((obj) => ({
    id: obj.id,
    name: obj.name,
    half: obj.damage_relations.half_damage_to.map(
      (a: { name: string }) => a.name
    ),
    double: obj.damage_relations.double_damage_to.map(
      (a: { name: string }) => a.name
    ),
    none: obj.damage_relations.no_damage_to.map(
      (a: { name: string }) => a.name
    ),
  }));
  return trimmedData;
}
