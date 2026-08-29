import sys

def fix():
    filepath = 'app/products/page.tsx'
    with open(filepath, 'rb') as f:
        content = f.read()

    # The file has a mix of utf-8 and utf-16le at the end.
    # Let's just decode it ignoring errors, split by '}', and keep everything up to the last '}'
    text = content.decode('utf-8', errors='ignore')
    
    last_brace_idx = text.rfind('}')
    if last_brace_idx != -1:
        clean_text = text[:last_brace_idx+1] + '\n'
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(clean_text)
        print("Fixed file.")
    else:
        print("Couldn't find closing brace.")

fix()
