import { readFile, writeFile } from 'fs/promises';
import { PokemonEscolhido } from '../models/Pokemon';

const URL_DATABASE = 'pc_box.json';

async function lerArquivo(): Promise<PokemonEscolhido[]> {
  try {
    const pokemonText = await readFile(URL_DATABASE, 'utf-8');
    return JSON.parse(pokemonText);
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
    const [hp, atk, def, spAtk, spDef, speed] = pokemon.pokemonStats;

    console.log(`
---------------------
${pokemon.pokemonName}
#${pokemon.pokemonId}

Tipo: ${pokemon.pokemonType}

HP: ${hp}
ATK: ${atk}
DEF: ${def}
SP.ATK: ${spAtk}
SP.DEF: ${spDef}
SPEED: ${speed}
-------------------
`);
  });
}

export async function salvarPokemon(
  pokemon: PokemonEscolhido,
): Promise<void> {
  const pokemons = await lerArquivo();

  const pokemonExistente = pokemons.find(
    (pokemonSalvo) => pokemonSalvo.pokemonId === pokemon.pokemonId,
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