const fs = require('fs');
const file = 'app/dashboard/products/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetNameHeader = `<h3 className="text-lg md:text-xl font-bold text-text-main leading-snug">
                                                {product?.name || (locale === 'en' ? 'Custom Product' : 'Produk Kustom')} {product?.version && \`v\${product.version}\`}
                                            </h3>`;

const replacementNameHeader = `
                                            {product && product.category ? (
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

content = content.replace(targetNameHeader, replacementNameHeader);

// I will also add image handling. Wait, where does the image go? We can add a thumbnail to the left.
const targetMainDiv = `<div className="space-y-1 md:space-y-2">`;
const replacementMainDiv = `{product?.gallery && product.gallery.length > 0 && (
                                            <div className="hidden sm:block w-20 h-20 shrink-0 bg-neutral-900 rounded-xl overflow-hidden border border-glass-border">
                                                <img src={product.gallery[0]} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div className="space-y-1 md:space-y-2 flex-1">`;

const targetFlexDiv = `<div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                                    <div className="space-y-1 md:space-y-2">`;

const replacementFlexDiv = `<div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                                    <div className="flex gap-4 items-start flex-1">
                                        {product?.gallery && product.gallery.length > 0 && (
                                            <div className="hidden sm:block w-24 h-24 shrink-0 bg-neutral-900 rounded-xl overflow-hidden border border-glass-border">
                                                <img src={product.gallery[0].replace('public/', '/storage/')} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div className="space-y-1 md:space-y-2 flex-1">`;

content = content.replace(targetFlexDiv, replacementFlexDiv);
content = content.replace(/<\/div>\s*\{\/\* License Key Box \*\/\}/g, `</div></div>\n                                    {/* License Key Box */}`);

fs.writeFileSync(file, content);
console.log("Updated products page with links and images");
