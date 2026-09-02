import sys

with open('app/globals.css', 'a', encoding='utf-8') as f:
    f.write("\n@keyframes morphBlob {\n    0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }\n    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }\n    100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }\n}\n.animate-morph-blob {\n    animation: morphBlob 12s ease-in-out infinite;\n}\n.animate-morph-blob-fast {\n    animation: morphBlob 8s ease-in-out infinite reverse;\n}\n")
