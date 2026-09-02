import sys

filepath = 'app/products/page.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

bad_import = "import HomeTestimonials from '../../components/HomeTestimonials'; from '../../components/FaqAccordion';"
good_import = "import HomeTestimonials from '../../components/HomeTestimonials';"

if bad_import in content:
    content = content.replace(bad_import, good_import)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed syntax error in imports.")
else:
    print("Could not find the bad import string.")
