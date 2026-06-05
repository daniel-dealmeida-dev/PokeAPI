import { PokemonResumo } from "../models/Pokemon";

export class CatalogoPokemon {
  private pokemons: PokemonResumo[] = [];

  adicionar(pokemon: PokemonResumo): void {
    const existe = this.pokemons.some(p => p.id === pokemon.id);

    if (existe) {
      console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
      return;
    }

    this.pokemons.push(pokemon);
    console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);
  }

  listar(): void {
    if (this.pokemons.length === 0) {
      console.log("[AVISO] Catálogo vazio.");
      return;
    }

    this.pokemons.forEach(p => {
      console.log(`#${p.id} - ${p.nome} | Tipos: ${p.tipos.join(", ")} | Altura: ${p.altura} | Peso: ${p.peso}`);
    });
  }

  remover(id: number): void {
    const existe = this.pokemons.some(p => p.id === id);

    if (!existe) {
      console.log("[AVISO] Pokémon não encontrado.");
      return;
    }

    this.pokemons = this.pokemons.filter(p => p.id !== id);
    console.log("[OK] Pokémon removido.");
  }
}