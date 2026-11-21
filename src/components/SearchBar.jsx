import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onDebouncedChange, debounceMs = 250 }) {
  const [inputValue, setInputValue] = useState(value);

  // Sincroniza si el valor externo se limpia (por ejemplo, al pulsar "Limpiar filtros")
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Aplica debounce para evitar filtrados excesivos mientras se escribe
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      onDebouncedChange(inputValue);
    }, debounceMs);

    return () => window.clearTimeout(timerId);
  }, [inputValue, debounceMs, onDebouncedChange]);

  const handleClear = () => {
    setInputValue('');
    onDebouncedChange('');
  };

  return (
    <div className={styles.searchBar}>
      <label htmlFor="archive-search-input" className={styles.searchBar__label}>
        Buscar documentos, fotos o videos por nombre
      </label>

      <div className={styles.searchBar__box}>
        <i className={`fas fa-search ${styles.searchBar__icon}`} aria-hidden="true" />
        <input
          id="archive-search-input"
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Buscar por nombre (ej. Barranquilla, clausura, impuestos)..."
          className={styles.searchBar__input}
          autoComplete="off"
        />
        {inputValue.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
            className={styles.searchBar__clear}
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
