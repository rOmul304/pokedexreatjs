export default function PokemonCard({ pokemon, onSelect }) {
  const image = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;

  return (
    <article className="card" onClick={() => onSelect(pokemon)}>
      <span className="number">#{String(pokemon.id).padStart(3, '0')}</span>
      <img src={image} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <div className="types">
        {pokemon.types.map(({ type }) => (
          <span key={type.name}>{type.name}</span>
        ))}
      </div>
    </article>
  );
}
