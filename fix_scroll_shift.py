import sys

def modify():
    with open('components/Navbar.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove the useEffect body lock
    hook = """    // Prevent background scrolling when any mega menu is open
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
    if hook in content:
        content = content.replace(hook, "")
        print("Removed body scroll lock.")
    else:
        print("Could not find body scroll lock hook.")

    # 2. Update the left pane to trap scroll
    left_pane_old = """                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2 mb-2">
                                Solution Categories
                            </span>
                            <div className="space-y-1">
                                {SOLUTION_CATEGORIES.map((cat) => ("""
                                
    left_pane_new = """                            <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block border-b border-glass-border pb-2 mb-2 shrink-0">
                                Solution Categories
                            </span>
                            <div className="space-y-1 max-h-[350px] overflow-y-auto overscroll-contain pr-2 custom-scrollbar">
                                {SOLUTION_CATEGORIES.map((cat) => ("""
    
    if left_pane_old in content:
        content = content.replace(left_pane_old, left_pane_new)
        print("Updated left pane overscroll.")
    else:
        print("Could not find left pane string.")

    with open('components/Navbar.tsx', 'w', encoding='utf-8') as f:
        f.write(content)

modify()
