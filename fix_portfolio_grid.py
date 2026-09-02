import sys

filepath = 'components/PortfolioList.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

old_block = """            {/* Portfolios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredPortfolios.length > 0 ? (
                    filteredPortfolios.map((portfolio, index) => {
                        const isWide = index % 3 === 0;
                        return (
                            <Link
                                key={portfolio.id}
                                href={`/portfolio/${portfolio.slug}`}
                                className={`block text-left group ${
                                    isWide ? 'md:col-span-2' : 'md:col-span-1'
                                }`}
                            >"""

new_block = """            {/* Portfolios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPortfolios.length > 0 ? (
                    filteredPortfolios.map((portfolio, index) => {
                        return (
                            <Link
                                key={portfolio.id}
                                href={`/portfolio/${portfolio.slug}`}
                                className="block text-left group"
                            >"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully replaced bento grid with symmetric grid.")
else:
    print("Could not find the target block to replace.")
