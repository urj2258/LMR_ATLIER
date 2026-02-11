
import { readFileSync } from 'fs';
import { join } from 'path';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCWTG0fV7X3c1sTIm7aEkajCKzv85kCSeA",
    authDomain: "lmr-atlier-b76c7.firebaseapp.com",
    projectId: "lmr-atlier-b76c7",
    messagingSenderId: "256313357771",
    appId: "1:256313357771:web:1aad55a38f1cc9ae08324e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
    console.log("Starting migration...");
    const dbPath = join(process.cwd(), 'src/data/db.json');
    const data = JSON.parse(readFileSync(dbPath, 'utf-8'));

    console.log(`Migrating ${data.products.length} products...`);
    for (const item of data.products) {
        await setDoc(doc(db, 'products', item.id), item);
    }

    console.log(`Migrating ${data.subscribers.length} subscribers...`);
    for (const item of data.subscribers) {
        await setDoc(doc(db, 'subscribers', item.id), item);
    }

    console.log(`Migrating ${data.inquiries.length} inquiries...`);
    for (const item of data.inquiries) {
        await setDoc(doc(db, 'inquiries', item.id), item);
    }

    console.log("Migration complete!");
    process.exit(0);
}

migrate().catch(err => {
    console.error("Migration failed:", err);
    process.exit(1);
});
