import sys
import re

path = "app/about/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "desc: settings?.philosophy_build || (locale === 'en'",
    "desc: (locale === 'en' ? settings?.philosophy_build_en : settings?.philosophy_build) || settings?.philosophy_build || (locale === 'en'"
)

content = content.replace(
    "desc: settings?.philosophy_grow || (locale === 'en'",
    "desc: (locale === 'en' ? settings?.philosophy_grow_en : settings?.philosophy_grow) || settings?.philosophy_grow || (locale === 'en'"
)

content = content.replace(
    "desc: settings?.philosophy_scale || (locale === 'en'",
    "desc: (locale === 'en' ? settings?.philosophy_scale_en : settings?.philosophy_scale) || settings?.philosophy_scale || (locale === 'en'"
)

content = content.replace(
    "desc: settings?.philosophy_empower || (locale === 'en'",
    "desc: (locale === 'en' ? settings?.philosophy_empower_en : settings?.philosophy_empower) || settings?.philosophy_empower || (locale === 'en'"
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated philosophy.")
