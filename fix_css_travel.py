path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\globals.css"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_animations = """@keyframes gooeyMove1 {
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
}"""

new_animations = """@keyframes gooeyMove1 {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(300px, 100px) scale(1.2); }
    66% { transform: translate(-100px, 200px) scale(0.8); }
    100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes gooeyMove2 {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(-300px, -150px) scale(0.9); }
    66% { transform: translate(-50px, -250px) scale(1.1); }
    100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes gooeyMove3 {
    0% { transform: translate(0px, 0px) scale(1); }
    25% { transform: translate(250px, -150px) scale(1.3); }
    50% { transform: translate(300px, 150px) scale(0.9); }
    75% { transform: translate(-250px, 100px) scale(1.1); }
    100% { transform: translate(0px, 0px) scale(1); }
}"""

content = content.replace(old_animations, new_animations)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Expanded travel distances in globals.css")
