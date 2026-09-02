import sys
import re

filepath_sub = 'app/products/[main]/[sub]/page.tsx'
with open(filepath_sub, 'r', encoding='utf-8') as f:
    sub_content = f.read()

# Undo the destructive replace if it was run (it wasn't run yet on the actual file, wait, I haven't run python yet!)

# Clean replace for Sub-category page
sub_content = sub_content.replace('className="min-h-screen bg-gray-50/50', 'className="min-h-screen bg-brand-bg')
sub_content = sub_content.replace('className="bg-brand-blue relative pt-32', 'className="bg-brand-blue dark:bg-brand-bg dark:border-b dark:border-glass-border relative pt-32')
sub_content = sub_content.replace('bg-white rounded-3xl p-8', 'bg-white dark:bg-glass-bg rounded-3xl p-8')
sub_content = sub_content.replace('bg-gray-50 hover:bg-white', 'bg-gray-50 dark:bg-brand-bg hover:bg-white dark:hover:bg-glass-bg')
sub_content = sub_content.replace('bg-gray-100 flex items-center', 'bg-gray-100 dark:bg-white/10 flex items-center')
sub_content = sub_content.replace('bg-white border-t border-glass-border', 'bg-white dark:bg-brand-bg border-t border-glass-border')
sub_content = sub_content.replace('bg-gray-50/50"', 'bg-brand-bg"')

with open(filepath_sub, 'w', encoding='utf-8') as f:
    f.write(sub_content)
print("Fixed sub-category page safely.")

# Clean replace for Navbar.tsx
filepath_nav = 'components/Navbar.tsx'
with open(filepath_nav, 'r', encoding='utf-8') as f:
    nav_content = f.read()

nav_content = nav_content.replace(
    "scrolled || activeDropdown\n                    ? 'bg-brand-bg/85 backdrop-blur-md border-b border-glass-border py-4'\n                    : 'bg-transparent py-6'",
    "scrolled || activeDropdown\n                    ? 'bg-brand-bg/95 backdrop-blur-md border-b border-glass-border py-4'\n                    : 'bg-brand-bg/70 backdrop-blur-md border-b border-glass-border py-4'"
)
nav_content = nav_content.replace(
    "scrolled || activeDropdown ? 'bg-brand-bg/85 backdrop-blur-md border-b border-glass-border py-4' : 'bg-transparent py-6'",
    "scrolled || activeDropdown ? 'bg-brand-bg/95 backdrop-blur-md border-b border-glass-border py-4' : 'bg-brand-bg/70 backdrop-blur-md border-b border-glass-border py-4'"
)
nav_content = nav_content.replace(
    "w-[900px] max-w-[95vw] bg-white \nborder",
    "w-[900px] max-w-[95vw] bg-white dark:bg-brand-bg \nborder"
)
nav_content = nav_content.replace(
    "w-[900px] max-w-[95vw] bg-white border border-glass-border",
    "w-[900px] max-w-[95vw] bg-white dark:bg-brand-bg border border-glass-border"
)

with open(filepath_nav, 'w', encoding='utf-8') as f:
    f.write(nav_content)
print("Fixed Navbar safely.")
