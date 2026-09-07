const fs = require('fs');
const file = 'lib/api.ts';
let content = fs.readFileSync(file, 'utf8');

const target1 = "checkout: (data: { purchasable_type: 'product' | 'course'; purchasable_id: number }): Promise<any> => fetchAPI('/checkout', {\r\n        method: 'POST',\r\n        body: JSON.stringify(data),\r\n    })";
const target2 = "checkout: (data: { purchasable_type: 'product' | 'course'; purchasable_id: number }): Promise<any> => fetchAPI('/checkout', {\n        method: 'POST',\n        body: JSON.stringify(data),\n    })";

const replacement = `    downloadProduct: async (id: number, filename: string): Promise<void> => {
        const token = getCookie('token');
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = \`Bearer \${token}\`;

        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
        const res = await fetch(\`\${API_BASE}/products/\${id}/download\`, {
            method: 'GET',
            headers
        });

        if (!res.ok) {
            let errorMessage = 'Gagal mengunduh file.';
            try {
                const data = await res.json();
                if (data.message) errorMessage = data.message;
            } catch (e) {}
            throw new Error(errorMessage);
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    },

    checkout: (data: { purchasable_type: 'product' | 'course'; purchasable_id: number }): Promise<any> => fetchAPI('/checkout', {
        method: 'POST',
        body: JSON.stringify(data),
    })`;

if (content.includes(target1)) {
    content = content.replace(target1, replacement);
    fs.writeFileSync(file, content);
    console.log('Success CRLF');
} else if (content.includes(target2)) {
    content = content.replace(target2, replacement);
    fs.writeFileSync(file, content);
    console.log('Success LF');
} else {
    console.log('Could not find checkout signature.');
}
