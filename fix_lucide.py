import sys

def modify():
    with open('components/SubServiceIcon.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace Linkedin import
    content = content.replace("Music, Linkedin, Store", "Music, Store")
    
    # Replace the usage
    content = content.replace("'linkedin-ads': Linkedin,", "'linkedin-ads': Users,")

    with open('components/SubServiceIcon.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Fixed Linkedin import error!")

modify()
