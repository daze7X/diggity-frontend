import sys

def modify():
    with open('components/Navbar.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to insert a useEffect that locks the body
    hook = """
    // Prevent background scrolling when any mega menu is open
    useEffect(() => {
        if (activeDropdown || isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeDropdown, isOpen]);
"""
    
    # Let's insert this right before the `useEffect` that handles route change closing
    anchor = "    // Close dropdown on route change"
    if anchor in content and "document.body.style.overflow" not in content:
        content = content.replace(anchor, hook + "\n" + anchor)
        with open('components/Navbar.tsx', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Successfully injected body scroll lock!")
    else:
        print("Anchor not found or already injected.")

modify()
