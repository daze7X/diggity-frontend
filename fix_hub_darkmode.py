import sys

filepath = 'app/products/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace main bg
content = content.replace('className="min-h-screen bg-white pt-24', 'className="min-h-screen bg-white dark:bg-brand-bg pt-24')

# Replace secondary CTA button
content = content.replace('bg-white text-brand-blue border', 'bg-white dark:bg-transparent text-brand-blue border')

# Hero Image wrapper
content = content.replace('bg-white p-2"', 'bg-white dark:bg-glass-bg p-2"')

# Client Logos Section
content = content.replace('bg-gray-50/50 py-8', 'bg-gray-50/50 dark:bg-brand-bg/50 py-8')
content = content.replace('from-gray-50 to-transparent', 'from-gray-50 dark:from-brand-bg to-transparent')

# Why choose us cards
content = content.replace('bg-gray-50 border', 'bg-gray-50 dark:bg-glass-bg border')

# Catalog Section Bg
content = content.replace('bg-gray-50/50 border-y', 'bg-gray-50/50 dark:bg-transparent border-y')

# Catalog main cards
content = content.replace('bg-white rounded-3xl', 'bg-white dark:bg-glass-bg rounded-3xl')

# Catalog inner sub-product cards
content = content.replace('bg-gray-50 hover:bg-brand-blue/5', 'bg-gray-50 dark:bg-brand-bg/80 hover:bg-brand-blue/5 dark:hover:bg-brand-blue/10')
content = content.replace('bg-white shadow-sm border', 'bg-white dark:bg-transparent shadow-sm border')
content = content.replace('bg-gray-50/50"', 'bg-gray-50/50 dark:bg-transparent"')
content = content.replace('bg-white shadow-sm border', 'bg-white dark:bg-transparent shadow-sm border')

# FAQ Section
content = content.replace('bg-gray-50/50 border-t', 'bg-gray-50/50 dark:bg-transparent border-t')
content = content.replace('bg-white p-8 md:p-10', 'bg-white dark:bg-glass-bg p-8 md:p-10')

# Bottom CTA
content = content.replace('bg-white hover:bg-gray-50 rounded-xl', 'bg-white hover:bg-gray-50 dark:bg-brand-bg dark:hover:bg-glass-bg dark:text-white rounded-xl')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed dark mode colors on main Products Hub page.")
