path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\globals.css"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

global_scrollbar_css = """
/* Global Custom Scrollbar (Thin, Square, Blue) */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-track {
    background: #f1f5f9;
}
.dark ::-webkit-scrollbar-track {
    background: #020617;
}
::-webkit-scrollbar-thumb {
    background: #2563eb; /* brand-blue */
    border-radius: 0px; /* Square edges */
}
::-webkit-scrollbar-thumb:hover {
    background: #1e40af; /* darker blue on hover */
}
.dark ::-webkit-scrollbar-thumb {
    background: #3b82f6;
}
.dark ::-webkit-scrollbar-thumb:hover {
    background: #60a5fa;
}
"""

if "Global Custom Scrollbar" not in content:
    with open(path, "a", encoding="utf-8") as f:
        f.write(global_scrollbar_css)
    print("Successfully added global custom scrollbar to globals.css")
else:
    print("Global scrollbar styles already exist.")
