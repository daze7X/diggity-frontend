import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\app\\page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# I will extract the plasma SVG and Chamber, and then remove it from its current position
plasma_regex = re.compile(r'(\s*\{\/\* SVG Filter for Giant Plasma Effect \*\/.*?<\/div>\n)', re.DOTALL)
plasma_match = plasma_regex.search(content)

if plasma_match:
    plasma_block = plasma_match.group(1)
    
    # Remove it from the current position
    content = content.replace(plasma_block, "")
    
    # Update the filter bounds so it doesn't clip the plasma when it stretches far
    plasma_block = plasma_block.replace('<filter id="goo-plasma">', '<filter id="goo-plasma" x="-50%" y="-50%" width="200%" height="200%">')
    
    # Insert it right before the max-w-7xl container
    target_anchor = '<div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">'
    content = content.replace(target_anchor, plasma_block + "\n                " + target_anchor)
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully repositioned the Giant Plasma Chamber to span the entire background.")
else:
    print("Could not find plasma block.")
