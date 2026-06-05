import { PokemonResumo, PokemonApiResponse } from "../models/Pokemon";

export async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${nomeOuId.toLowerCase()}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.log("[ERRO] Pokémon não encontrado");
      return null;
    }

    const data: PokemonApiResponse = await response.json() as PokemonApiResponse ;

    return {
      id: data.id,
      nome: data.name,
      tipos: data.types.map(t => t.type.name),
      altura: data.height,
      peso: data.weight,
    };

  } catch {
    console.log("[ERRO] Falha na API");
    return null;
  }
}