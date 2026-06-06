export default function SearchFilter({ search, onSearch, types, selectedType, onTypeChange }) {
  return (
    <section className="filters">
      <label>
        Buscar por nome
        <input
          type="text"
          placeholder="Ex.: pikachu"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
        />
      </label>

      <label>
        Filtrar por tipo
        <select value={selectedType} onChange={(event) => onTypeChange(event.target.value)}>
          <option value="">Todos os tipos</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>{type.name}</option>
          ))}
        </select>
      </label>
    </section>
  );
}
