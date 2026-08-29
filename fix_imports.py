import sys
import glob

def fix_imports(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = content.replace("../../../lib/", "../../../../../lib/")
        content = content.replace("../../../components/", "../../../../../components/")

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed imports in {filepath}")
    except Exception as e:
        print(f"Failed to fix {filepath}: {e}")

fix_imports(r'app\products\[main]\[sub]\[slug]\page.tsx')
fix_imports(r'app\products\[main]\[sub]\[slug]\loading.tsx')
