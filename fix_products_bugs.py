import sys

filepath = 'app/products/page.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix the Image Blob container issue
old_blob = """                        {/* Main Image Blob */}
                        <div className="absolute inset-0 border-2 border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.3)] overflow-hidden animate-morph-blob relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/30 to-transparent z-10 opacity-70 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
                            <Image 
                                src="/images/saas_hero.jpg" 
                                alt="Diggity Dashboard 3D Illustration" 
                                fill
                                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                                priority
                            />
                        </div>"""

new_blob = """                        {/* Main Image Blob */}
                        <div className="absolute inset-0 border-2 border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.3)] overflow-hidden animate-morph-blob group z-10">
                            <div className="w-full h-full relative rounded-[inherit] overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/30 to-transparent z-10 opacity-70 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
                                <Image 
                                    src="/images/saas_hero.jpg" 
                                    alt="Diggity Dashboard 3D Illustration" 
                                    fill
                                    className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                                    priority
                                />
                            </div>
                        </div>"""

if old_blob in content:
    content = content.replace(old_blob, new_blob)
    print("Fixed Image Blob.")
else:
    print("Could not find old_blob!")

# 2. Fix the overlap container background from bg-white to bg-gray-50
old_wrapper = """            {/* MAIN CONTENT AREA (Overlapping the hero) */}
            <div className="max-w-7xl mx-auto px-0 md:px-6 relative z-20 -mt-16">
                <div className="bg-white dark:bg-brand-bg border border-glass-border shadow-2xl rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col">"""

new_wrapper = """            {/* MAIN CONTENT AREA (Overlapping the hero) */}
            <div className="max-w-7xl mx-auto px-0 md:px-6 relative z-20 -mt-16">
                <div className="bg-gray-50 dark:bg-brand-bg border border-glass-border shadow-2xl rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col">"""

if old_wrapper in content:
    content = content.replace(old_wrapper, new_wrapper)
    print("Fixed overlapping wrapper background.")
else:
    print("Could not find old_wrapper!")

# 3. Testimonials has `bg-gray-50/50` in the new wrapper, wait, let's check `3. WHY CHOOSE US`.
# If the wrapper is `bg-gray-50`, then Sections like `4. THE PRODUCTS CATALOG` which have `bg-gray-50/50` will also blend in.
# Let's change the wrapper background to `bg-gray-50` and maybe `catalog` to `bg-white`.
# Let's check `catalog` background in the file.
old_catalog = """            {/* 4. THE PRODUCTS CATALOG (Clean Minimalist Accordion/List Style) */}
            <div id="catalog" className="bg-gray-50/50 dark:bg-transparent border-y border-glass-border py-24">"""
new_catalog = """            {/* 4. THE PRODUCTS CATALOG (Clean Minimalist Accordion/List Style) */}
            <div id="catalog" className="bg-white dark:bg-transparent border-y border-glass-border py-24">"""
if old_catalog in content:
    content = content.replace(old_catalog, new_catalog)
    print("Fixed catalog background.")

# And `6. FAQ Section`
old_faq = """            {/* 6. FAQ Section */}
            {faqs.length > 0 && (
                <div className="bg-gray-50/50 dark:bg-transparent border-t border-glass-border">"""
new_faq = """            {/* 6. FAQ Section */}
            {faqs.length > 0 && (
                <div className="bg-white dark:bg-transparent border-t border-glass-border">"""
if old_faq in content:
    content = content.replace(old_faq, new_faq)
    print("Fixed FAQ background.")


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

