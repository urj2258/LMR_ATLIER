/**
 * SKU Generator Utility for LMR Atelier
 *
 * Generates SKU codes based on category/subcategory selection.
 * Format: LMR-{PREFIX}-{NUMBER}
 *
 * Prefix mapping:
 *   Menswear + Formal subcategory → MF
 *   Menswear (general)            → MW
 *   Bridal Edit                   → BR
 *   Wedding Edit                  → WE
 *   Formal Edit                   → FE
 *   Little Ones                   → LO
 *   Women Wear (general)          → WW
 */

/** Map a category (+ optional subcategory) to its two-letter prefix */
export function getSkuPrefix(
    category: string,
    subcategory?: string
): string | null {
    const cat = category.trim().toLowerCase();
    const sub = (subcategory || '').trim().toLowerCase();

    // Subcategory-level matches first
    if (sub === 'formal' || sub === 'formal edit') {
        if (cat === 'menswear') return 'MF';
        return 'FE';
    }
    if (sub === 'bridal edit' || sub === 'bridal') return 'BR';
    if (sub === 'wedding edit' || sub === 'wedding') return 'WE';

    // Category-level matches (when the "category" dropdown value IS the
    // subcategory — which is how AddProductClient works before submit)
    if (cat === 'bridal edit' || cat === 'bridal') return 'BR';
    if (cat === 'wedding edit' || cat === 'wedding') return 'WE';
    if (cat === 'formal edit') return 'FE';

    if (cat === 'menswear') return 'MW';
    if (cat === 'women wear' || cat === 'womenwear') return 'WW';
    if (cat === 'little ones') return 'LO';

    return null;
}

/** Pad a number to 3 digits, e.g. 1 → "001" */
function pad(n: number): string {
    return String(n).padStart(3, '0');
}

/**
 * Count how many existing products share the given SKU prefix and return
 * the next number.
 *
 * @param prefix  Two-letter prefix (e.g. "MF")
 * @param existingSkus  Array of already-used SKU strings
 * @returns  The next sequential number (at least 1)
 */
export function getNextSkuNumber(prefix: string, existingSkus: string[]): number {
    const re = new RegExp(`^LMR-${prefix}-(\\d+)$`, 'i');
    let max = 0;
    for (const sku of existingSkus) {
        const m = sku.match(re);
        if (m) {
            const n = parseInt(m[1], 10);
            if (n > max) max = n;
        }
    }
    return max + 1;
}

/**
 * Generate a full SKU string.
 *
 * @param category     Main category name
 * @param subcategory  Optional subcategory name
 * @param existingSkus Array of already-used SKU strings for numbering
 * @returns  e.g. "LMR-BR-003" or null if category is unknown
 */
export function generateSku(
    category: string,
    subcategory?: string,
    existingSkus: string[] = []
): string | null {
    const prefix = getSkuPrefix(category, subcategory);
    if (!prefix) return null;

    const num = getNextSkuNumber(prefix, existingSkus);
    return `LMR-${prefix}-${pad(num)}`;
}
