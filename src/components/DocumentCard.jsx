import { detectSourceBadge } from '../data/familyData';
import styles from './DocumentCard.module.css';

export default function DocumentCard({ document }) {
  const sourceLabel = detectSourceBadge(document.link, 'Otro');

  return (
    <a
      href={document.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={`${document.name} (${sourceLabel}) — Abrir en nueva pestaña`}
    >
      <div className={styles.card__iconWrap}>
        <i className="fas fa-folder" aria-hidden="true" />
      </div>

      <div className={styles.card__body}>
        <h3 className={styles.card__title}>{document.name}</h3>
        <span className={styles.card__badge}>{sourceLabel}</span>
      </div>

      <i
        className={`fas fa-external-link-alt ${styles.card__external}`}
        aria-hidden="true"
      />
    </a>
  );
}
