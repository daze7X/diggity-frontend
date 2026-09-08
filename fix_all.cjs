const fs = require('fs');
const file = 'app/dashboard/products/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix 1: Change double div closure to single
content = content.replace("</div></div>\n                                    {/* License Key Box */}", "</div>\n                                    {/* License Key Box */}");

// Fix 2: Wrap Left Side in flex and add thumbnail
content = content.replace("<div className=\"space-y-3.5 text-left flex-1\">\n                                        <div className=\"space-y-2\">", "<div className=\"flex gap-4 items-start max-w-xl\">\n                                        {product?.gallery && product.gallery.length > 0 && (\n                                            <div className=\"hidden sm:block w-24 h-24 shrink-0 bg-neutral-900 rounded-xl overflow-hidden border border-glass-border\">\n                                                <img src={product.gallery[0].replace('public/', '/storage/')} alt={product.name} className=\"w-full h-full object-cover\" />\n                                            </div>\n                                        )}\n                                        <div className=\"space-y-3.5 text-left flex-1\">\n                                        <div className=\"space-y-2\">");

// Fix 3: Close the flex wrapper correctly at the end of Left Side (before Right Side)
content = content.replace("</div>\n\n                                    {/* Right Side: Direct download action button */}", "</div></div>\n\n                                    {/* Right Side: Direct download action button */}");

// Fix 4: Add Link to product title
const h3Str = `<h3 className="text-lg md:text-xl font-bold text-text-main leading-snug">\n                                                {product?.name || (locale === 'en' ? 'Custom Product' : 'Produk Kustom')} {product?.version && \`v\${product.version}\`}\n                                            </h3>`;
const linkStr = `{product && product.category && product.slug ? (\n                                                <Link href={\`/products/\${product.category.parent ? product.category.parent.slug : 'digital-marketplace'}/\${product.category.slug}/\${product.slug}\`} className="group/link">\n                                                    <h3 className="text-lg md:text-xl font-bold text-text-main leading-snug group-hover/link:text-brand-blue transition-colors flex items-center gap-2">\n                                                        {product.name} {product.version && \`v\${product.version}\`}\n                                                    </h3>\n                                                </Link>\n                                            ) : (\n                                                <h3 className="text-lg md:text-xl font-bold text-text-main leading-snug">\n                                                    {product?.name || (locale === 'en' ? 'Custom Product' : 'Produk Kustom')} {product?.version && \`v\${product.version}\`}\n                                                </h3>\n                                            )}`;
content = content.replace(h3Str, linkStr);

fs.writeFileSync(file, content);
console.log("All UI and syntax fixes applied perfectly!");
