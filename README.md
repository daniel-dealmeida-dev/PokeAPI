# Mini-Projeto SCTEC Pokédex

Aplicação desenvolvida em Node.js e TypeScript para consulta de Pokémon através da PokeAPI e gerenciamento de um catálogo local persistido em arquivo JSON.

O sistema permite buscar Pokémon por nome, visualizar suas estatísticas, armazená-los em uma PC Box local e gerenciar o catálogo diretamente pelo terminal.

## Objetivo

Praticar os conceitos estudados durante o módulo de Back-End:

* Node.js
* TypeScript
* Programação Orientada a Objetos
* Async/Await
* Promises
* Manipulação de JSON
* Métodos de Array
* Tratamento de Erros
* Git e GitFlow

## Tecnologias Utilizadas

* Node.js
* TypeScript
* PokeAPI
* Git
* GitHub

## Pré-requisitos

* Node.js instalado
* npm instalado
* Git instalado

## Instalação

Clone o repositório:

```bash
git clone 
```

Entre na pasta do projeto:

```bash
cd mini-projeto-sctec-pokedex
```

Instale as dependências:

```bash
npm install
```

## Como Executar

Modo desenvolvimento:

```bash
npm run dev
```

Compilar o projeto:

```bash
npm run build
```

## Estrutura do Projeto

```text
src/
│
├── controllers/
│   └── TerminalController.ts
│
├── services/
│   ├── PokeApiService.ts
│   └── catalogoService.ts
│
├── models/
│   └── Pokemon.ts
│
├── main.ts
│
pc_box.json
package.json
tsconfig.json
README.md
```

## Funcionalidades

* Buscar Pokémon por nome
* Consultar dados diretamente da PokeAPI
* Exibir tipos e estatísticas
* Salvar Pokémon na PC Box
* Impedir registros duplicados
* Listar catálogo salvo
* Remover Pokémon pelo ID
* Persistir dados em arquivo JSON
* Menu interativo no terminal

## Exemplo de Execução

### Menu Principal

```text
1 - Buscar Pokémon
2 - Listar catálogo
3 - Remover Pokémon
4 - Sair
```

### Busca Válida

Entrada:

```text
pikachu
```

Saída:

```text
Encontrado: pikachu (#25)
Deseja salvar? (S/N): S

[OK] pikachu adicionado ao catálogo.
```

### Busca Inválida

Entrada:

```text
pokemon-inexistente
```

Saída:

```text
[ERRO] Pokémon não encontrado
```

### Duplicidade

```text
[AVISO] pikachu já está no catálogo.
```

### Remoção

```text
[OK] Pokémon removido.
```

## Conceitos Aplicados

Utilizadas para garantir tipagem dos dados recebidos da API e armazenados no sistema.

### Programação Orientada a Objetos

Implementação da classe `TerminalController`, responsável pela interação com o usuário.

### Async/Await

Utilizado para:

* Consultar a PokeAPI
* Ler arquivos JSON
* Salvar arquivos JSON

### Métodos de Array

Métodos utilizados no projeto:

* map
* find
* some
* filter
* forEach

### Persistência Local

Os Pokémon cadastrados são armazenados no arquivo:

```text
pc_box.json
```

## Organização do Projeto

Kanban utilizado durante o desenvolvimento:

https://trello.com/invite/b/6a22dee9cfdbb23c3f54bc83/ATTIaae98d8333dcf94fc1a6035acdb392fa728040CF/sctecpokedex

## Estratégia de Versionamento

Branches utilizadas:

* main
* develop
* feat/pokedex
* docs/readme

## Autor

Daniel de Almeida

Mini-projeto avaliativo desenvolvido para o curso SCTEC/SENAI-SC.
