import sys

def modify():
    filepath = 'components/Navbar.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the lucide-react import block
    if "} from 'lucide-react';" in content:
        # Just prepend to the last line of the import block
        content = content.replace("} from 'lucide-react';", "    ChevronRight,\n    ArrowUpRight,\n} from 'lucide-react';")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed missing lucide-react imports.")

modify()
