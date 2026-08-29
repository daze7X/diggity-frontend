import sys
import re

def modify():
    filepath = 'app/products/[main]/page.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace <SubServiceIcon slug={sub.slug}
    content = re.sub(r'<SubServiceIcon slug=\{sub\.slug\}', '<SubServiceIcon slug={sub.slug || ""}', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed TS error in Main Category Page.")

modify()
