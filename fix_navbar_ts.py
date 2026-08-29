import sys
import re

def modify():
    filepath = 'components/Navbar.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex replace to add CategoryHierarchy if it's not there
    if "CategoryHierarchy" not in content[:1000]: # Check in imports area
        content = re.sub(r'import\s+\{\s*([^}]*)\s*\}\s+from\s+[\'"]\.\./lib/api[\'"]', r'import { \1, CategoryHierarchy } from "../lib/api"', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed Navbar TS error.")

modify()
