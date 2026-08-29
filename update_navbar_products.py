import sys

def modify():
    with open('components/Navbar.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add CategoryHierarchy to imports if needed
    if "CategoryHierarchy" not in content:
        content = content.replace("import { api, Service, Portfolio, Blog, Course }", "import { api, Service, Portfolio, Blog, Course, CategoryHierarchy }")

    # 2. Add state for products hierarchy
    state_anchor = "const [products, setProducts] = useState<any[]>([])" # Need to find the exact state for products
    # Let's just look for "const [products"
    
    # 3. Use python's regex to find and replace the products state fetching
    import re
    
    # Replace states
    # It might be `const [products, setProducts] = useState<Product[]>([]);`
    content = re.sub(r'const \[products, setProducts\] = useState<[^>]*>\(\[\]\);', 'const [productHierarchy, setProductHierarchy] = useState<CategoryHierarchy[]>([]);', content)
    
    # Replace fetch logic
    fetch_old = """                const [srv, prd, crs] = await Promise.all([
                    api.getSolutions(),
                    api.getProducts(),
                    api.getCourses()
                ]);"""
    fetch_new = """                const [srv, prdH, crs] = await Promise.all([
                    api.getSolutions(),
                    api.getProductHierarchy(),
                    api.getCourses()
                ]);"""
    content = content.replace(fetch_old, fetch_new)
    
    # Set state
    content = content.replace("setProducts(prd);", "setProductHierarchy(prdH);")

    # Now rewrite the Products Mega Menu
    # Col 1: Product Categories & Col 2: Featured Products
    
    mega_menu_old_start = "{/* 2. Products Mega-Menu Panel */}"
    mega_menu_old_end = "{/* 3. Academy Mega-Menu Panel */}"
    
    s_idx = content.find(mega_menu_old_start)
    e_idx = content.find(mega_menu_old_end)
    
    if s_idx != -1 and e_idx != -1:
        mega_menu_new = """{/* 2. Products Mega-Menu Panel (Mekari-style Tab UI) */}
                {activeDropdown === 'products' && (
                    <div 
                        onMouseEnter={() => handleMouseEnter('products')}
                        onMouseLeave={handleMouseLeave}
                        className="absolute left-0 right-0 top-full mt-4 mx-auto max-w-6xl bg-brand-bg/95 border border-glass-border rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col md:flex-row gap-6 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50 min-h-[380px] overscroll-contain overflow-y-auto max-h-[calc(100vh-100px)]"
                    >
                        {/* Left Pane: Main Categories */}
                        <div className="w-full md:w-1/3 flex flex-col border-r border-glass-border/40 pr-6">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2 mb-2 shrink-0">
                                Product Categories
                            </span>
                            <div className="space-y-1">
                                {productHierarchy.map((mainCat) => (
                                    <Link 
                                        key={mainCat.slug}
                                        href={`/products/${mainCat.slug}`}
                                        className="w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between group hover:bg-glass-bg border border-transparent"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-brand-blue/20 bg-brand-blue/10`}>
                                                <Layers className={`w-4 h-4 text-brand-blue`} />
                                            </div>
                                            <span className="text-[13px] font-extrabold text-text-main group-hover:text-brand-blue transition-colors">
                                                {mainCat.name}
                                            </span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-text-gray/50 group-hover:text-brand-blue transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right Pane: Subcategories */}
                        <div className="w-full md:w-2/3 flex flex-col">
                            <div className="flex items-center justify-between mb-4 shrink-0">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-black text-text-main">
                                        Explore Products
                                    </h3>
                                    <p className="text-xs text-text-gray font-medium">
                                        Discover our comprehensive suite of digital products.
                                    </p>
                                </div>
                                <Link 
                                    href="/products" 
                                    className="text-xs font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 bg-brand-blue/10 px-3 py-1.5 rounded-full transition-colors"
                                    onClick={() => setActiveDropdown(null)}
                                >
                                    Explore All <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                            
                            {/* We just list all subcategories from all main categories (or we could make it hover-based, but PDF says "Mega Menu hanya menampilkan kategori utama dan subkategori") */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto overscroll-contain pr-2 custom-scrollbar content-start">
                                {productHierarchy.flatMap(main => main.children || []).map((subCat) => (
                                    <Link 
                                        key={subCat.slug}
                                        href={`/products/${productHierarchy.find(m => m.children?.some(c => c.slug === subCat.slug))?.slug}/${subCat.slug}`}
                                        onClick={() => setActiveDropdown(null)}
                                        className="group p-3 rounded-xl border border-transparent hover:border-glass-border hover:bg-glass-bg transition-all flex flex-col gap-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            <SubServiceIcon slug={subCat.slug} fallbackCategoryIcon="layers" className="w-4 h-4 text-brand-blue/70 group-hover:text-brand-blue transition-colors" />
                                            <h4 className="text-[13px] font-extrabold text-text-main group-hover:text-brand-blue transition-colors leading-tight">
                                                {subCat.name}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
                """
        content = content[:s_idx] + mega_menu_new + content[e_idx:]
    
    # Also fix Mobile menu products logic
    mobile_products_old_start = "{/* Mobile Products Accordion */}"
    mobile_products_old_end = "{/* Mobile Academy Accordion */}"
    
    sm_idx = content.find(mobile_products_old_start)
    em_idx = content.find(mobile_products_old_end)
    
    if sm_idx != -1 and em_idx != -1:
        mobile_products_new = """{/* Mobile Products Accordion */}
                        <div className="border-b border-glass-border/40 py-1.5">
                            <button
                                onClick={() => setMobileExpanded(mobileExpanded === 'products' ? null : 'products')}
                                className="w-full text-base font-semibold text-text-gray flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className={isActive('/products') ? 'text-brand-blue' : ''}>
                                    Products
                                </span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === 'products' ? 'rotate-180' : ''}`} />
                            </button>
                            {mobileExpanded === 'products' && (
                                <div className="mt-3 pl-4 space-y-3 text-sm animate-in fade-in duration-200">
                                    <Link href="/products" onClick={() => setIsOpen(false)} className="block text-brand-blue font-bold hover:text-brand-blue-dark py-1 mb-2 border-b border-glass-border/40 pb-2">
                                        Lihat Semua Produk ➔
                                    </Link>
                                    {productHierarchy.map((mainCat, idx) => (
                                        <Link key={`mpp-${idx}`} href={`/products/${mainCat.slug}`} onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                            {mainCat.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        """
        content = content[:sm_idx] + mobile_products_new + content[em_idx:]
        
    with open('components/Navbar.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated Navbar.tsx successfully.")

modify()
