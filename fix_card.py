import sys

filepath = 'app/products/[main]/[sub]/page.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Locate the exact block to replace
old_block = """                                <SpotlightCard className="h-full flex flex-col border border-glass-border bg-gray-50 dark:bg-brand-bg hover:bg-white dark:hover:bg-glass-bg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group rounded-2xl overflow-hidden">
                                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-white dark:bg-brand-bg/50 shadow-sm border border-glass-border flex items-center justify-center shrink-0 group-hover:border-brand-blue/30 group-hover:bg-brand-blue/5 transition-colors">
                                                <SubServiceIcon slug={product.slug} fallbackCategoryIcon="layers" className="w-6 h-6 text-brand-blue" />
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                                <ArrowRight className="w-4 h-4 text-text-gray group-hover:text-white transition-colors" />
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-xl font-extrabold text-text-main leading-tight group-hover:text-brand-blue transition-colors mb-3">
                                            {product.name}
                                        </h3>
                                        
                                        <p className="text-sm text-text-gray font-medium leading-relaxed line-clamp-3 mb-6 flex-1">
                                            {product.description || `Solusi profesional ${product.name} dari Diggity.`}
                                        </p>

                                        <div className="space-y-2 mt-auto">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                <span className="text-xs font-semibold text-text-main">Enterprise Ready</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                <span className="text-xs font-semibold text-text-main">Scalable Architecture</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="px-6 py-4 bg-white dark:bg-brand-bg border-t border-glass-border group-hover:bg-brand-blue group-hover:border-brand-blue transition-colors">
                                        <Link
                                            href={`/products/${main}/${sub}/${product.slug}`}
                                            className="flex items-center justify-between w-full text-sm font-bold text-text-main group-hover:text-white transition-colors"
                                        >
                                            {locale === 'en' ? 'Explore Features' : 'Eksplorasi Fitur'} 
                                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </Link>
                                    </div>
                                </SpotlightCard>"""

new_block = """                                <SpotlightCard className="h-full border border-glass-border bg-gray-50 dark:bg-brand-bg hover:bg-white dark:hover:bg-glass-bg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group rounded-2xl overflow-hidden">
                                    <Link href={`/products/${main}/${sub}/${product.slug}`} className="flex flex-col h-full w-full outline-none">
                                        <div className="p-6 md:p-8 flex-1 flex flex-col">
                                            <div className="flex items-start justify-between gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-brand-bg/50 shadow-sm border border-glass-border flex items-center justify-center shrink-0 group-hover:border-brand-blue/30 group-hover:bg-brand-blue/5 transition-colors">
                                                    <SubServiceIcon slug={product.slug} fallbackCategoryIcon="layers" className="w-6 h-6 text-brand-blue" />
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                                    <ArrowRight className="w-4 h-4 text-text-gray group-hover:text-white transition-colors" />
                                                </div>
                                            </div>
                                            
                                            <h3 className="text-xl font-extrabold text-text-main leading-tight group-hover:text-brand-blue transition-colors mb-3">
                                                {product.name}
                                            </h3>
                                            
                                            <p className="text-sm text-text-gray font-medium leading-relaxed line-clamp-3 mb-6 flex-1">
                                                {product.description || `Solusi profesional ${product.name} dari Diggity.`}
                                            </p>

                                            <div className="space-y-2 mt-auto">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                    <span className="text-xs font-semibold text-text-main">Enterprise Ready</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                    <span className="text-xs font-semibold text-text-main">Scalable Architecture</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="px-6 py-4 bg-white dark:bg-brand-bg border-t border-glass-border group-hover:bg-brand-blue group-hover:border-brand-blue transition-colors flex items-center justify-between w-full text-sm font-bold text-text-main group-hover:text-white">
                                            <span>{locale === 'en' ? 'Explore Features' : 'Eksplorasi Fitur'}</span> 
                                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </div>
                                    </Link>
                                </SpotlightCard>"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed clickable card issue.")
else:
    print("Error: Target block not found in the file.")
