
import { addCategory, getCategories } from '../src/utils/db.js';

const initialCategories = [
    { name: 'Bridal Edit', slug: 'bridal', order: 1 },
    { name: 'Wedding Edit', slug: 'wedding', order: 2 },
    { name: 'Formal Edit', slug: 'formal', order: 3 },
    { name: 'Menswear', slug: 'menswear', order: 4 },
    { name: 'Little Ones', slug: 'little-ones', order: 5 },
];

async function seedCategories() {
    console.log("Seeding categories...");

    try {
        const existing = await getCategories();
        if (existing.length > 0) {
            console.log("Categories already exist. Skipping seed.");
            return;
        }

        for (const cat of initialCategories) {
            const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
            await addCategory({
                id,
                name: cat.name,
                slug: cat.slug,
                order: cat.order,
                createdAt: new Date().toISOString()
            });
            console.log(`Added category: ${cat.name}`);
        }

        console.log("Seeding complete!");
    } catch (error) {
        console.error("Seeding failed:", error);
    }
}

seedCategories();
