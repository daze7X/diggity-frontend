import sys

path = "D:\\SEMESTER 6\\PKL\\diggity-frontend\\lib\\api.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "philosophy_build?: string;\n    philosophy_grow?: string;\n    philosophy_scale?: string;\n    philosophy_empower?: string;",
    "philosophy_build?: string;\n    philosophy_grow?: string;\n    philosophy_scale?: string;\n    philosophy_empower?: string;\n    philosophy_build_en?: string;\n    philosophy_grow_en?: string;\n    philosophy_scale_en?: string;\n    philosophy_empower_en?: string;"
)

content = content.replace(
    "history_timeline?: Array<{ year: string; title: string; desc: string }>;",
    "history_timeline?: Array<{ year: string; title: string; desc: string; title_en?: string; desc_en?: string }>;"
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed TS types.")
