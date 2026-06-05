import { stdin, stdout } from 'process';
import { createInterface } from 'node:readline/promises';
import { salvarPokemon, exibirPCBox } from './services/BoxService';
import { buscaPokemon } from './services/PokeApiService';

async function main(): Promise<void> {
  const response = createInterface({
    input: stdin,
    output: stdout,
  });

  try {
    const opcao = await response.question(`
1 - Buscar Pokémon
2 - Ver PC Box
3 - Sair

Escolha uma opção:
`);

    switch (opcao.trim()) {
      case '1':
        exibirCabecalho();

        const nomePokemon = (
          await response.question('Digite o nome do Pokémon:\n')
        ).trim();

        if (!nomePokemon) {
          console.log('Você precisa informar um pokémon.');
          break;
        }

        const pokemon = await buscaPokemon(nomePokemon);

        const opcaoSalvar = (
          await response.question(
            `\nPokémon "${pokemon.getPokemonName}" encontrado. Deseja gravá-lo? (S/N):\n`,
          )
        )
          .trim()
          .toUpperCase();

        if (!['S', 'N'].includes(opcaoSalvar)) {
          console.log('Opção inválida!');
          break;
        }

        if (opcaoSalvar === 'S') {
          await salvarPokemon(pokemon);
          console.log('\nPokémon salvo com sucesso!');
        } else {
          console.log('\nOperação cancelada pelo usuário.');
        }

        break;

      case '2':
        await exibirPCBox();
        break;

      case '3':
        console.log('Saindo...');
        break;

      default:
        console.log('Opção inválida.');
    }
  } catch (error: unknown) {
    console.log(
      '\nFalha na realização do processo:',
      error instanceof Error ? error.message : error,
    );
  } finally {
    response.close();
  }

  function exibirCabecalho(): void {
    console.log('\n--------------------------------');
    console.log('BUSCA DE POKÉMONS');
    console.log('--------------------------------\n');
  }
}
