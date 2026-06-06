import { useEffect, useMemo, useState } from 'react';
import SearchFilter from './components/SearchFilter.jsx';
import PokemonList from './components/PokemonList.jsx';
import PokemonModal from './components/PokemonModal.jsx';

const API = 'https://pokeapi.co/api/v2';
const LIMIT = 20;

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [typeTotal, setTypeTotal] = useState(null);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [allPokemonNames, setAllPokemonNames] = useState([]);

  useEffect(() => {
    async function loadTypes() {
      try {
        const response = await fetch(`${API}/type`);
        if (!response.ok) throw new Error('Não foi possível carregar os tipos.');
        const data = await response.json();
        setTypes(data.results.filter((type) => type.name !== 'unknown' && type.name !== 'shadow'));
      } catch (err) {
        setError(err.message);
      }
    }
    loadTypes();
  }, []);
  useEffect(() => {
  async function loadAllPokemonNames() {
    try {
      const response = await fetch(`${API}/pokemon?limit=1300`);
      const data = await response.json();
      setAllPokemonNames(data.results);
    } catch (err) {
      console.error(err);
    }
  }

  loadAllPokemonNames();
}, []);

  useEffect(() => {
    async function loadPokemons() {
      setLoading(true);
      setError('');
      try {
        let results = [];

        if (selectedType) {
          const response = await fetch(`${API}/type/${selectedType}`);
          if (!response.ok) throw new Error('Não foi possível carregar esse tipo de Pokémon.');
          const data = await response.json();
          setTypeTotal(data.pokemon.length);
          results = data.pokemon.slice(offset, offset + LIMIT).map((item) => item.pokemon);
        } else {
          const response = await fetch(`${API}/pokemon?limit=${LIMIT}&offset=${offset}`);
          if (!response.ok) throw new Error('Não foi possível carregar a lista de Pokémon.');
          const data = await response.json();
          setTypeTotal(null);
          results = data.results;
        }

        const details = await Promise.all(
          results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            if (!response.ok) throw new Error('Erro ao carregar detalhes de um Pokémon.');
            return response.json();
          })
        );

        setPokemons(details);
      } catch (err) {
        setError(err.message || 'Ocorreu um erro inesperado. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }

    loadPokemons();
  }, [offset, selectedType]);

    const filteredPokemons = pokemons;

    async function handleSearch(value) {
  setSearch(value);
  setError('');

  if (!value.trim()) {
    return;
  }

  try {
    setLoading(true);

    const encontrados = allPokemonNames
      .filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(value.toLowerCase().trim())
      )
      .slice(0, 20);

    if (encontrados.length === 0) {
      setPokemons([]);
      setError('Nenhum Pokémon encontrado.');
      return;
    }

    const details = await Promise.all(
      encontrados.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return response.json();
      })
    );

    setPokemons(details);
  } catch (err) {
    setError('Erro ao buscar Pokémon.');
  } finally {
    setLoading(false);
  }
}


  function handleTypeChange(type) {
    setSelectedType(type);
    setOffset(0);
    setSearch('');
  }

  return (
    <main className="container">
      <header className="hero">
        <div>
          <p className="subtitle">React JS + PokéAPI</p>
          <h1>Pokédex Interativa</h1>
          <p>Pesquise, filtre por tipo, veja detalhes e navegue pela lista paginada de Pokémon.</p>
        </div>
      </header>

      <SearchFilter
        search={search}
        onSearch={handleSearch}
        types={types}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
      />

      {selectedType && (
        <section className="type-info">
          <strong>{typeTotal}</strong> Pokémon encontrados no tipo <strong>{selectedType}</strong>.
          <button onClick={() => handleTypeChange('')}>Voltar à listagem completa</button>
        </section>
      )}

      {error && <p className="message error">{error}</p>}
      {loading && <p className="message">Carregando...</p>}

      {!loading && !error && (
        <PokemonList pokemons={filteredPokemons} onSelect={setSelectedPokemon} />
      )}

      <div className="pagination">
        <button disabled={offset === 0 || loading} onClick={() => setOffset((value) => Math.max(0, value - LIMIT))}>
          Anterior
        </button>
        <span>Página {Math.floor(offset / LIMIT) + 1}</span>
        <button disabled={loading || (selectedType && offset + LIMIT >= typeTotal)} onClick={() => setOffset((value) => value + LIMIT)}>
          Próxima
        </button>
      </div>

      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
      )}
    </main>
  );
}
