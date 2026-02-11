
import * as admin from 'firebase-admin';

const initializeAdmin = () => {
    if (admin.apps.length > 0) return admin.apps[0];

    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
        console.warn('Firebase Admin SDK: Missing credentials (FIREBASE_CLIENT_EMAIL or FIREBASE_PRIVATE_KEY). Falling back to Web SDK might be necessary for local development.');
        return null;
    }

    try {
        return admin.initializeApp({
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                privateKey: privateKey.replace(/\\n/g, '\n'),
            }),
        });
    } catch (error) {
        console.error('Firebase admin initialization error:', error);
        return null;
    }
};

const adminApp = initializeAdmin();

export const adminDb = adminApp ? adminApp.firestore() : null;
export const adminAuth = adminApp ? adminApp.auth() : null;

export { adminApp };
