
import { adminDb } from '@/lib/firebaseAdmin';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, query, where, deleteDoc, limit } from 'firebase/firestore';

export interface Category {
    id: string;
    name: string;
    slug: string;
    order: number;
    createdAt: string;
    mainCategory?: string;
}

export interface Product {
    id: string;
    slug: string;
    title: string;
    category: string; // Relaxed from union to string for dynamic categories
    price: string;
    images: string[];
    description: string;
    color: string;
    fabric: string;
    details: string;
    sku?: string;
    sizeChart?: string;
    measurementGuide?: string;
    deliveryTime?: string;
    shipping?: string;
    customization?: string;
    priceInfo?: string;
    subcategory?: string;
}

export interface Subscriber {
    id: string;
    name: string;
    email: string;
    date: string;
}

export interface Inquiry {
    id: string;
    productName: string;
    productCategory: string;
    customerName: string;
    customerContact: string;
    message: string;
    date: string;
    status: 'New' | 'Contacted' | 'Closed';
}

export interface Database {
    products: Product[];
    subscribers: Subscriber[];
    inquiries: Inquiry[];
    categories: Category[];
}

/**
 * @deprecated Use granular functions instead (getProducts, getInquiries, etc.)
 */
export async function readDb(): Promise<Database> {
    console.warn("DEPRECATED: readDb() fetches all collections and is slow. Use granular functions.");
    try {
        const [products, subscribers, inquiries, categories] = await Promise.all([
            getProducts(),
            getSubscribers(),
            getInquiries(),
            getCategories()
        ]);

        return { products, subscribers, inquiries, categories };
    } catch (error) {
        console.error("Error reading from Firestore:", error);
        return { products: [], subscribers: [], inquiries: [], categories: [] };
    }
}

// Granular Read Functions with Fallback
export async function getProducts(): Promise<Product[]> {
    if (adminDb) {
        const snap = await adminDb.collection('products').get();
        return snap.docs.map(doc => doc.data() as Product);
    }
    const snap = await getDocs(collection(db, 'products'));
    return snap.docs.map(doc => doc.data() as Product);
}

export async function getCategories(): Promise<Category[]> {
    if (adminDb) {
        const snap = await adminDb.collection('categories').orderBy('order', 'asc').get();
        return snap.docs.map(doc => doc.data() as Category);
    }
    const snap = await getDocs(collection(db, 'categories'));
    return snap.docs.map(doc => doc.data() as Category).sort((a, b) => a.order - b.order);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    if (adminDb) {
        const snap = await adminDb.collection('products').where('category', '==', category).get();
        // Filter out products that have a subcategory - only show main category products
        return snap.docs.map(doc => doc.data() as Product).filter(p => !p.subcategory || p.subcategory === '');
    }
    const q = query(collection(db, 'products'), where('category', '==', category));
    const snap = await getDocs(q);
    // Filter out products that have a subcategory - only show main category products
    return snap.docs.map(doc => doc.data() as Product).filter(p => !p.subcategory || p.subcategory === '');
}

export async function getProductsBySubcategory(category: string, subcategory: string, limitCount?: number): Promise<Product[]> {
    if (adminDb) {
        let queryRef = adminDb.collection('products')
            .where('category', '==', category)
            .where('subcategory', '==', subcategory);

        if (limitCount) {
            queryRef = queryRef.limit(limitCount);
        }

        const snap = await queryRef.get();
        return snap.docs.map(doc => doc.data() as Product);
    }

    let q = query(
        collection(db, 'products'),
        where('category', '==', category),
        where('subcategory', '==', subcategory)
    );

    if (limitCount) {
        q = query(q, limit(limitCount));
    }

    const snap = await getDocs(q);
    return snap.docs.map(doc => doc.data() as Product);
}


// Get ALL products in a category, INCLUDING subcategories (for category pages like /menswear)
export async function getAllProductsByCategory(category: string): Promise<Product[]> {
    if (adminDb) {
        const snap = await adminDb.collection('products').where('category', '==', category).get();
        return snap.docs.map(doc => doc.data() as Product);
    }
    const q = query(collection(db, 'products'), where('category', '==', category));
    const snap = await getDocs(q);
    return snap.docs.map(doc => doc.data() as Product);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    if (adminDb) {
        const snap = await adminDb.collection('products').where('slug', '==', slug).limit(1).get();
        if (snap.empty) return null;
        return snap.docs[0].data() as Product;
    }
    const q = query(collection(db, 'products'), where('slug', '==', slug), limit(1));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return snap.docs[0].data() as Product;
}

export async function getSubscribers(): Promise<Subscriber[]> {
    if (adminDb) {
        const snap = await adminDb.collection('subscribers').get();
        return snap.docs.map(doc => doc.data() as Subscriber);
    }
    const snap = await getDocs(collection(db, 'subscribers'));
    return snap.docs.map(doc => doc.data() as Subscriber);
}

export async function getInquiries(): Promise<Inquiry[]> {
    if (adminDb) {
        const snap = await adminDb.collection('inquiries').get();
        return snap.docs.map(doc => doc.data() as Inquiry);
    }
    const snap = await getDocs(collection(db, 'inquiries'));
    return snap.docs.map(doc => doc.data() as Inquiry);
}

// Optimized Checkers
export async function isAlreadySubscribed(email: string): Promise<boolean> {
    if (adminDb) {
        const snap = await adminDb.collection('subscribers').where('email', '==', email).get();
        return !snap.empty;
    }
    const q = query(collection(db, 'subscribers'), where('email', '==', email), limit(1));
    const snap = await getDocs(q);
    return !snap.empty;
}

/**
 * @deprecated Use targeted functions instead (addProduct, addInquiry, etc.)
 */
export async function writeDb(data: Database): Promise<void> {
    console.warn("DEPRECATED: writeDb() overwrites entire collections and is slow. Use targeted functions.");
    try {
        await Promise.all([
            ...data.products.map(p => addProduct(p)),
            ...data.subscribers.map(s => addSubscriber(s)),
            ...data.inquiries.map(i => addInquiry(i)),
            ...data.categories.map(c => addCategory(c))
        ]);
    } catch (error) {
        console.error("Error writing to Firestore:", error);
    }
}

// Targeted Write Functions with Fallback
export async function addProduct(product: Product): Promise<void> {
    if (adminDb) {
        await adminDb.collection('products').doc(product.id).set(product);
    } else {
        await setDoc(doc(db, 'products', product.id), product);
    }
}

export async function addCategory(category: Category): Promise<void> {
    if (adminDb) {
        await adminDb.collection('categories').doc(category.id).set(category);
    } else {
        await setDoc(doc(db, 'categories', category.id), category);
    }
}

export async function addSubscriber(subscriber: Subscriber): Promise<void> {
    if (adminDb) {
        await adminDb.collection('admin_subscribers').doc(subscriber.id).set(subscriber);
    } else {
        await setDoc(doc(db, 'subscribers', subscriber.id), subscriber);
    }
}

export async function addInquiry(inquiry: Inquiry): Promise<void> {
    if (adminDb) {
        await adminDb.collection('inquiries').doc(inquiry.id).set(inquiry);
    } else {
        await setDoc(doc(db, 'inquiries', inquiry.id), inquiry);
    }
}

export async function deleteProduct(id: string): Promise<void> {
    if (adminDb) {
        await adminDb.collection('products').doc(id).delete();
    } else {
        await deleteDoc(doc(db, 'products', id));
    }
}

export async function deleteCategory(id: string): Promise<void> {
    if (adminDb) {
        await adminDb.collection('categories').doc(id).delete();
    } else {
        await deleteDoc(doc(db, 'categories', id));
    }
}
