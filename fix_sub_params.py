import sys
import re

def modify_sub():
    filepath = 'app/products/[main]/[sub]/page.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The current signature is:
    # export default async function SubCategoryPage({ params }: { params: { main: string, sub: string } }) {
    #     const locale = await getLocaleServer();

    # Let's replace it properly
    old_sig = "export default async function SubCategoryPage({ params }: { params: { main: string, sub: string } }) {"
    new_sig = "export default async function SubCategoryPage({ params }: { params: Promise<{ main: string, sub: string }> }) {\n    const { main, sub } = await params;"
    
    if old_sig in content:
        content = content.replace(old_sig, new_sig)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed signature in [sub]/page.tsx")
    else:
        print("Could not find the signature!")

modify_sub()
