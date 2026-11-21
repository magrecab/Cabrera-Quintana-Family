import { detectSourceBadge } from '../data/familyData';
import styles from './VideoCard.module.css';

export default function VideoCard({ video }) {
  const sourceLabel = detectSourceBadge(video.link, 'Otro');

  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={`${video.name} (${sourceLabel}) — Abrir en nueva pestaña`}
    >
      <div className={styles.card__iconWrap}>
        <i className="fas fa-play" aria-hidden="true" />
      </div>

      <div className={styles.card__body}>
        <h3 className={styles.card__title}>{video.name}</h3>
        <span className={styles.card__badge}>{sourceLabel}</span>
      </div>

      <i
        className={`fas fa-external-link-alt ${styles.card__external}`}
        aria-hidden="true"
      />
    </a>
  );
}
