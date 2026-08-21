const fs = require('fs');
let c = fs.readFileSync('app/products/page.tsx', 'utf-8');
c = c.replace('Masih punya pertanyaan lain?', "{locale === 'en' ? 'Still have questions?' : 'Masih punya pertanyaan lain?'}");
c = c.replace('Tim kami siap membantu menemukan solusi arsitektur digital terbaik untuk bisnis Anda.', "{locale === 'en' ? 'Our team is ready to help find the best digital architecture solution for your business.' : 'Tim kami siap membantu menemukan solusi arsitektur digital terbaik untuk bisnis Anda.'}");
c = c.replace('>Hubungi Tim Kami<', ">{locale === 'en' ? 'Contact Our Team' : 'Hubungi Tim Kami'}<");
fs.writeFileSync('app/products/page.tsx', c, 'utf-8');
