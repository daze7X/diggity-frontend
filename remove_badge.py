import sys
import re

filepath = 'app/products/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Define the block to be removed
badge_pattern = r'\{\/\* Floating Tech Badge \(Floating parallax effect\) \*\/\}.*?<\/div>\s*<\/div>'

# Use DOTALL to match across newlines
content = re.sub(badge_pattern, '', content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Tech badge label removed successfully.")
