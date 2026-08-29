import sys
import re

def modify():
    filepath = 'lib/api.ts'
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace fetch call
    old_fetch = """    const res = await fetch(`${API_URL}${endpoint}`, {
        headers,
        ...options,
    });"""
    
    new_fetch = """    const res = await fetch(`${API_URL}${endpoint}`, {
        headers,
        ...options,
        next: { revalidate: options?.next?.revalidate ?? 60 }
    });"""
    
    if old_fetch in content:
        content = content.replace(old_fetch, new_fetch)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Updated fetchAPI to use next: { revalidate: 60 }")
    else:
        print("Could not find fetch call.")

modify()
