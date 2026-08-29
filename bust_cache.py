import sys

def modify():
    filepath = 'lib/api.ts'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    old_call = "getProductHierarchy: (): Promise<CategoryHierarchy[]> => fetchAPI('/products/hierarchy'),"
    new_call = "getProductHierarchy: (): Promise<CategoryHierarchy[]> => fetchAPI('/products/hierarchy?v=2', { cache: 'no-store' }),"
    
    if old_call in content:
        content = content.replace(old_call, new_call)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated getProductHierarchy to bust cache.")
    else:
        print("Could not find getProductHierarchy call.")

modify()
