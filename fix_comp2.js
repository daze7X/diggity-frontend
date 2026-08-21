const fs = require('fs');
let c = fs.readFileSync('components/SearchOverlay.tsx', 'utf-8');
c = c.replace('Tidak ada hasil cocok', "{language === 'en' ? 'No matching results' : 'Tidak ada hasil cocok'}");
c = c.replace('Coba ketik kata kunci lain yang berhubungan dengan pengembangan sistem, SEO, hosting, atau digital skill.', "{language === 'en' ? 'Try typing other keywords related to system development, SEO, hosting, or digital skills.' : 'Coba ketik kata kunci lain yang berhubungan dengan pengembangan sistem, SEO, hosting, atau digital skill.'}");
fs.writeFileSync('components/SearchOverlay.tsx', c, 'utf-8');
