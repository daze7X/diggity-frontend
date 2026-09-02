import sys

filepath = 'app/layout.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add import
if "import BackToTop" not in content:
    content = content.replace(
        "import WhatsAppButton from '../components/WhatsAppButton';",
        "import BackToTop from '../components/BackToTop';\nimport WhatsAppButton from '../components/WhatsAppButton';"
    )

# 2. Add component
if "<BackToTop />" not in content:
    content = content.replace(
        "<WhatsAppButton />",
        "<BackToTop />\n              <WhatsAppButton />"
    )

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Injected BackToTop")
