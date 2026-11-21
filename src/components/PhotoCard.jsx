import { detectSourceBadge } from '../data/familyData';
import styles from './PhotoCard.module.css';

export default function PhotoCard({ photo }) {
  const sourceLabel = detectSourceBadge(photo.link, 'Otro');

  return (
    <a
      href={photo.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={`${photo.name} (${sourceLabel}) — Abrir en nueva pestaña`}
    >
      <div className={styles.card__iconWrap}>
        <i className="fas fa-images" aria-hidden="true" />
      </div>

      <div className={styles.card__body}>
        <h3 className={styles.card__title}>{photo.name}</h3>
        <span className={styles.card__badge}>{sourceLabel}</span>
      </div>

      <i
        className={`fas fa-external-link-alt ${styles.card__external}`}
        aria-hidden="true"
      />
    </a>
  );
}
