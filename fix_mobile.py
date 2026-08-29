import sys

def modify():
    with open('components/Navbar.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the mobile solutions block
    start_anchor = "{mobileExpanded === 'solutions' && ("
    end_anchor = "                                {/* Mobile Products */}"

    s_idx = content.find(start_anchor)
    e_idx = content.find(end_anchor)

    if s_idx == -1 or e_idx == -1:
        print("Could not find the anchors")
        return

    new_block = """{mobileExpanded === 'solutions' && (
                                <div className="mt-3 pl-4 space-y-3 text-sm animate-in fade-in duration-200">
                                    <Link href="/solutions" onClick={() => setIsOpen(false)} className="block text-brand-blue font-bold hover:text-brand-blue-dark py-1 mb-2 border-b border-glass-border/40 pb-2">
                                        Lihat Semua Solusi ➔
                                    </Link>
                                    {SOLUTION_CATEGORIES.map((item, idx) => (
                                        <Link key={`ms-${idx}`} href={`/solutions/${item.slug}`} onClick={() => setIsOpen(false)} className="block text-text-gray font-medium hover:text-brand-blue py-1">
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}

"""
    content = content[:s_idx] + new_block + content[e_idx:]

    with open('components/Navbar.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed mobile menu!")

modify()
