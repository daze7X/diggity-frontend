import sys
import re

def modify_main():
    filepath = 'app/products/[main]/page.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to change:
    # export default async function MainCategoryPage({ params }: { params: { main: string } }) {
    #     const locale = await getLocaleServer();
    #     const hierarchy = await api.getProductHierarchy().catch(() => []);
    #     
    #     const mainCat = hierarchy.find(c => c.slug === params.main);

    content = re.sub(
        r'export default async function MainCategoryPage\(\{ params \}: \{ params: \{ main: string \} \}\) \{',
        r'export default async function MainCategoryPage({ params }: { params: Promise<{ main: string }> }) {\n    const { main } = await params;',
        content
    )
    
    content = content.replace('params.main', 'main')
    
    # Restore the notFound instead of debug screen
    debug_block = """    if (!mainCat) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-6 text-black bg-white">
                <h1>DEBUG INFO</h1>
                <p>Params Main: {main}</p>
                <p>API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
                <textarea className="w-full h-96 mt-4 p-4 border text-black" readOnly value={JSON.stringify(hierarchy, null, 2)} />
            </div>
        );
    }"""
    
    normal_block = """    if (!mainCat) {
        notFound();
    }"""
    
    if debug_block in content:
        content = content.replace(debug_block, normal_block)
    else:
        print("Warning: debug block not found exactly.")
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def modify_sub():
    filepath = 'app/products/[main]/[sub]/page.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    content = re.sub(
        r'export default async function SubCategoryPage\(\{ params \}: \{ params: \{ main: string; sub: string \} \}\) \{',
        r'export default async function SubCategoryPage({ params }: { params: Promise<{ main: string; sub: string }> }) {\n    const { main, sub } = await params;',
        content
    )
    
    content = content.replace('params.main', 'main').replace('params.sub', 'sub')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

modify_main()
modify_sub()
print("Fixed Promise params in [main] and [sub] pages.")
