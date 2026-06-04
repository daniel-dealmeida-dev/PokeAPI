export class PokemonEscolhido {
  constructor(
    public pokemonType: string,
    public pokemonName: string | null,
    public pokemonId: number,
    public pokemonStats: number[],
  ) {}
  get getPokemonType(): string {
    return this.pokemonType;
  }

  get getPokemonName(): string | null {
    return this.pokemonName;
  }

  get getPokemonId(): number {
    return this.pokemonId;
  }
  get getPokemonStats(): number[] {
    return this.pokemonStats;
  }
}
