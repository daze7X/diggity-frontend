const fs = require('fs');
const file = 'lib/api.ts';
let content = fs.readFileSync(file, 'utf8');

const target = 'is_popular: boolean;\r\n    category?: Category;';
const replacement = 'is_popular: boolean;\r\n    benefits?: any;\r\n    use_cases?: any;\r\n    specifications?: any;\r\n    integrations?: any;\r\n    faq?: any;\r\n    category?: Category;';

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(file, content);
    console.log('Successfully added missing Product properties.');
} else {
    // Try \n just in case
    const target2 = 'is_popular: boolean;\n    category?: Category;';
    const replacement2 = 'is_popular: boolean;\n    benefits?: any;\n    use_cases?: any;\n    specifications?: any;\n    integrations?: any;\n    faq?: any;\n    category?: Category;';
    if (content.includes(target2)) {
        content = content.replace(target2, replacement2);
        fs.writeFileSync(file, content);
        console.log('Successfully added missing Product properties (Unix LF).');
    } else {
        console.log('Target string still not found!');
    }
}
