import sys

def modify_navbar():
    with open('components/Navbar.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add hoveredSolutionCategory state
    state_anchor = "const [products, setProducts] = useState<Product[]>([]);"
    state_new = state_anchor + "\n    const [hoveredSolutionCategory, setHoveredSolutionCategory] = useState<string>('technology');"
    content = content.replace(state_anchor, state_new)

    # 2. Update api.getServices() to api.getSolutions()
    get_services_old = """        // Fetch services
        api.getServices()
            .then((data) => {
                setServices(data || []);
            })"""
    get_services_new = """        // Fetch services (now using getSolutions to get all 56 items)
        api.getSolutions()
            .then((data) => {
                setServices(data || []);
            })"""
    content = content.replace(get_services_old, get_services_new)

    # 3. Update getServiceHref
    href_old = """    const getServiceHref = (slug: string, categorySlug?: string) => {
        if (slug === 'job-connect') return '/job-connect?tab=careers';
        if (slug === 'headhunting' || slug === 'outsourcing') return `/job-connect/${slug}`;
        return `/solutions/${slug}`;
    };"""
    href_new = """    const getServiceHref = (slug: string, categorySlug?: string) => {
        if (categorySlug === 'it-talent-workforce') {
            if (slug === 'it-headhunting') return '/job-connect/headhunting';
            if (slug === 'it-outsourcing') return '/job-connect/outsourcing';
        }
        return categorySlug ? `/solutions/${categorySlug}/${slug}` : `/solutions/${slug}`;
    };"""
    content = content.replace(href_old, href_new)

    # 4. Replace the old Solutions Mega Menu fallback vars with the new Category definitions
    fallback_old_start = "    // Filter categories instead of services for the Mega Menu"
    fallback_old_end = "    const productsItems = products.length > 0 ? products.slice(0, 3).map(p => ({ name: p.name, slug: p.slug, icon: p.is_popular ? 'server' : 'cpu', description: p.description || '', categorySlug: 'product' })) : fallbackProducts;"
    
    start_idx = content.find(fallback_old_start)
    end_idx = content.find(fallback_old_end) + len(fallback_old_end)
    
    if start_idx != -1 and end_idx != -1:
        new_vars = """    const SOLUTION_CATEGORIES = [
        { name: 'Technology Solutions', slug: 'technology', icon: 'code', description: 'End-to-end technology solutions to build and integrate digital systems.' },
        { name: 'AI & Emerging Technology', slug: 'ai-emerging-technology', icon: 'cpu', description: 'AI, data, automation, IoT, and emerging tech capabilities.' },
        { name: 'Creative & Brand Experience', slug: 'creative-brand-experience', icon: 'layers', description: 'Branding, creative production, and digital experience.' },
        { name: 'Growth Marketing', slug: 'growth-marketing', icon: 'trending-up', description: 'Digital marketing strategy for awareness and conversion.' },
        { name: 'Cloud & Cyber Security', slug: 'cloud-cyber-security', icon: 'shield-check', description: 'Cloud infrastructure, DevOps, security, and managed services.' },
        { name: 'Consulting', slug: 'consulting', icon: 'help-circle', description: 'Technology, business, and digital transformation consulting.' },
        { name: 'IT Talent & Workforce', slug: 'it-talent-workforce', icon: 'users', description: 'Provision and management of IT talent (Headhunting & Outsourcing).' }
    ];

    const fallbackProducts = [
        { name: 'Diggity ERP & CRM', slug: 'diggity-erp', icon: 'server', description: 'B2B SaaS accounting, inventory, and payroll.', categorySlug: 'product' },
        { name: 'Diggity AI Agent', slug: 'diggity-ai-agent', icon: 'cpu', description: 'Automated chat assistants and customer lead capture.', categorySlug: 'product' },
        { name: 'Sleek Dashboard UI Kit', slug: 'sleek-dashboard-ui-kit', icon: 'layers', description: 'UI kits, templates, and digital assets.', categorySlug: 'product' }
    ];

    const productsItems = products.length > 0 ? products.slice(0, 3).map(p => ({ name: p.name, slug: p.slug, icon: p.is_popular ? 'server' : 'cpu', description: p.description || '', categorySlug: 'product' })) : fallbackProducts;"""
        content = content[:start_idx] + new_vars + content[end_idx:]

    # 5. Replace the Mega Menu JSX for solutions
    jsx_old_start = "{/* 1. Solutions Mega-Menu Panel */}"
    jsx_old_end = "{/* 2. Products Mega-Menu Panel */}"
    
    s_idx = content.find(jsx_old_start)
    e_idx = content.find(jsx_old_end)
    
    if s_idx != -1 and e_idx != -1:
        new_jsx = """{/* 1. Solutions Mega-Menu Panel (Mekari Style Tab UI) */}
                {activeDropdown === 'solutions' && (
                    <div 
                        onMouseEnter={() => handleMouseEnter('solutions')}
                        onMouseLeave={handleMouseLeave}
                        className="absolute left-0 right-0 top-full mt-4 mx-auto max-w-6xl bg-brand-bg/95 border border-glass-border rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col md:flex-row gap-6 text-left animate-in fade-in slide-in-from-top-2 duration-200 z-50 min-h-[420px]"
                    >
                        {/* Left Pane: Categories (Tab List) */}
                        <div className="w-full md:w-1/3 flex flex-col space-y-1 border-r border-glass-border/40 pr-6">
                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2 mb-2">
                                Solution Categories
                            </span>
                            <div className="space-y-1">
                                {SOLUTION_CATEGORIES.map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        href={`/solutions/${cat.slug}`}
                                        onMouseEnter={() => setHoveredSolutionCategory(cat.slug)}
                                        onClick={() => setActiveDropdown(null)}
                                        className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                                            hoveredSolutionCategory === cat.slug 
                                                ? 'bg-glass-bg border border-glass-border/60 shadow-sm' 
                                                : 'border border-transparent hover:bg-glass-bg/50'
                                        }`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                            hoveredSolutionCategory === cat.slug 
                                                ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20' 
                                                : 'bg-brand-blue/10 text-brand-blue group-hover:bg-brand-blue/20'
                                        }`}>
                                            <DynamicIcon name={cat.icon} className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h4 className={`text-[13px] font-extrabold leading-tight transition-colors ${
                                                hoveredSolutionCategory === cat.slug ? 'text-brand-blue' : 'text-text-main group-hover:text-brand-blue'
                                            }`}>
                                                {cat.name}
                                            </h4>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 -rotate-90 transition-transform ${hoveredSolutionCategory === cat.slug ? 'text-brand-blue opacity-100 translate-x-1' : 'text-text-muted opacity-0 group-hover:opacity-50'}`} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right Pane: Sub-Services Content */}
                        <div className="w-full md:w-2/3 flex flex-col">
                            {(() => {
                                const activeCat = SOLUTION_CATEGORIES.find(c => c.slug === hoveredSolutionCategory) || SOLUTION_CATEGORIES[0];
                                const subServices = services.filter(s => s.category?.slug === activeCat.slug);
                                
                                return (
                                    <>
                                        <div className="flex items-center justify-between border-b border-glass-border pb-3 mb-4">
                                            <div>
                                                <h3 className="text-lg font-black text-text-main flex items-center gap-2">
                                                    {activeCat.name}
                                                </h3>
                                                <p className="text-[11px] text-text-gray font-medium mt-0.5 max-w-md">{activeCat.description}</p>
                                            </div>
                                            <Link 
                                                href={`/solutions/${activeCat.slug}`}
                                                onClick={() => setActiveDropdown(null)}
                                                className="text-[11px] font-bold text-brand-blue bg-brand-blue/10 hover:bg-brand-blue hover:text-white transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0"
                                            >
                                                Explore All <ArrowUpRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                        
                                        {subServices.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar content-start">
                                                {subServices.map((svc) => (
                                                    <Link 
                                                        key={svc.slug}
                                                        href={getServiceHref(svc.slug, activeCat.slug)}
                                                        onClick={() => setActiveDropdown(null)}
                                                        className="group p-3 rounded-xl border border-transparent hover:border-glass-border hover:bg-glass-bg transition-all flex flex-col gap-2"
                                                    >
                                                        <div className="w-7 h-7 rounded-md bg-brand-blue/5 flex items-center justify-center shrink-0 border border-brand-blue/10">
                                                            <Code className="w-3.5 h-3.5 text-brand-blue/70 group-hover:text-brand-blue transition-colors" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-[12px] font-extrabold text-text-main group-hover:text-brand-blue transition-colors leading-tight">
                                                                {svc.name}
                                                            </h4>
                                                            <p className="text-[10px] text-text-gray font-medium line-clamp-2 mt-1 leading-relaxed">
                                                                {svc.description || `Layanan profesional untuk ${svc.name} yang disesuaikan dengan kebutuhan Anda.`}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex-1 flex flex-col items-center justify-center text-text-muted">
                                                <div className="w-12 h-12 rounded-full border border-glass-border flex items-center justify-center mb-3 bg-glass-bg animate-pulse">
                                                    <DynamicIcon name={activeCat.icon} className="w-5 h-5 text-brand-blue/30" />
                                                </div>
                                                <p className="text-xs font-medium">Memuat sub-layanan...</p>
                                            </div>
                                        )}
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                )}

                """
        content = content[:s_idx] + new_jsx + content[e_idx:]

    with open('components/Navbar.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Successfully rewritten Navbar.tsx")

modify_navbar()
