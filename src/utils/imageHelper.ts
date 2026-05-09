
/**
 * Global image sanitizer to ensure valid URLs and fallbacks.
 */
export const sanitizeImages = (rawImages: any): string[] => {
  const placeholder = '/placeholder.png';
  
  if (!rawImages || !Array.isArray(rawImages)) {
    return [placeholder];
  }

  const sanitized = rawImages
    .filter(img => typeof img === 'string')
    .map(img => img.trim())
    .filter(img => img.startsWith('http') || img.startsWith('/'));

  return sanitized.length > 0 ? sanitized : [placeholder];
};

export const getPrimaryImage = (images: string[]): string => {
  return images[0] || '/placeholder.png';
};

export const getSecondaryImage = (images: string[]): string | null => {
  return images.length > 1 ? images[1] : null;
};
