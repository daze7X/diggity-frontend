path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\globals.css"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

plasma_animations = """

/* AGGRESSIVE PLASMA ANIMATIONS */
@keyframes plasmaCore {
    0% { transform: scale(1) translate(0, 0) rotate(0deg); border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
    50% { transform: scale(1.3) translate(-80px, 50px) rotate(180deg); border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
    100% { transform: scale(1) translate(0, 0) rotate(360deg); border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
}

@keyframes plasmaSplit1 {
    0% { transform: translate(0, 0) scale(1) scaleX(1); }
    20% { transform: translate(-400px, -300px) scale(0.6) scaleX(1.8); }
    40% { transform: translate(-600px, 200px) scale(0.4) scaleX(1); }
    60% { transform: translate(300px, -400px) scale(0.9) scaleX(2.5); }
    80% { transform: translate(500px, 300px) scale(0.5) scaleX(1.3); }
    100% { transform: translate(0, 0) scale(1) scaleX(1); }
}

@keyframes plasmaSplit2 {
    0% { transform: translate(0, 0) scale(1) scaleY(1); }
    25% { transform: translate(500px, 400px) scale(0.7) scaleY(2.2); }
    50% { transform: translate(-300px, 500px) scale(0.4) scaleY(1); }
    75% { transform: translate(-500px, -200px) scale(1.1) scaleY(1.6); }
    100% { transform: translate(0, 0) scale(1) scaleY(1); }
}
"""

if "plasmaCore" not in content:
    with open(path, "a", encoding="utf-8") as f:
        f.write(plasma_animations)
    print("Injected Plasma animations into globals.css")
else:
    print("Plasma animations already exist.")
