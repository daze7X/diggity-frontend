import sys

def modify():
    with open('app/solutions/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    old_fetch = """    let allServices: Service[] = [];
    try {
        allServices = await api.getSolutions();
    } catch {
        // fallback: empty
    }"""
    
    new_fetch = """    let allServices: Service[] = [];
    let faqs: Faq[] = [];
    try {
        const [servicesRes, faqsRes] = await Promise.all([
            api.getSolutions(),
            api.getFaqs()
        ]);
        allServices = servicesRes || [];
        faqs = faqsRes || [];
    } catch {
        // fallback: empty
    }"""

    if old_fetch in content:
        content = content.replace(old_fetch, new_fetch)
        print("Updated fetch block successfully.")
    else:
        print("Could not find old fetch block.")
        
    with open('app/solutions/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)

modify()
