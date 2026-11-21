import styles from './Header.module.css';

const HEADER_AVATAR_URL =
  'https://static.wixstatic.com/media/97f0fd_5545902736d54159891f5ccd1cd25554~mv2.jpg';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <img
          src={HEADER_AVATAR_URL}
          alt="Familia Cabrera Quintana"
          className={styles.header__avatar}
          width="80"
          height="80"
          loading="eager"
        />
        <div>
          <h1 className={styles.header__title}>Cabrera Quintana Family</h1>
          <p className={styles.header__subtitle}>
            Archivo Digital Familiar — Documentos, Fotos y Videos
          </p>
        </div>
      </div>
    </header>
  );
}
