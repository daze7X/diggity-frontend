const fs = require('fs');
const file = 'lib/api.ts';
let content = fs.readFileSync(file, 'utf8');

const target = `    checkout: (data: { purchasable_type: 'product' | 'course'; purchasable_id: number }): Promise<any> => fetchAPI('/checkout', {`;
const replacement = `    checkout: (data: { purchasable_type: 'product' | 'course'; purchasable_id: number; pricing_id?: number }): Promise<any> => fetchAPI('/checkout', {`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
console.log("Fixed checkout signature for real");
