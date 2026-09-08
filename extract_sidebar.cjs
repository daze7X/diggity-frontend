const fs = require('fs');
const file = 'app/products/[main]/[sub]/[slug]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const match = content.match(/<div className="lg:col-span-1 space-y-6 lg:sticky lg:top-32">([\s\S]*?)<\!-- Related Products -->/);
if (match) {
    console.log(match[0]);
} else {
    console.log("Not found with comment, trying just SpotlightCard...");
    const match2 = content.match(/<SpotlightCard className="p-8 border border-glass-border bg-white dark:bg-glass-bg rounded-3xl shadow-2xl">([\s\S]*?)<\/SpotlightCard>/);
    console.log(match2[0]);
}
