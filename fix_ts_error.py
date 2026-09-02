import sys

filepath = 'app/products/[main]/[sub]/[slug]/page.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the TypeScript error
content = content.replace("product.category?.parent?.name", "(product.category as any)?.parent?.name")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed TypeScript error.")
