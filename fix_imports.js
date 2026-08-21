const fs = require('fs');

const importStr = "import { useLanguage } from '../context/LanguageContext';";
const hookStr = "    const { language } = useLanguage();";

function injectHook(filepath, componentName) {
    let content = fs.readFileSync(filepath, 'utf-8');
    if (!content.includes('useLanguage')) {
        // Add import after last import
        const lines = content.split('\n');
        const lastImportIndex = lines.findLastIndex(line => line.startsWith('import '));
        if (lastImportIndex !== -1) {
            lines.splice(lastImportIndex + 1, 0, importStr);
        } else {
            lines.unshift(importStr);
        }
        
        // Find component definition
        const compDefRegex = new RegExp((export default function \\([^)]*\\)\\s*\\{));
        const match = content.match(compDefRegex);
        if (match) {
            content = lines.join('\n'); // join first to apply import
            content = content.replace(match[1], match[1] + '\n' + hookStr);
        } else {
            // Try matching arrow function
            const arrowRegex = new RegExp((const  = \\([^)]*\\) => \\{));
            const arrowMatch = content.match(arrowRegex);
            if (arrowMatch) {
                content = lines.join('\n');
                content = content.replace(arrowMatch[1], arrowMatch[1] + '\n' + hookStr);
            }
        }
        fs.writeFileSync(filepath, content, 'utf-8');
    }
}

injectHook('components/ProductPurchaseCTA.tsx', 'ProductPurchaseCTA');
injectHook('components/SearchOverlay.tsx', 'SearchOverlay');
injectHook('components/TalentRegistrationForm.tsx', 'TalentRegistrationForm');
injectHook('components/WhatsAppButton.tsx', 'WhatsAppButton');
console.log('Fixed imports');
