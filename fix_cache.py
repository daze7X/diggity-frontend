import sys
import re

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\lib\\api.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Append locale to endpoint to fix Next.js fetch caching by URL
old_fetch = """    const locale = await getLocale();

    const headers: Record<string, string> = {"""
new_fetch = """    const locale = await getLocale();
    const separator = endpoint.includes('?') ? '&' : '?';
    const localizedEndpoint = `${endpoint}${separator}locale=${locale}`;

    const headers: Record<string, string> = {"""

content = content.replace(old_fetch, new_fetch)
content = content.replace("fetch(`${API_URL}${endpoint}`", "fetch(`${API_URL}${localizedEndpoint}`")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed Next.js cache keying for locales.")
