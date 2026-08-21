const fs = require('fs');
let c = fs.readFileSync('components/PortfolioList.tsx', 'utf-8');
c = c.replace("import { Code, ArrowRight } from 'lucide-react';", "import { Code, ArrowRight } from 'lucide-react';\nimport { useLanguage } from '../context/LanguageContext';");
c = c.replace("export default function PortfolioList({ portfolios, categories }: PortfolioListProps) {", "export default function PortfolioList({ portfolios, categories }: PortfolioListProps) {\n    const { language } = useLanguage();");
c = c.replace(">Semua<", ">{language === 'en' ? 'All' : 'Semua'}<");
c = c.replace(">Semua<", ">{language === 'en' ? 'All' : 'Semua'}<");
fs.writeFileSync('components/PortfolioList.tsx', c, 'utf-8');
