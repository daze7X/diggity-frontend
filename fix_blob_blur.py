import sys

files = [
    'app/portfolio/page.tsx',
    'app/products/[main]/[sub]/page.tsx',
    'app/products/[main]/[sub]/[slug]/page.tsx'
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to remove 'backdrop-blur-md' if it's in the same class string as animate-morph-blob
    # In portfolio: 'bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md animate-morph-blob'
    # In products: 'bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl overflow-hidden animate-morph-blob'
    
    # Replace in portfolio
    content = content.replace('backdrop-blur-md animate-morph-blob', 'animate-morph-blob')
    content = content.replace('backdrop-blur-md animate-morph-blob-fast', 'animate-morph-blob-fast')
    
    # Replace in products
    content = content.replace('backdrop-blur-md shadow-2xl overflow-hidden animate-morph-blob', 'shadow-[0_0_80px_rgba(0,0,0,0.3)] overflow-hidden animate-morph-blob')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Removed backdrop-blur from {filepath}")
