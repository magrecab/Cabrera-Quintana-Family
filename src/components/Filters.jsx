import styles from './Filters.module.css';

const FILTER_OPTIONS = [
  { id: 'all', label: 'Todo', icon: 'fa-home' },
  { id: 'documents', label: 'Documentos', icon: 'fa-folder' },
  { id: 'photos', label: 'Fotos', icon: 'fa-images' },
  { id: 'videos', label: 'Videos', icon: 'fa-video' },
  { id: 'family', label: 'Sammy y Camy', icon: 'fa-users' },
];

export default function Filters({ selectedSection, onSelectSection }) {
  return (
    <nav
      className={styles.filters}
      aria-label="Filtrar contenido del archivo familiar"
    >
      {FILTER_OPTIONS.map((option) => {
        const isActive = selectedSection === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelectSection(option.id)}
            aria-pressed={isActive}
            className={`${styles.filters__btn} ${
              isActive ? styles['filters__btn--active'] : ''
            }`}
          >
            <i className={`fas ${option.icon}`} aria-hidden="true" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
