const fs = require('fs');
const file = 'app/dashboard/products/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace("file_path: string | null;", "file_path: string | null;\n        gallery?: string[];");

fs.writeFileSync(file, content);
console.log("Updated UserProductLicense interface with gallery");
