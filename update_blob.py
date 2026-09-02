import sys

filepath = 'app/solutions/page.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = "{/* Right Illustration */}"
end_marker = "{/* 2. MAIN CONTENT AREA (Overlapping the hero) */}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Cannot find markers")
    sys.exit(1)

# Include the ending div of the hero container before MAIN CONTENT AREA
# The original code looks like:
#                    {/* Right Illustration */}
#                    ...
#                </div>
#            </div>
#
#            {/* 2. MAIN CONTENT AREA (Overlapping the hero) */}
# So we must recreate the closing tags `</div></div>` or just replace from start_marker to just before `</div></div>`

# Wait, let's just use exact regex or string replace for the whole Right Illustration div
# The Right Illustration div is `<div className="hidden lg:block relative w-full max-w-lg"> ... </div>`

new_illustration = """{/* Right Illustration - Morphing Water Blob */}
                    <div className="hidden lg:block relative w-full max-w-lg aspect-square">
                        <style dangerouslySetInnerHTML={{__html: `
                            @keyframes morphBlob {
                                0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                                50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                                100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                            }
                            .animate-morph-blob {
                                animation: morphBlob 12s ease-in-out infinite;
                            }
                            .animate-morph-blob-fast {
                                animation: morphBlob 8s ease-in-out infinite reverse;
                            }
                        `}} />
                        
                        {/* Glowing backdrop matching the blob */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-violet-500 blur-2xl opacity-40 animate-morph-blob-fast scale-105 pointer-events-none" />
                        
                        {/* Main Image Blob */}
                        <div className="absolute inset-0 border-2 border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.3)] overflow-hidden animate-morph-blob relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/30 to-transparent z-10 opacity-70 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="/images/saas_hero.jpg" 
                                alt="Digital Solutions Ecosystem"
                                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
                            />
                            {/* Center abstract icon instead of target */}
                            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                <div className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)] animate-float">
                                    <Target className="w-10 h-10 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements acting as satellites */}
                        <div className="absolute top-10 -left-6 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '0s' }}>
                            <Code2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute bottom-12 -right-4 w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                            <Cloud className="w-7 h-7 text-white" />
                        </div>
                        <div className="absolute -top-4 right-16 w-12 h-12 bg-emerald-500/30 backdrop-blur-xl border border-emerald-500/40 rounded-full flex items-center justify-center shadow-xl animate-float" style={{ animationDelay: '3s' }}>
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </div>

"""

new_content = content[:start_idx] + new_illustration + "\n            " + end_marker + content[end_idx + len(end_marker):]

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Morphing blob added!")
