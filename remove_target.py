import sys

filepath = 'app/solutions/page.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

target_str = """                            {/* Center abstract icon instead of target */}
                            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                <div className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)] animate-float">
                                    <Target className="w-10 h-10 text-white" />
                                </div>
                            </div>"""

if target_str in content:
    content = content.replace(target_str, "")
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully removed Target icon from Solutions")
else:
    print("Could not find exact string to replace")
