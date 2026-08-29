import sys

def modify():
    with open('components/Navbar.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add the import for SubServiceIcon
    import_anchor = "import SearchOverlay from './SearchOverlay';"
    if import_anchor in content and "import SubServiceIcon" not in content:
        content = content.replace(import_anchor, "import SubServiceIcon from './SubServiceIcon';\n" + import_anchor)
    else:
        print("Import anchor not found")

    # 2. Replace <Code /> with <SubServiceIcon />
    old_icon = '<Code className="w-3.5 h-3.5 text-brand-blue/70 group-hover:text-brand-blue transition-colors" />'
    new_icon = '<SubServiceIcon slug={svc.slug} fallbackCategoryIcon={activeCat.icon} className="w-3.5 h-3.5 text-brand-blue/70 group-hover:text-brand-blue transition-colors" />'
    
    if old_icon in content:
        content = content.replace(old_icon, new_icon)
    else:
        print("Old icon not found")

    with open('components/Navbar.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Updated Navbar successfully!")

modify()
