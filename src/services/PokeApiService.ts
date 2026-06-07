import { PokemonApiResponse, PokemonResumo } from "../models/Pokemon";

export async function buscarPokemon(nomeOuId: string): Promise<PokemonResumo | null> {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${nomeOuId.toLowerCase()}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.log("[ERRO] Pokémon não encontrado");
      return null;
    }

    const data = (await response.json()) as PokemonApiResponse;

    const statsObj = {
      hp: data.stats.find(s => s.stat.name === "hp")?.base_stat ?? 0,
      attack: data.stats.find(s => s.stat.name === "attack")?.base_stat ?? 0,
      defense: data.stats.find(s => s.stat.name === "defense")?.base_stat ?? 0,
      spAttack: data.stats.find(s => s.stat.name === "special-attack")?.base_stat ?? 0,
      spDefense: data.stats.find(s => s.stat.name === "special-defense")?.base_stat ?? 0,
      speed: data.stats.find(s => s.stat.name === "speed")?.base_stat ?? 0,
    };

    return {
      id: data.id,
      nome: data.name,
      tipos: data.types.map(t => t.type.name),
      altura: data.height,
      peso: data.weight,
      stats: statsObj,
    };
  } catch {
    console.log("[ERRO] Falha na API");
    return null;
  }
}