import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "process";
import { buscarPokemon } from "./services/PokeApiService";
import { CatalogoPokemon } from "./services/catalogoService";

async function main() {
  const rl = createInterface({ input: stdin, output: stdout });
  const catalogo = new CatalogoPokemon();

  while (true) {
    const opcao = await rl.question(`
=====================
1 - Buscar Pokémon
2 - Listar catálogo
3 - Remover Pokémon
4 - Sair
=====================
Escolha: `);

    switch (opcao.trim()) {
      case "1": {
        const nome = await rl.question("Nome do Pokémon: ");
        const pokemon = await buscarPokemon(nome);

        if (pokemon) catalogo.adicionar(pokemon);
        break;
      }

      case "2":
        catalogo.listar();
        break;

      case "3": {
        const id = Number(await rl.question("ID para remover: "));
        catalogo.remover(id);
        break;
      }

      case "4":
        console.log("Saindo...");
        rl.close();
        return;

      default:
        console.log("Opção inválida");
    }
  }
}

main();