const fs = require('fs');
const file = 'app/dashboard/products/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the double div closing back to single
content = content.replace("</div></div>\n                                    {/* License Key Box */}", "</div>\n                                    {/* License Key Box */}");

// Re-open the flex wrapper
content = content.replace("<div className=\"space-y-3.5 text-left flex-1\">", "<div className=\"flex gap-4 items-start max-w-xl\">\n                                        {product?.gallery && product.gallery.length > 0 && (\n                                            <div className=\"hidden sm:block w-24 h-24 shrink-0 bg-neutral-900 rounded-xl overflow-hidden border border-glass-border\">\n                                                <img src={product.gallery[0].replace('public/', '/storage/')} alt={product.name} className=\"w-full h-full object-cover\" />\n                                            </div>\n                                        )}\n                                        <div className=\"space-y-3.5 text-left flex-1\">");

// Close the flex wrapper correctly at the end of the left side block
content = content.replace("</div>\n\n                                    {/* Right Side: Direct download action button */}", "</div></div>\n\n                                    {/* Right Side: Direct download action button */}");

fs.writeFileSync(file, content);
console.log("Fixed JSX syntax error!");
