import sys
import re

def modify():
    filepath = 'components/Navbar.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    content = re.sub(r'<SubServiceIcon slug=\{subCat\.slug\}', '<SubServiceIcon slug={subCat.slug || ""}', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed SubServiceIcon slug error in Navbar.")

modify()
