import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\components\\Navbar.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern to replace the mobile products accordion inner content
pattern = re.compile(
    r'(\{mobileExpanded === \'products\' && \(\s*<div className="mt-3 pl-4 space-y-[0-9]+ text-sm animate-in fade-in duration-200">\s*<Link href="/products".*?<\/Link>\s*\{productHierarchy\.map\(\(mainCat, idx\) => \(\s*<Link.*?<\/Link>\s*\)\)\}\s*<\/div>\s*\)\})',
    re.DOTALL
)

replacement = """{mobileExpanded === 'products' && (
                                <div className="mt-3 pl-4 space-y-4 text-sm animate-in fade-in duration-200">
                                    <Link href="/products" onClick={() => setIsOpen(false)} className="block text-brand-blue font-bold hover:text-brand-blue-dark py-1 border-b border-glass-border/40 pb-2 mb-2">
                                        {language === 'en' ? 'Explore All Products' : 'Jelajahi Semua Produk'} &rarr;
                                    </Link>
                                    {productHierarchy.map((mainCat, idx) => (
                                        <div key={`mpp-${idx}`} className="space-y-2">
                                            <Link href={`/products/${mainCat.slug}`} onClick={() => setIsOpen(false)} className="block text-text-main font-bold text-xs uppercase tracking-widest pt-2">
                                                {mainCat.name}
                                            </Link>
                                            <div className="pl-3 border-l border-glass-border/40 space-y-2">
                                                {mainCat.children?.map(sub => (
                                                    <Link key={sub.slug} href={`/products/${mainCat.slug}/${sub.slug}`} onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}"""

if pattern.search(content):
    content = pattern.sub(replacement, content)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully updated Mobile Mega Menu in Navbar.")
else:
    print("Could not find the target mobile menu block.")
