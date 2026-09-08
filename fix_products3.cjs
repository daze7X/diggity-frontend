const fs = require('fs');
const file = 'app/dashboard/products/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Interface
content = content.replace("category?: {", "category?: {\n            slug: string;\n            parent?: {\n                slug: string;\n            }");
content = content.replace("file_path: string | null;", "slug: string;\n        file_path: string | null;\n        gallery?: string[];");
const targetInterface = `        category?: {
            slug: string;
            parent?: {
                slug: string;
            }
            name: string;
        };
    };`;
const replacementInterface = targetInterface + `\n    pricing?: {\n        id: number;\n        name: string;\n    };`;
content = content.replace(targetInterface, replacementInterface);

// 2. Badges
const targetBadge = `{product?.category && (
                                                <span className="inline-block px-2.5 py-0.5 bg-brand-blue/5 border border-brand-blue/15 text-brand-blue text-[10px] font-bold rounded-md uppercase tracking-wider">
                                                    {product.category.name}
                                                </span>
                                            )}`;
const replacementBadge = targetBadge + `\n                                            {lic.pricing && (
                                                <span className="inline-block px-2.5 py-0.5 ml-2 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded-md uppercase tracking-wider">
                                                    {lic.pricing.name}
                                                </span>
                                            )}`;
content = content.replace(targetBadge, replacementBadge);

// 3. Name Link
const targetName = `<h3 className="text-lg md:text-xl font-bold text-text-main leading-snug">
                                                {product?.name || (locale === 'en' ? 'Custom Product' : 'Produk Kustom')} {product?.version && \`v\${product.version}\`}
                                            </h3>`;
const replacementName = `{product && product.category && product.slug ? (
                                                <Link href={\`/products/\${product.category.parent ? product.category.parent.slug : product.category.slug}/\${product.category.parent ? product.category.slug : ''}/\${product.slug}\`.replace(/\\/\\//g, '/')} className="group/link">
                                                    <h3 className="text-lg md:text-xl font-bold text-text-main leading-snug group-hover/link:text-brand-blue transition-colors flex items-center gap-2">
                                                        {product.name} {product.version && \`v\${product.version}\`}
                                                    </h3>
                                                </Link>
                                            ) : (
                                                <h3 className="text-lg md:text-xl font-bold text-text-main leading-snug">
                                                    {product?.name || (locale === 'en' ? 'Custom Product' : 'Produk Kustom')} {product?.version && \`v\${product.version}\`}
                                                </h3>
                                            )}`;
content = content.replace(targetName, replacementName);

// 4. Image Thumbnail
const targetDiv = `<div className="space-y-3.5 text-left max-w-xl">`;
const replacementDiv = `<div className="flex gap-4 items-start max-w-xl">
                                        {product?.gallery && product.gallery.length > 0 && (
                                            <div className="hidden sm:block w-24 h-24 shrink-0 bg-neutral-900 rounded-xl overflow-hidden border border-glass-border">
                                                <img src={product.gallery[0].replace('public/', '/storage/')} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div className="space-y-3.5 text-left flex-1">`;
content = content.replace(targetDiv, replacementDiv);

// Close the flex div we just opened, before License Key Box
content = content.replace(/<\/div>\s*\{\/\* License Key Box \*\/\}/g, `</div></div>\n                                    {/* License Key Box */}`);

fs.writeFileSync(file, content);
console.log("Updated My Products successfully");
