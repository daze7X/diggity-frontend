const fs = require('fs');
const file = 'components/ProductPricingWidget.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace via regex
content = content.replace(/import \{ useRouter \} from 'next\/navigation';/, "import { useRouter, useSearchParams } from 'next/navigation';");
content = content.replace(/const \[selectedPricing, setSelectedPricing\] = useState<Pricing \| null>\(pricings\.length > 0 \? pricings\[0\] : null\);/, 
    `const searchParams = useSearchParams();
    const [selectedPricing, setSelectedPricing] = useState<Pricing | null>(() => {
        const idFromUrl = searchParams.get('pricing_id');
        if (idFromUrl) {
            const found = pricings.find(p => p.id.toString() === idFromUrl);
            if (found) return found;
        }
        return pricings.length > 0 ? pricings[0] : null;
    });`);

fs.writeFileSync(file, content);
console.log("Updated ProductPricingWidget via Regex");
