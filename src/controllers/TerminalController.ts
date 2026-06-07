import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "process";

import { buscarPokemon } from "../services/PokeApiService";
import {
  salvarPokemon,
  listarCatalogo,
  removerPokemon,
} from "../services/catalogoService";

export class TerminalController {
  private rl = createInterface({ input: stdin, output: stdout });

  async start(): Promise<void> {
    while (true) {
      const opcao = await this.rl.question(`
------------------
1 - Buscar Pokémon
2 - Listar catálogo
3 - Remover Pokémon
4 - Sair
--------------------
Escolha: `);

      switch (opcao.trim()) {
        case "1":
          await this.buscar();
          break;

        case "2":
          await listarCatalogo();
          break;

        case "3":
          await this.remover();
          break;

        case "4":
          console.log("Saindo...");
          this.rl.close();
          return;

        default:
          console.log("Opção inválida.");
      }
    }
  }

  private async buscar(): Promise<void> {
    const nome = await this.rl.question("Nome do Pokémon: ");

    const pokemon = await buscarPokemon(nome);

    if (!pokemon) return;

    console.log(`Encontrado: ${pokemon.nome} (#${pokemon.id})`);

    const salvar = await this.rl.question("Deseja salvar? (S/N): ");

    if (salvar.toLowerCase() === "s") {
      await salvarPokemon(pokemon);
    } else {
      console.log("Cancelado.");
    }
  }

  private async remover(): Promise<void> {
    const input = await this.rl.question("ID do Pokémon: ");
    const id = Number(input);

    if (isNaN(id)) {
      console.log("ID inválido.");
      return;
    }

    const confirm = await this.rl.question(
      `Tem certeza que deseja remover o Pokémon ${id}? (S/N): `
    );

    if (confirm.toLowerCase() === "s") {
      await removerPokemon(id);
    } else {
      console.log("Remoção cancelada.");
    }
  }
}