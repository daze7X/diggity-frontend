import sys
import re

def modify_icons():
    filepath = 'components/SubServiceIcon.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add new imports
    # We will just append them to the existing lucide-react import
    new_imports = "Wallet, Package, CheckSquare, Layout, FolderOpen, Coins"
    
    if "Wallet" not in content:
        content = content.replace("} from 'lucide-react';", f"    {new_imports}\n}} from 'lucide-react';")

    # Add new mapping to slugIconMap
    new_mappings = """
    // Products
    'website-commerce': Store,
    'sales': TrendingUp,
    'finance': Wallet,
    'inventory-manufacturing': Package,
    'human-resources': Users,
    'marketing': Megaphone,
    'services': Briefcase,
    'productivity': CheckSquare,
    'graphics': Palette,
    'design-templates': Layout,
    '3d': Box,
    'web': Code2,
    'resources': FolderOpen,
"""
    
    # insert before export default function
    content = content.replace("export default function SubServiceIcon", f"{new_mappings}\nexport default function SubServiceIcon")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Added new icon mappings.")

modify_icons()
