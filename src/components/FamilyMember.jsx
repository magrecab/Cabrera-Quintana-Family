import { useEffect, useId, useState } from 'react';
import DocumentCard from './DocumentCard';
import PhotoCard from './PhotoCard';
import VideoCard from './VideoCard';
import styles from './FamilyMember.module.css';

export default function FamilyMember({ member, forceExpand = false }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelId = useId();

  // Si el usuario está buscando texto, expande automáticamente para mostrar coincidencias
  const shouldShowContent = isExpanded || forceExpand;

  useEffect(() => {
    if (forceExpand) {
      setIsExpanded(true);
    }
  }, [forceExpand]);

  const renderItemCard = (item) => {
    if (item.type === 'video') {
      return <VideoCard key={item.id} video={item} />;
    }
    if (item.type === 'photo') {
      return <PhotoCard key={item.id} photo={item} />;
    }
    return <DocumentCard key={item.id} document={item} />;
  };

  return (
    <section
      className={styles.memberCard}
      aria-label={`Perfil de ${member.name}`}
    >
      <div className={styles.memberCard__header}>
        {member.image && (
          <img
            src={member.image}
            alt={member.name}
            className={styles.memberCard__avatar}
            width="76"
            height="76"
            loading="lazy"
          />
        )}

        <div className={styles.memberCard__info}>
          <h3 className={styles.memberCard__name}>{member.name}</h3>
          <p className={styles.memberCard__count}>
            {member.content.length}{' '}
            {member.content.length === 1 ? 'elemento' : 'elementos'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={shouldShowContent}
          aria-controls={panelId}
          aria-label={
            shouldShowContent
              ? `Contraer elementos de ${member.name}`
              : `Expandir elementos de ${member.name}`
          }
          className={styles.memberCard__toggle}
        >
          <span>{shouldShowContent ? 'Ocultar' : 'Ver'}</span>
          <i
            className={`fas fa-chevron-${shouldShowContent ? 'up' : 'down'}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {shouldShowContent && (
        <div id={panelId} className={styles.memberCard__content}>
          {member.content.map(renderItemCard)}
        </div>
      )}
    </section>
  );
}
