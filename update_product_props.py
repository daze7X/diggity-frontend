import sys

def modify():
    path = r'app\products\[main]\[sub]\[slug]\page.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Props
    props_old = "    params: Promise<{ slug: string }>;"
    props_new = "    params: Promise<{ main: string; sub: string; slug: string }>;"
    content = content.replace(props_old, props_new)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Updated Props in Product Detail Page.")

modify()
