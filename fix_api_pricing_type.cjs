const fs = require('fs');
const file = 'lib/api.ts';
let content = fs.readFileSync(file, 'utf8');

const target = `    discount_percentage?: number;`;
const replacement = `    discount_percentage?: number;
    original_price?: number;`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
console.log("Added original_price to Pricing type");
