import { readFile, writeFile } from "fs/promises";
import { PokemonResumo } from "../models/Pokemon";

const FILE = "pc_box.json";

export async function lerArquivo(): Promise<PokemonResumo[]> {
  try {
    const data = await readFile(FILE, "utf-8");

    if (!data.trim()) return [];

    return JSON.parse(data) as PokemonResumo[];
  } catch {
    return [];
  }
}

export async function salvarPokemon(pokemon: PokemonResumo): Promise<void> {
  const pokemons = await lerArquivo();

  const existe = pokemons.some(p => p.id === pokemon.id);

  if (existe) {
    console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
    return;
  }

  pokemons.push(pokemon);

  await writeFile(FILE, JSON.stringify(pokemons, null, 2), "utf-8");

  console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);
}

export async function listarCatalogo(): Promise<void> {
  const pokemons = await lerArquivo();

  if (pokemons.length === 0) {
    console.log("[AVISO] Catálogo vazio.");
    return;
  }

  pokemons.forEach(p => {
    const tipos = Array.isArray(p.tipos) ? p.tipos : [];

    const stats = p.stats;

    if (!stats) {
      console.log(`#${p.id} - ${p.nome} | Dados incompletos`);
      return;
    }

    console.log(
      `#${p.id} - ${p.nome} | Tipos: ${tipos.join(", ")} | HP: ${stats.hp} | ATK: ${stats.attack} | DEF: ${stats.defense}`
    );
  });
}

export async function removerPokemon(id: number): Promise<void> {
  const pokemons = await lerArquivo();

  const existe = pokemons.some(p => p.id === id);

  if (!existe) {
    console.log("[AVISO] Pokémon não encontrado.");
    return;
  }

  const novo = pokemons.filter(p => p.id !== id);

  await writeFile(FILE, JSON.stringify(novo, null, 2), "utf-8");

  console.log("[OK] Pokémon removido.");
}