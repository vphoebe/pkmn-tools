import { useSearchParams, useRouter } from "next/navigation";

function useParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updatePokemon = (pokemon: string) => {
    router.push(`${pokemon}?${searchParams.toString()}`);
  };

  return { updatePokemon };
}

export default useParams;
