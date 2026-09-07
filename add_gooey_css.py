path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\globals.css"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# I will append new animations for the gooey effect
new_animations = """

@keyframes gooeyMove1 {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(150px, -100px) scale(1.2); }
    66% { transform: translate(-100px, 50px) scale(0.8); }
    100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes gooeyMove2 {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(-120px, 120px) scale(0.9); }
    66% { transform: translate(100px, -80px) scale(1.1); }
    100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes gooeyMove3 {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(80px, 150px) scale(1.3); }
    66% { transform: translate(-150px, -100px) scale(0.7); }
    100% { transform: translate(0px, 0px) scale(1); }
}

.animate-gooey-1 {
    animation: morphBlob 15s ease-in-out infinite, gooeyMove1 20s ease-in-out infinite;
}
.animate-gooey-2 {
    animation: morphBlobFast 12s ease-in-out infinite reverse, gooeyMove2 18s ease-in-out infinite;
}
.animate-gooey-3 {
    animation: morphBlob 18s ease-in-out infinite, gooeyMove3 22s ease-in-out infinite;
}
"""

if "@keyframes gooeyMove1" not in content:
    with open(path, "a", encoding="utf-8") as f:
        f.write(new_animations)
    print("Added gooey animations to globals.css")
else:
    print("Gooey animations already exist.")
