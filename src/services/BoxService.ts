import { readFile, writeFile } from 'fs/promises';
import { PokemonEscolhido } from '../models/Pokemon';
import { buscaPokemon } from './PokeApiService';

const URL_DATABASE = `pc_boc.json`;

async function lerArquivo(): Promise<PokemonEscolhido[]> {
  try {
    const pokemonText = await readFile(URL_DATABASE, 'utf-8');
    return JSON.parse(pokemonText);
  } catch {
    console.error('Erro ao ler o arquivo');
    return [];
  }
}

export async function salvarPokemon(pokemon: PokemonEscolhido): Promise<void> {
  const pokemons = await lerArquivo();

  if (!pokemons) {
    await writeFile(URL_DATABASE, JSON.stringify([pokemon]), {
      encoding: 'utf-8',
    });
  }

  const pokemonExistente = pokemons.find(
    (pokemonSalvo) => pokemonSalvo.getPokemonId === pokemon.getPokemonId,
  );

  
}
