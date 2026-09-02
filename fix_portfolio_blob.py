import sys

filepath = 'app/portfolio/page.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'shadow-2xl animate-morph-blob pointer-events-none hidden lg:block opacity-50',
    'shadow-2xl overflow-hidden animate-morph-blob pointer-events-none hidden lg:block opacity-50'
)

content = content.replace(
    'shadow-2xl animate-morph-blob-fast pointer-events-none hidden lg:block opacity-30 delay-700',
    'shadow-2xl overflow-hidden animate-morph-blob-fast pointer-events-none hidden lg:block opacity-30 delay-700'
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Added overflow-hidden to portfolio blobs.")
