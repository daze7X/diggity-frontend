import sys

def modify():
    with open('app/products/[main]/[sub]/[slug]/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update the component signature
    sig_old = "export default async function ProductDetailPage({ params }: { params: { slug: string } }) {"
    sig_new = "export default async function ProductDetailPage({ params }: { params: { main: string, sub: string, slug: string } }) {"
    content = content.replace(sig_old, sig_new)

    # 2. Add Breadcrumb
    breadcrumb_hook = "{/* HERO SECTION */}"
    
    # We need to construct the breadcrumb
    # <nav className="flex text-xs font-semibold text-text-muted space-x-2 mb-8 relative z-10">
    #     <Link href="/products" className="hover:text-brand-blue transition-colors">Products</Link>
    #     <span>/</span>
    #     <Link href={`/products/${params.main}`} className="hover:text-brand-blue transition-colors">{product.category?.parent?.name}</Link>
    #     <span>/</span>
    #     <Link href={`/products/${params.main}/${params.sub}`} className="hover:text-brand-blue transition-colors">{product.category?.name}</Link>
    #     <span>/</span>
    #     <span className="text-brand-blue">{product.name}</span>
    # </nav>

    # But wait, Product in frontend might not have `category.parent.name` populated if it's not fetched properly.
    # Let's just use params.main and params.sub and format them, or if `product.category` exists, use that.
    
    breadcrumb = """            {/* Breadcrumb */}
            <div className="max-w-6xl mx-auto mb-6 relative z-10">
                <nav className="flex text-xs font-semibold text-text-muted space-x-2">
                    <Link href="/products" className="hover:text-brand-blue transition-colors">Products</Link>
                    <span>/</span>
                    <Link href={`/products/${params.main}`} className="hover:text-brand-blue transition-colors capitalize">{params.main.replace(/-/g, ' ')}</Link>
                    <span>/</span>
                    <Link href={`/products/${params.main}/${params.sub}`} className="hover:text-brand-blue transition-colors capitalize">{params.sub.replace(/-/g, ' ')}</Link>
                    <span>/</span>
                    <span className="text-brand-blue">{product.name}</span>
                </nav>
            </div>
            
            """
    
    if breadcrumb_hook in content and "Breadcrumb" not in content:
        content = content.replace(breadcrumb_hook, breadcrumb + breadcrumb_hook)

    with open('app/products/[main]/[sub]/[slug]/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Updated Product Detail Page.")

modify()
