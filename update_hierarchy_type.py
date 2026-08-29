import sys

def modify():
    with open('lib/api.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the CategoryHierarchy interface
    interface_old = """export interface CategoryHierarchy extends Category {
    children?: (Category & { products_count?: number })[];
}"""
    interface_new = """export interface CategoryHierarchy extends Category {
    children?: (Category & { products_count?: number })[];
    parent?: Category;
}"""
    
    content = content.replace(interface_old, interface_new)

    with open('lib/api.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added parent to CategoryHierarchy in lib/api.ts.")

modify()
