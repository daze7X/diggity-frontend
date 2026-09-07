import sys
import re

path = "app/about/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix the location text
content = re.sub(r"Tangerang, Indonesia.*?2018", "Sleman, Yogyakarta • Est. 2019", content)

# I also need to fix the English vs Indonesian for the Pillars!
# Currently `pillars` use `settings?.philosophy_build` for BOTH. Let's provide fallback translations if locale == 'en'.
# But wait, if settings?.philosophy_build is filled, it overwrites both.
# We don't have philosophy_build_en in the database.
# To make it truly bilingual without altering the DB again, maybe I can just hardcode the English translations for now?
# Or I can alter the DB and add `philosophy_build_en`, `philosophy_grow_en`, etc.
# But altering the DB takes time and requires another manual SQL run by the user.
# The user just wants it to be English.

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed location text.")
