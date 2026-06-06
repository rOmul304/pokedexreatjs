# Pokédex ReactJS

Aplicação front-end criada com React JS e Vite para consumir a PokéAPI.

## Funcionalidades

- Lista de Pokémon com paginação usando `limit` e `offset`.
- Requisição extra para buscar detalhes de cada Pokémon.
- Cards com nome, número, imagem e tipos.
- Modal de detalhes com altura, peso, habilidades, estatísticas e sprites.
- Busca por nome no lado do cliente.
- Filtro por tipo usando o endpoint `/type`.
- Mensagens de carregamento e tratamento de erros.
- Layout responsivo com CSS Grid, Flexbox e media queries.

## Como rodar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o projeto:

```bash
npm run dev
```

3. Abra o endereço mostrado no terminal, geralmente:

```bash
http://localhost:5173
```

## Dependências utilizadas

- React
- React DOM
- Vite

## Decisões de implementação

O projeto foi separado em componentes para deixar o código mais organizado e reutilizável:

- `SearchFilter`: controla busca por nome e filtro por tipo.
- `PokemonList`: renderiza a lista de Pokémon.
- `PokemonCard`: exibe os dados principais de cada Pokémon.
- `PokemonModal`: mostra os detalhes completos do Pokémon selecionado.

Foi usado `useState` para controlar lista de Pokémon, tipos, busca, paginação, carregamento, erros e Pokémon selecionado. O `useEffect` foi utilizado para realizar os efeitos colaterais, como buscar dados na PokéAPI quando a aplicação carrega, quando o usuário muda de página ou quando seleciona um tipo.

A busca por nome é feita no lado do cliente, filtrando apenas os Pokémon já carregados na listagem atual. O filtro por tipo consulta o endpoint `/type`, porque ele retorna os Pokémon associados a cada tipo. Depois disso, a aplicação busca os detalhes de cada Pokémon para mostrar imagem, tipos, habilidades e estatísticas.

O tratamento de erros foi feito com `try/catch`, exibindo mensagens amigáveis caso a API esteja indisponível ou ocorra falha de conexão.
