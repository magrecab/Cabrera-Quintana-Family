import rawFamilyData from './familyData.json';

// Verifica que una URL sea segura (protocolo http/https)
function isSafeUrl(url) {
  if (typeof url !== 'string' || !url.trim()) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

// Detecta el origen legible del enlace para mostrar el badge correspondiente
export function detectSourceBadge(link, fallbackLabel = 'Otro') {
  const normalized = (link || '').toLowerCase();
  if (normalized.includes('drive.google.com') || normalized.includes('docs.google.com')) {
    return 'Google Drive';
  }
  if (normalized.includes('photos.app.goo.gl') || normalized.includes('photos.google.com')) {
    return 'Google Photos';
  }
  if (normalized.includes('youtube.com') || normalized.includes('youtu.be')) {
    return 'YouTube';
  }
  return fallbackLabel;
}

// Normaliza y valida un arreglo de ítems (documentos, fotos o videos)
function sanitizeItems(items, expectedType) {
  if (!Array.isArray(items)) return [];

  return items
    .filter(
      (item) =>
        item &&
        typeof item.name === 'string' &&
        item.name.trim().length > 0 &&
        isSafeUrl(item.link)
    )
    .map((item, idx) => ({
      id: `${expectedType}-${idx}-${item.name.trim().toLowerCase().replace(/\s+/g, '-')}`,
      name: item.name.trim(),
      link: item.link.trim(),
      type: item.type || expectedType,
    }));
}

// Normaliza el perfil de un miembro familiar (Sammy o Maria Cami)
function sanitizeMember(member, fallbackName) {
  const safeMember = member && typeof member === 'object' ? member : {};
  const rawContent = Array.isArray(safeMember.content) ? safeMember.content : [];

  const content = rawContent
    .filter(
      (item) =>
        item &&
        typeof item.name === 'string' &&
        item.name.trim().length > 0 &&
        isSafeUrl(item.link)
    )
    .map((item, idx) => ({
      id: `member-${fallbackName.toLowerCase().replace(/\s+/g, '-')}-${idx}`,
      name: item.name.trim(),
      link: item.link.trim(),
      type: item.type === 'video' ? 'video' : item.type === 'photo' ? 'photo' : 'document',
    }));

  return {
    name: typeof safeMember.name === 'string' && safeMember.name.trim() ? safeMember.name.trim() : fallbackName,
    image: isSafeUrl(safeMember.image) ? safeMember.image.trim() : '',
    content,
  };
}

// Estructura validada y lista para consumir en la aplicación
export const familyData = {
  documents: sanitizeItems(rawFamilyData.documents, 'document'),
  photos: sanitizeItems(rawFamilyData.photos, 'photo'),
  videos: sanitizeItems(rawFamilyData.videos, 'video'),
  sammy: sanitizeMember(rawFamilyData.sammy, 'Sammy'),
  mariaCami: sanitizeMember(rawFamilyData.mariaCami, 'Maria Cami'),
};
