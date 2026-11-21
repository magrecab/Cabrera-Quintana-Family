import { useCallback, useMemo, useState } from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import SearchBar from './components/SearchBar';
import DocumentCard from './components/DocumentCard';
import PhotoCard from './components/PhotoCard';
import VideoCard from './components/VideoCard';
import FamilyMember from './components/FamilyMember';
import { familyData } from './data/familyData';

export default function App() {
  const [selectedSection, setSelectedSection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDebouncedSearch = useCallback((term) => {
    setSearchQuery(term.trim().toLowerCase());
  }, []);

  const matchesQuery = useCallback(
    (name) => {
      if (!searchQuery) return true;
      return name.toLowerCase().includes(searchQuery);
    },
    [searchQuery]
  );

  const filteredDocuments = useMemo(
    () => familyData.documents.filter((item) => matchesQuery(item.name)),
    [matchesQuery]
  );

  const filteredPhotos = useMemo(
    () => familyData.photos.filter((item) => matchesQuery(item.name)),
    [matchesQuery]
  );

  const filteredVideos = useMemo(
    () => familyData.videos.filter((item) => matchesQuery(item.name)),
    [matchesQuery]
  );

  const filteredSammy = useMemo(
    () => ({
      ...familyData.sammy,
      content: familyData.sammy.content.filter((item) => matchesQuery(item.name)),
    }),
    [matchesQuery]
  );

  const filteredMariaCami = useMemo(
    () => ({
      ...familyData.mariaCami,
      content: familyData.mariaCami.content.filter((item) => matchesQuery(item.name)),
    }),
    [matchesQuery]
  );

  const showDocuments =
    (selectedSection === 'all' || selectedSection === 'documents') &&
    filteredDocuments.length > 0;

  const showPhotos =
    (selectedSection === 'all' || selectedSection === 'photos') &&
    filteredPhotos.length > 0;

  const showVideos =
    (selectedSection === 'all' || selectedSection === 'videos') &&
    filteredVideos.length > 0;

  const showFamily =
    (selectedSection === 'all' || selectedSection === 'family') &&
    (filteredSammy.content.length > 0 || filteredMariaCami.content.length > 0);

  const hasAnyVisibleResults =
    showDocuments || showPhotos || showVideos || showFamily;

  const handleResetFilters = () => {
    setSelectedSection('all');
    setSearchQuery('');
  };

  return (
    <div className="appShell">
      <Header />

      <main className="mainContainer">
        <div className="controlsBar">
          <Filters
            selectedSection={selectedSection}
            onSelectSection={setSelectedSection}
          />
          <SearchBar value={searchQuery} onDebouncedChange={handleDebouncedSearch} />
        </div>

        {showDocuments && (
          <section className="sectionBlock" aria-labelledby="heading-documents">
            <h2 id="heading-documents" className="sectionHeading">
              Documentos ({filteredDocuments.length})
            </h2>
            <div className="cardsGrid">
              {filteredDocuments.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          </section>
        )}

        {showPhotos && (
          <section className="sectionBlock" aria-labelledby="heading-photos">
            <h2 id="heading-photos" className="sectionHeading">
              Fotos ({filteredPhotos.length})
            </h2>
            <div className="cardsGrid">
              {filteredPhotos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          </section>
        )}

        {showVideos && (
          <section className="sectionBlock" aria-labelledby="heading-videos">
            <h2 id="heading-videos" className="sectionHeading">
              Videos Familiares ({filteredVideos.length})
            </h2>
            <div className="cardsGrid">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        )}

        {showFamily && (
          <section className="sectionBlock" aria-labelledby="heading-family">
            <h2 id="heading-family" className="sectionHeading">
              Sammy y Camy
            </h2>
            <div className="familyMembersList">
              {filteredSammy.content.length > 0 && (
                <FamilyMember
                  member={filteredSammy}
                  forceExpand={Boolean(searchQuery)}
                />
              )}
              {filteredMariaCami.content.length > 0 && (
                <FamilyMember
                  member={filteredMariaCami}
                  forceExpand={Boolean(searchQuery)}
                />
              )}
            </div>
          </section>
        )}

        {!hasAnyVisibleResults && (
          <div className="emptyState" role="status" aria-live="polite">
            <p className="emptyState__title">
              No se encontraron elementos con ese filtro o búsqueda.
            </p>
            <p className="emptyState__text">
              Prueba con otro término o restablece los filtros activos.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="emptyState__btn"
            >
              Mostrar todo el archivo
            </button>
          </div>
        )}
      </main>

      <footer className="footerNote">
        Cabrera Quintana Family — Índice de enlaces a Google Drive, Google Photos y YouTube.
      </footer>
    </div>
  );
}
