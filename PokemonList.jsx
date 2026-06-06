import PokemonCard from './PokemonCard.jsx';

export default function PokemonList({ pokemons, onSelect }) {
  if (pokemons.length === 0) {
    return <p className="message">Nenhum Pokémon encontrado com essa busca.</p>;
  }

  return (
    <section className="grid">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} onSelect={onSelect} />
      ))}
    </section>
  );
}
