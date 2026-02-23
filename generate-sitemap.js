const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.onlygrupos.online';
const SITEMAP_FILE = path.join(__dirname, 'sitemap.xml');

// Files to exclude from the sitemap
const EXCLUDE_FILES = [
    'iframe_test.html',
    'onlymodels-premium.html',
    'pushinpay.html',
    'index.html', // We'll add this manually at the top
];

function generateSitemap() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. Add Home Page (Highest Priority)
    const today = new Date().toISOString().split('T')[0];
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    // 2. Scan Directory for HTML files
    const files = fs.readdirSync(__dirname);
    const htmlFiles = files.filter(file => file.endsWith('.html') && !EXCLUDE_FILES.includes(file));

    // Sort to process Categories first, then Groups
    const categories = htmlFiles.filter(f => f.startsWith('grupos-de-whatsapp-'));
    const groups = htmlFiles.filter(f => f.startsWith('grupo-'));
    const niches = htmlFiles.filter(f => !f.startsWith('grupos-de-whatsapp-') && !f.startsWith('grupo-') && !EXCLUDE_FILES.includes(f) && f !== 'index.html');

    // 3. Add Category Pages
    categories.forEach(file => {
        xml += `  <url>\n`;
        xml += `    <loc>${DOMAIN}/${file}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>daily</changefreq>\n`;
        xml += `    <priority>0.9</priority>\n`; // High priority for category matrix
        xml += `  </url>\n`;
    });

    // 4. Add Group Pages
    niches.forEach(file => {
        xml += `  <url>\n`;
        xml += `    <loc>${DOMAIN}/${file}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
    });

    groups.forEach(file => {
        xml += `  <url>\n`;
        xml += `    <loc>${DOMAIN}/${file}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`; // Standard priority for individual groups
        xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    fs.writeFileSync(SITEMAP_FILE, xml, 'utf8');
    console.log(`✅ Sitemap gerado com sucesso em: ${SITEMAP_FILE}`);
    console.log(`🌐 Total de links indexados: ${1 + categories.length + groups.length + niches.length}`);
}

generateSitemap();
