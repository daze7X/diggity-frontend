import sys
import re

def modify():
    filepath = 'components/Navbar.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the block:
    # api.getProducts()
    #     .then((data) => {
    #         setProducts(data || []);
    #     })
    #     .catch((err) => {
    #         console.error('Failed to load products in navbar:', err);
    #     });
    
    # We will replace it with api.getProductHierarchy() and setProductHierarchy
    
    old_fetch_block = r"api\.getProducts\(\)\s*\.then\(\(data\)\s*=>\s*\{\s*setProducts\(data\s*\|\|\s*\[\]\);\s*\}\)\s*\.catch\(\(err\)\s*=>\s*\{\s*console\.error\([^)]+\);\s*\}\);"
    new_fetch_block = """api.getProductHierarchy()
            .then((data) => {
                setProductHierarchy(data || []);
            })
            .catch((err) => {
                console.error('Failed to load product hierarchy in navbar:', err);
            });"""
            
    content = re.sub(old_fetch_block, new_fetch_block, content, flags=re.MULTILINE)
    
    # Just in case there is a rogue `setProducts`
    content = content.replace('setProducts(data || [])', 'setProductHierarchy(data || [])')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed setProducts error in Navbar.")

modify()
