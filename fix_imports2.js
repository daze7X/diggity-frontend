const fs = require('fs');

const importStr = "import { useLanguage } from '../context/LanguageContext';";
const hookStr = "    const { language } = useLanguage();";

function injectHook(filepath, componentName) {
    let content = fs.readFileSync(filepath, 'utf-8');
    if (!content.includes('useLanguage')) {
        const lines = content.split('\n');
        const lastImportIndex = lines.findLastIndex(line => line.startsWith('import '));
        if (lastImportIndex !== -1) {
            lines.splice(lastImportIndex + 1, 0, importStr);
        } else {
            lines.unshift(importStr);
        }
        
        let newContent = lines.join('\n');
        newContent = newContent.replace(
            new RegExp('(export default function ' + componentName + '\\([^)]*\\)\\s*\\{)'),
            '\n' + hookStr
        );
        newContent = newContent.replace(
            new RegExp('(const ' + componentName + '\\s*=\\s*\\([^)]*\\)\\s*=>\\s*\\{)'),
            '\n' + hookStr
        );
        fs.writeFileSync(filepath, newContent, 'utf-8');
    }
}

injectHook('components/ProductPurchaseCTA.tsx', 'ProductPurchaseCTA');
injectHook('components/SearchOverlay.tsx', 'SearchOverlay');
injectHook('components/TalentRegistrationForm.tsx', 'TalentRegistrationForm');
injectHook('components/WhatsAppButton.tsx', 'WhatsAppButton');
console.log('Fixed imports');
