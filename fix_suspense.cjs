const fs = require('fs');
const file = 'app/products/[main]/[sub]/[slug]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = "<ProductPricingWidget product={product} locale={locale} />";
const replacement = "<React.Suspense fallback={<div className=\"animate-pulse h-[300px] bg-slate-100 dark:bg-slate-800 rounded-xl\"></div>}><ProductPricingWidget product={product} locale={locale} /></React.Suspense>";

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
console.log("Wrapped with Suspense");
