const fs = require('fs');
const file = 'app/dashboard/orders/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetInterface = `interface OrderItem {
    id: number;
    purchasable_type: string;
    price: string;
    product?: {
        name: string;
    };
    course?: {
        title: string;
    };
}`;

const replacementInterface = `interface OrderItem {
    id: number;
    purchasable_type: string;
    price: string;
    purchasable?: {
        name?: string;
        title?: string;
    };
    pricing?: {
        name: string;
    };
}`;

content = content.replace(targetInterface, replacementInterface);

const targetItemName = `const itemName = item.product?.name || item.course?.title || (locale === 'en' ? 'Digital Product' : 'Produk Digital');`;
const replacementItemName = `const itemName = item.purchasable?.name || item.purchasable?.title || (locale === 'en' ? 'Digital Product' : 'Produk Digital');`;

content = content.replace(targetItemName, replacementItemName);

const targetItemRender = `<span>{itemName}</span>`;
const replacementItemRender = `<span className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                                        <span>{itemName}</span>
                                                        {item.pricing && (
                                                            <span className="inline-block px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[9px] font-bold rounded uppercase tracking-wider w-fit">
                                                                {item.pricing.name}
                                                            </span>
                                                        )}
                                                    </span>`;

content = content.replace(targetItemRender, replacementItemRender);

fs.writeFileSync(file, content);
console.log("Updated orders page UI");
