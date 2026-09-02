import sys
import re

def modify_navbar():
    filepath = 'components/Navbar.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Use regex to match everything from {activeDropdown === 'products' && ( up to {/* 3. Academy Mega-Menu Panel */}
    pattern = r"\{activeDropdown === 'products' && \([\s\S]*?\{/\* 3\. Academy Mega-Menu Panel \*/\}"
    
    match = re.search(pattern, content)
    
    if not match:
        print("Could not find boundaries with regex.")
        return
        
    old_block = match.group(0)
    
    # We replace the old block but keep the academy comment at the end
    new_block = """{activeDropdown === 'products' && (
                    <div 
                        onMouseEnter={() => handleMouseEnter('products')}
                        onMouseLeave={handleMouseLeave}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[900px] max-w-[95vw] bg-white border border-glass-border rounded-3xl p-8 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Column 1: Business Software (Wide, 2 columns of items) */}
                            {productHierarchy.filter(m => m.slug === 'business-software').map(mainCat => (
                                <div key={mainCat.slug} className="flex-[2]">
                                    <span className="text-[11px] font-bold text-text-gray uppercase tracking-widest block border-b border-glass-border pb-3 mb-5">
                                        {mainCat.name}
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                        {mainCat.children?.map(sub => (
                                            <Link 
                                                key={sub.slug}
                                                href={`/products/${mainCat.slug}/${sub.slug}`}
                                                className="group flex items-start gap-3 p-2 -ml-2 rounded-lg hover:bg-brand-blue/5 transition-colors"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                <div className="mt-0.5 w-6 h-6 flex items-center justify-center shrink-0">
                                                    <SubServiceIcon slug={sub.slug || ""} fallbackCategoryIcon="layers" className="w-5 h-5 text-brand-blue/70 group-hover:text-brand-blue transition-colors" />
                                                </div>
                                                <div>
                                                    <h4 className="text-[13px] font-bold text-text-main group-hover:text-brand-blue transition-colors leading-none mb-1.5">
                                                        {sub.name}
                                                    </h4>
                                                    <p className="text-[11px] text-text-gray font-medium leading-snug">
                                                        {sub.products_count || 0} Produk
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Separator */}
                            <div className="w-[1px] bg-glass-border shrink-0 hidden md:block"></div>

                            {/* Column 2: Digital Marketplace (Narrow, 1 column of items) */}
                            {productHierarchy.filter(m => m.slug === 'digital-marketplace').map(mainCat => (
                                <div key={mainCat.slug} className="flex-1">
                                    <span className="text-[11px] font-bold text-text-gray uppercase tracking-widest block border-b border-glass-border pb-3 mb-5">
                                        {mainCat.name}
                                    </span>
                                    <div className="flex flex-col gap-y-4">
                                        {mainCat.children?.map(sub => (
                                            <Link 
                                                key={sub.slug}
                                                href={`/products/${mainCat.slug}/${sub.slug}`}
                                                className="group flex items-start gap-3 p-2 -ml-2 rounded-lg hover:bg-brand-blue/5 transition-colors"
                                                onClick={() => setActiveDropdown(null)}
                                            >
                                                <div className="mt-0.5 w-6 h-6 flex items-center justify-center shrink-0">
                                                    <SubServiceIcon slug={sub.slug || ""} fallbackCategoryIcon="layers" className="w-5 h-5 text-brand-blue/70 group-hover:text-brand-blue transition-colors" />
                                                </div>
                                                <div>
                                                    <h4 className="text-[13px] font-bold text-text-main group-hover:text-brand-blue transition-colors leading-none mb-1.5">
                                                        {sub.name}
                                                    </h4>
                                                    <p className="text-[11px] text-text-gray font-medium leading-snug">
                                                        {sub.products_count || 0} Produk
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 pt-4 border-t border-glass-border flex justify-between items-center">
                             <span className="text-xs font-medium text-text-gray">
                                Dapatkan free trial 14 hari untuk semua modul.
                             </span>
                             <Link href="/products" onClick={() => setActiveDropdown(null)} className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark transition-colors flex items-center">
                                 Jelajahi Semua Produk <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                             </Link>
                        </div>
                    </div>
                )}
                
                {/* 3. Academy Mega-Menu Panel */}"""
    
    content = content.replace(old_block, new_block)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced Products mega menu with Mekari style.")

modify_navbar()
