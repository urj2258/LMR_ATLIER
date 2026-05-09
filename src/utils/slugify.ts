
/**
 * Canonical slugify function shared across the application.
 * Handles normalization, dashes (en/em), and special characters.
 */
export const slugify = (text: string): string => {
  if (!text) return "";
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[–—]/g, "-") // Convert en-dash and em-dash to hyphen
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-|-$/g, ""); // Trim hyphens from ends
};
