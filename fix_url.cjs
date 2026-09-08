const fs = require('fs');
const file = 'app/dashboard/products/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetLink = `href={\`/products/\${product.category.parent ? product.category.parent.slug : product.category.slug}/\${product.category.parent ? product.category.slug : ''}/\${product.slug}\`.replace(/\\/\\//g, '/')}`;

const replacementLink = `href={\`/products/\${product.category.parent ? product.category.parent.slug : 'digital-marketplace'}/\${product.category.slug}/\${product.slug}\`}`;

content = content.replace(targetLink, replacementLink);
fs.writeFileSync(file, content);
console.log("Updated My Products URL scheme to match Task 6");
