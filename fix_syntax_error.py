import sys

def modify():
    filepath = 'components/Navbar.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The issue is:
    #     Info
    #     ChevronRight,
    
    # Let's fix it by adding a comma after Info
    content = content.replace("    Info\n    ChevronRight,", "    Info,\n    ChevronRight,")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed syntax error in lucide-react imports.")

modify()
