export default function PokemonModal({ pokemon, onClose }) {
  const image = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;

  return (
    <div className="overlay" onClick={onClose}>
      <section className="modal" onClick={(event) => event.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>
        <div className="modal-header">
          <img src={image} alt={pokemon.name} />
          <div>
            <span className="number">#{String(pokemon.id).padStart(3, '0')}</span>
            <h2>{pokemon.name}</h2>
            <p>Altura: {pokemon.height / 10} m</p>
            <p>Peso: {pokemon.weight / 10} kg</p>
          </div>
        </div>

        <h3>Habilidades</h3>
        <ul>
          {pokemon.abilities.map(({ ability }) => <li key={ability.name}>{ability.name}</li>)}
        </ul>

        <h3>Estatísticas base</h3>
        <div className="stats">
          {pokemon.stats.map(({ stat, base_stat }) => (
            <div key={stat.name}>
              <span>{stat.name}</span>
              <strong>{base_stat}</strong>
              <progress value={base_stat} max="200" />
            </div>
          ))}
        </div>

        <h3>Sprites</h3>
        <div className="sprites">
          {pokemon.sprites.front_default && <img src={pokemon.sprites.front_default} alt="sprite frente" />}
          {pokemon.sprites.back_default && <img src={pokemon.sprites.back_default} alt="sprite verso" />}
        </div>
      </section>
    </div>
  );
}
