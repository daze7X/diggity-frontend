import sys

def modify():
    with open('app/products/[main]/[sub]/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the SubServiceIcon line
    old_line = '<SubServiceIcon slug={subcategory.slug} fallbackCategoryIcon="layers" className="w-8 h-8 text-brand-blue" />'
    new_line = '<SubServiceIcon slug={subcategory?.slug || ""} fallbackCategoryIcon="layers" className="w-8 h-8 text-brand-blue" />'
    
    # Let's just do a regex replace to be safe
    import re
    content = re.sub(r'<SubServiceIcon slug=\{subcategory\.slug\}', '<SubServiceIcon slug={subcategory?.slug || ""}', content)

    # Also check if there's any other place where `subcategory.name` or `subcategory.parent.name` might be undefined
    content = content.replace('{subcategory.parent.name}', '{subcategory?.parent?.name}')
    content = content.replace('{subcategory.name}', '{subcategory?.name}')

    with open('app/products/[main]/[sub]/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed TS error in Subcategory Page.")

modify()
