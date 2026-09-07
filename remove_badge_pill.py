import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

badge_block = """                        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full mb-4">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">{locale === 'en' ? 'Digital Technology Company' : 'Perusahaan Teknologi Digital'}</span>
                        </div>\n"""

if badge_block in content:
    content = content.replace(badge_block, "")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully removed the badge pill.")
else:
    print("Could not find the badge pill block with exact indentation. Trying regex...")
    pattern = re.compile(r'\s*<div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3 py-1\.5 rounded-full mb-4">.*?<\/div>\n', re.DOTALL)
    if pattern.search(content):
        content = pattern.sub('', content)
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print("Successfully removed the badge pill via regex.")
    else:
        print("Could not find the badge pill block via regex either.")
