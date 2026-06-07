import { readFile, writeFile } from 'fs/promises';
import { PokemonResumo } from '../models/Pokemon';

const URL_DATABASE = 'pc_box.json';

async function lerArquivo(): Promise<PokemonResumo[]> {
  try {
    const pokemonText = await readFile(URL_DATABASE, 'utf-8');

    if (!pokemonText.trim()) return [];

    return JSON.parse(pokemonText) as PokemonResumo[];
  } catch {
    return [];
  }
}

export async function exibirPCBox(): Promise<void> {
  const pokemons = await lerArquivo();

  if (pokemons.length === 0) {
    console.log('PC Box vazio.');
    return;
  }

  pokemons.forEach((pokemon) => {
    if (!pokemon.stats || !pokemon.tipos) return;

    const { hp, attack, defense, spAttack, spDefense, speed } = pokemon.stats;

    console.log(`
---------------------
${pokemon.nome}
#${pokemon.id}

Tipo: ${pokemon.tipos.join(", ")}

HP: ${hp}
ATK: ${attack}
DEF: ${defense}
SP.ATK: ${spAttack}
SP.DEF: ${spDefense}
SPEED: ${speed}
-------------------
`);
  });
}

export async function salvarPokemon(
  pokemon: PokemonResumo,
): Promise<void> {
  const pokemons = await lerArquivo();

  const pokemonExistente = pokemons.find(
    (pokemonSalvo) => pokemonSalvo.id === pokemon.id,
  );

  if (pokemonExistente) {
    throw new Error('Pokémon já cadastrado.');
  }

  pokemons.push(pokemon);

  await writeFile(
    URL_DATABASE,
    JSON.stringify(pokemons, null, 2),
    'utf-8',
  );
}