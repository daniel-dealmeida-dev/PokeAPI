import { PokemonEscolhido } from "../models/Pokemon";


export async function buscaPokemon(url: string): Promise<PokemonEscolhido> {
  const PokemonEscolhido = 'https://pokeapi.co/api/v2/pokemon/${pokemonName}';

  try {
    const response = await fetch(`${url}`);
    switch (response.status) {
      case 200:
        
        // TODO:return .validate(await response.json());
      case 404:
        throw new Error('Pokémon não encontrado');
      case 400:
        throw new Error('Requisição inválida');
      default:
        throw new Error('Erro desconhecido');
    }
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw new Error('Falha de conexão com a API');
    }
    throw Error;
  }
}
