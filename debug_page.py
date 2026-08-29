import sys

def modify():
    filepath = 'app/products/[main]/page.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the notFound block
    old_block = """    if (!mainCat) {
        notFound();
    }"""
    
    new_block = """    if (!mainCat) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-6 text-black bg-white">
                <h1>DEBUG INFO</h1>
                <p>Params Main: {params.main}</p>
                <p>API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
                <textarea className="w-full h-96 mt-4 p-4 border text-black" readOnly value={JSON.stringify(hierarchy, null, 2)} />
            </div>
        );
    }"""
    
    if old_block in content:
        content = content.replace(old_block, new_block)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated page.tsx with debug output.")
    else:
        print("Could not find notFound block.")

modify()
