import sys

def modify():
    filepath = 'app/products/page.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Import CategoryHierarchy
    if 'CategoryHierarchy' not in content:
        content = content.replace("import { api } from '../../lib/api';", "import { api, CategoryHierarchy } from '../../lib/api';")

    # Replace type
    content = content.replace("let hierarchy: any[] = [];", "let hierarchy: CategoryHierarchy[] = [];")

    # If the map still uses implicitly typed sub, it shouldn't error once `cat.children` has a known type. But just to be safe:
    content = content.replace("map(sub =>", "map((sub: any) =>")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed implicit any in app/products/page.tsx")

modify()
