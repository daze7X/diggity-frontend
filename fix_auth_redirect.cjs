const fs = require('fs');
const file = 'components/ProductPricingWidget.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetLogin = "router.push(`/login?redirect=/products/${product.slug}`);";
const replacementLogin = "const target = selectedPricing ? `/products/${product.slug}?pricing_id=${selectedPricing.id}` : `/products/${product.slug}`;\n            router.push(`/login?redirect=${encodeURIComponent(target)}`);";

// There are two handleCheckout and handleDownload. We'll replace globally.
content = content.replace(new RegExp(targetLogin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacementLogin);

fs.writeFileSync(file, content);
console.log("Updated redirect to preserve pricing_id");
