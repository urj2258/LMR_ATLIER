
import { products } from '../src/data/products';
import fs from 'fs';
import path from 'path';

const db = {
    products: products,
    subscribers: [],
    inquiries: []
};

const dbPath = path.join(process.cwd(), 'src/data/db.json');

try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log(`Database seeded successfully at ${dbPath}`);
    console.log(`Total Products: ${products.length}`);
} catch (error) {
    console.error('Error seeding database:', error);
}
