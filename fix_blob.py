import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\globals.css"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_css = """@keyframes morphBlob {
    0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
}
.animate-morph-blob {
    animation: morphBlob 12s ease-in-out infinite;
}
.animate-morph-blob-fast {
    animation: morphBlob 8s ease-in-out infinite reverse;
}"""

new_css = """@keyframes morphBlob {
    0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0, 0) scale(1) rotate(0deg); }
    25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translate(25px, -35px) scale(1.05) rotate(15deg); }
    50% { border-radius: 70% 30% 40% 60% / 40% 70% 60% 30%; transform: translate(-20px, 25px) scale(0.95) rotate(-10deg); }
    75% { border-radius: 40% 70% 60% 30% / 70% 40% 30% 60%; transform: translate(35px, 15px) scale(1.1) rotate(20deg); }
    100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translate(0, 0) scale(1) rotate(0deg); }
}

@keyframes morphBlobFast {
    0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: translate(0, 0) scale(1) rotate(0deg); }
    33% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; transform: translate(-30px, 20px) scale(1.1) rotate(-15deg); }
    66% { border-radius: 50% 50% 60% 40% / 50% 40% 60% 60%; transform: translate(20px, -20px) scale(0.9) rotate(10deg); }
    100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: translate(0, 0) scale(1) rotate(0deg); }
}

.animate-morph-blob {
    animation: morphBlob 16s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
.animate-morph-blob-fast {
    animation: morphBlobFast 12s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse;
}"""

# Fallback regex if whitespace differs slightly
if old_css in content:
    content = content.replace(old_css, new_css)
else:
    pattern = re.compile(r'@keyframes morphBlob \{.*?\.animate-morph-blob-fast \{.*?\}', re.DOTALL)
    content = pattern.sub(new_css, content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated globals.css with lava lamp blob.")
