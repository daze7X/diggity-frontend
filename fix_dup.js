const fs = require('fs');
const file = 'lib/api.ts';
let content = fs.readFileSync(file, 'utf8');

const strToFind = "    downloadProduct: async (id: number, filename: string): Promise<void> => {\r\n        const token = getCookie('auth_token');";
const strToFindLF = "    downloadProduct: async (id: number, filename: string): Promise<void> => {\n        const token = getCookie('auth_token');";

let idx = content.indexOf(strToFind);
if (idx === -1) idx = content.indexOf(strToFindLF);

if (idx !== -1) {
    const endStr = "window.URL.revokeObjectURL(url);\r\n    },";
    const endStrLF = "window.URL.revokeObjectURL(url);\n    },";
    let endIdx = content.indexOf(endStr, idx);
    let endLength = endStr.length;
    if (endIdx === -1) {
        endIdx = content.indexOf(endStrLF, idx);
        endLength = endStrLF.length;
    }
    
    if (endIdx !== -1) {
        content = content.substring(0, idx) + content.substring(endIdx + endLength);
        fs.writeFileSync(file, content);
        console.log("Successfully removed duplicate");
    } else {
        console.log("Could not find end string");
    }
} else {
    console.log("Could not find start string");
}
