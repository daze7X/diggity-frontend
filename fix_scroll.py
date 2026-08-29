import sys

def modify():
    with open('components/Navbar.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Target the scrollable container in the Solutions mega menu
    target = 'max-h-[350px] overflow-y-auto pr-2 custom-scrollbar'
    replacement = 'max-h-[350px] overflow-y-auto overscroll-contain pr-2 custom-scrollbar'
    
    if target in content:
        content = content.replace(target, replacement)
        print("Successfully updated overscroll behavior!")
    else:
        print("Could not find the target string. The file might have been modified differently.")

    with open('components/Navbar.tsx', 'w', encoding='utf-8') as f:
        f.write(content)

modify()
