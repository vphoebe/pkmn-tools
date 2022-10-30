import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-sm mx-auto py-4 text-center">
      <Head>
        <title>Home | vphoebe&apos;s pkmn tools</title>
      </Head>
      <h1 className="font-bold">Pokémon tools by vphoebe</h1>
      <Link href="/type-chart/current" className="underline">
        Type chart
      </Link>
    </div>
  );
}
