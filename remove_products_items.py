import sys
import re

def modify():
    filepath = 'components/Navbar.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to remove `fallbackProducts` array and `productsItems` declaration.
    # It looks like:
    # const fallbackProducts = [ ... ];
    # const productsItems = ...;

    # Just remove everything from `const fallbackProducts` up to the end of `const productsItems`
    
    # We can use regex to remove it
    pattern = r"const fallbackProducts = \[.*?\];\s*const productsItems = [^;]+;"
    content = re.sub(pattern, "", content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Removed unused productsItems and fallbackProducts.")

modify()
