const fs = require('fs');
const file = 'app/dashboard/products/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetInterface = `        category?: {
            name: string;
        };
    };`;

const replacementInterface = `        category?: {
            name: string;
        };
    };
    pricing?: {
        id: number;
        name: string;
        pricing_type: string;
        license_type: string;
    };`;

content = content.replace(targetInterface, replacementInterface);

const targetBadge = `{product?.category && (
                                                <span className="inline-block px-2.5 py-0.5 bg-brand-blue/5 border border-brand-blue/15 text-brand-blue text-[10px] font-bold rounded-md uppercase tracking-wider">
                                                    {product.category.name}
                                                </span>
                                            )}`;

const replacementBadge = `{product?.category && (
                                                <span className="inline-block px-2.5 py-0.5 bg-brand-blue/5 border border-brand-blue/15 text-brand-blue text-[10px] font-bold rounded-md uppercase tracking-wider">
                                                    {product.category.name}
                                                </span>
                                            )}
                                            {lic.pricing && (
                                                <span className="inline-block px-2.5 py-0.5 ml-2 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded-md uppercase tracking-wider">
                                                    {lic.pricing.name}
                                                </span>
                                            )}`;

content = content.replace(targetBadge, replacementBadge);

fs.writeFileSync(file, content);
console.log("Updated products page interface and UI");
