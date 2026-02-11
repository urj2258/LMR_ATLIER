const fs = require('fs');
const path = require('path');

const placeholderSource = 'd:/shop_stichin_website/LMR-ATLIER/frontend/public/images/placeholders/placeholder.png';
const targetDir = 'd:/shop_stichin_website/LMR-ATLIER/frontend/public/images/placeholders';

// Categories and counts based on products.ts
const categories = [
    { prefix: 'bridal', start: 1, end: 25 },
    { prefix: 'wedding', start: 1, end: 25 },
    { prefix: 'formal', start: 1, end: 4 },
    { prefix: 'mens', start: 1, end: 3 },
    { prefix: 'kids', start: 1, end: 2 }
];

categories.forEach(cat => {
    for (let i = cat.start; i <= cat.end; i++) {
        for (let j = 1; j <= 4; j++) {
            const filename = `${cat.prefix}_${i}_${j}.png`;
            const destPath = path.join(targetDir, filename);
            fs.copyFileSync(placeholderSource, destPath);
            console.log(`Created ${filename}`);
        }
    }
});
console.log('All placeholders created successfully.');
