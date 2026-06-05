import { stdin, stdout } from 'process';
import { createInterface } from 'node:readline/promises';
import { salvarPokemon } from './services/BoxService';
import { buscaPokemon } from './services/PokeApiService';

async function main(): Promise<void> {
    const response = createInterface({
        input: stdin,
        output: stdout
    });

    try {
        exibirCabecalho();

        const nomePokemon = (
            await response.question('Digite o nome do Pokémon:\n')
        ).trim();

        if (!nomePokemon) {
            console.log('Você precisa informar um pokémon.');
            return;
        }

        const pokemon = await buscaPokemon(nomePokemon);

        const opcao = (
            await response.question(
                `\nPokémon "${pokemon.getPokemonName}" encontrado. Deseja gravá-lo? (S/N):\n`
            )
        ).trim().toUpperCase();

        if (!['S', 'N'].includes(opcao)) {
            console.log('Opção inválida!');
            return;
        }

        if (opcao === 'S') {
            await salvarPokemon(pokemon);
            console.log('\nPokémon salvo com sucesso!');
            return;
        }

        console.log('\nOperação cancelada pelo usuário.');

    } catch (error: unknown) {
        console.log(
            '\nFalha na realização do processo:',
            error instanceof Error ? error.message : error
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