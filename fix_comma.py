import sys

def fix_comma():
    filepath = 'components/SubServiceIcon.tsx'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the missing comma
    content = content.replace('HelpCircle\n    Wallet', 'HelpCircle,\n    Wallet')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed comma.")

fix_comma()
