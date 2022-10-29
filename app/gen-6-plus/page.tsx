import { Suspense } from "react";

interface TypeList {
  results: {
    name: string;
    url: string;
  }[];
}

async function getTypeList(): Promise<TypeList> {
  const res = await fetch(`https://pokeapi.co/api/v2/type`);
  return res.json();
}

async function Type({ url }: { name: string; url: string }) {
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return <li>{data.name}</li>;
}

export default async function Page() {
  const { results } = await getTypeList();
  // pokeapi returns glitch types, need to filter them out
  const regex = /type\/\d{1,2}\/$/;
  const realTypes = results.filter((result) => regex.test(result.url));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ul>
        {realTypes.map((t) => (
          <Type key={t.name} url={t.url} />
        ))}
      </ul>
    </Suspense>
  );
}
