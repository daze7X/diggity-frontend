import sys

def modify():
    with open('lib/api.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add Category Hierarchy interface
    if "export interface CategoryHierarchy" not in content:
        interface_def = """
export interface CategoryHierarchy extends Category {
    children?: (Category & { products_count?: number })[];
}
"""
        content = content.replace("export interface Category {", interface_def + "export interface Category {")

    # 2. Add API methods
    api_methods = """
    getProductHierarchy: (): Promise<CategoryHierarchy[]> => fetchAPI('/products/hierarchy'),
    getProductsBySubcategory: (slug: string): Promise<{ subcategory: CategoryHierarchy, products: Product[] }> => fetchAPI(`/products/subcategory/${slug}`),
"""
    if "getProductHierarchy:" not in content:
        content = content.replace("getProducts: (category?: string): Promise<Product[]> => {", api_methods + "    getProducts: (category?: string): Promise<Product[]> => {")

    with open('lib/api.ts', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated lib/api.ts successfully.")

modify()
