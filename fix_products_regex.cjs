const fs = require('fs');
const file = 'app/dashboard/products/page.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/<h3 className="text-lg md:text-xl font-bold text-text-main leading-snug">[\s\S]*?<\/h3>/, `{product && product.category && product.slug ? (
                                                <Link href={\`/products/\${product.category.parent ? product.category.parent.slug : 'digital-marketplace'}/\${product.category.slug}/\${product.slug}\`} className="group/link">
                                                    <h3 className="text-lg md:text-xl font-bold text-text-main leading-snug group-hover/link:text-brand-blue transition-colors flex items-center gap-2">
                                                        {product.name} {product.version && \`v\${product.version}\`}
                                                    </h3>
                                                </Link>
                                            ) : (
                                                <h3 className="text-lg md:text-xl font-bold text-text-main leading-snug">
                                                    {product?.name || (locale === 'en' ? 'Custom Product' : 'Produk Kustom')} {product?.version && \`v\${product.version}\`}
                                                </h3>
                                            )}`);

content = content.replace(/<div className="space-y-3\.5 text-left max-w-xl">/, `<div className="flex gap-4 items-start max-w-xl">
                                        {product?.gallery && product.gallery.length > 0 && (
                                            <div className="hidden sm:block w-24 h-24 shrink-0 bg-neutral-900 rounded-xl overflow-hidden border border-glass-border">
                                                <img src={product.gallery[0].replace('public/', '/storage/')} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div className="space-y-3.5 text-left flex-1">`);

content = content.replace(/<\/div>\s*\{\/\* License Key Box \*\/\}/g, `</div></div>\n                                    {/* License Key Box */}`);

fs.writeFileSync(file, content);
console.log("Updated My Products successfully with regex");
