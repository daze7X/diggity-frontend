import sys
import re

def modify():
    filepath = 'components/Navbar.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # I need to remove the ArrowUpRight that I added at the end of the import block
    content = content.replace("    ChevronRight,\n    ArrowUpRight,\n} from 'lucide-react';", "    ChevronRight,\n} from 'lucide-react';")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed multiple definitions of ArrowUpRight.")

modify()
