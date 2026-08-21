const fs = require('fs');
let c = fs.readFileSync('components/BlogList.tsx', 'utf-8');
c = c.replace('placeholder="Cari artikel..."', "placeholder={language === 'en' ? 'Search articles...' : 'Cari artikel...'}");
c = c.replace('>Semua</button>', ">{language === 'en' ? 'All' : 'Semua'}</button>");
c = c.replace('Wawasan Terpopuler', "{language === 'en' ? 'POPULAR INSIGHTS' : 'WAWASAN TERPOPULER'}");
c = c.replace('Trending di Diggity', "{language === 'en' ? 'Trending at Diggity' : 'Trending di Diggity'}");
fs.writeFileSync('components/BlogList.tsx', c, 'utf-8');
