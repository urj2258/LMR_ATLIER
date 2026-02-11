
import { getCategories } from './src/utils/db';

async function check() {
    try {
        const cats = await getCategories();
        console.log('--- CATEGORIES IN DB ---');
        console.log(JSON.stringify(cats, null, 2));
    } catch (e) {
        console.error(e);
    }
}

check();
