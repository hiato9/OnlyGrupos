const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const matrix = [
    // Geo
    { filename: 'grupos-de-whatsapp-sao-paulo', title: 'Grupos de WhatsApp São Paulo (+18)', kw: 'são paulo, sp, putaria sp' },
    { filename: 'grupos-de-whatsapp-rio-de-janeiro', title: 'Grupos de WhatsApp Rio de Janeiro (+18)', kw: 'rio de janeiro, rj, carioca' },
    { filename: 'grupos-de-whatsapp-minas-gerais', title: 'Grupos de WhatsApp Minas Gerais (+18)', kw: 'minas gerais, mg, belo horizonte' },
    { filename: 'grupos-de-whatsapp-bahia', title: 'Grupos de WhatsApp Bahia (+18)', kw: 'bahia, ba, salvador' },
    { filename: 'grupos-de-whatsapp-parana', title: 'Grupos de WhatsApp Paraná (+18)', kw: 'paraná, pr, curitiba' },
    { filename: 'grupos-de-whatsapp-rio-grande-do-sul', title: 'Grupos de WhatsApp Rio Grande do Sul (+18)', kw: 'rio grande do sul, rs, gauchas' },
    { filename: 'grupos-de-whatsapp-santa-catarina', title: 'Grupos de WhatsApp Santa Catarina (+18)', kw: 'santa catarina, sc, florianopolis' },
    { filename: 'grupos-de-whatsapp-pernambuco', title: 'Grupos de WhatsApp Pernambuco (+18)', kw: 'pernambuco, pe, recife' },
    { filename: 'grupos-de-whatsapp-ceara', title: 'Grupos de WhatsApp Ceará (+18)', kw: 'ceará, ce, fortaleza' },
    { filename: 'grupos-de-whatsapp-distrito-federal', title: 'Grupos de WhatsApp Distrito Federal (+18)', kw: 'distrito federal, df, brasilia' },
    { filename: 'grupos-de-whatsapp-goias', title: 'Grupos de WhatsApp Goiás (+18)', kw: 'goiás, go, goiania' },

    // Niche
    { filename: 'grupos-de-whatsapp-18-ativos', title: 'Grupos de WhatsApp +18 Ativos', kw: '+18, ativos, maiores, adultos, 2026' },
    { filename: 'links-de-grupos-privados-2026', title: 'Links de Grupos Privados 2026', kw: 'links, privados, 2026, atualizados' },
    { filename: 'grupos-telegram-privacy-vazados', title: 'Grupos Telegram Privacy Vazados', kw: 'telegram, privacy, vazados, gratis' },
    { filename: 'grupos-de-whatsapp-sem-censura', title: 'Grupos de WhatsApp Sem Censura', kw: 'sem censura, nudes, sem limites' },
    { filename: 'grupos-de-putaria-gratis-2026', title: 'Grupos de Putaria Grátis 2026', kw: 'putaria, gratis, free, sem pagar' },
    { filename: 'melhores-grupos-de-whatsapp-18', title: 'Os Melhores Grupos de WhatsApp +18', kw: 'melhores, tops, +18, top 10' }
];

let count = 0;
matrix.forEach(target => {
    let html = indexHtml;

    // Replace <title>
    html = html.replace(/<title>.*?<\/title>/, `<title>${target.title} - Links Atualizados 2026</title>`);

    // Replace description
    html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="Encontre os melhores ${target.title}. Entre grátis em comunidades vips e receba conteúdo inédito diariamente. Links 100% ativos!">`);

    // Replace keywords
    html = html.replace(/<meta name="keywords" content=".*?">/, `<meta name="keywords" content="${target.kw}, grupos whatsapp, telegram, links ativos">`);

    // Fix canonical if present
    html = html.replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="https://onlygrupos.online/${target.filename}.html">`);

    // Add Deep Content SEO Block exactly like the category files did
    const parts = html.split('</body>');
    const catSeoBlock = `
    <!-- Matrix SEO Block -->
    <div class="seo-faq-section" style="max-width: 1200px; margin: 40px auto 20px; padding: 20px 15px; border-top: 1px solid #222; text-align: center;">
        <h2 style="color: #555; font-size: 1rem; margin-bottom: 10px;">Encontre ${target.title}</h2>
        <p style="color: #444; font-size: 0.8rem; line-height: 1.5; max-width: 800px; margin: 0 auto;">Nesta página reservada, você encontra a seleção mais atualizada de <strong>${target.title}</strong> da internet em 2026. Nossa inteligência testa e entrega apenas os melhores fluxos para você acessar direto do celular. O acesso aos grupos listados na grade acima é 100% ativo, seguro e mantido remotamente focado em <em>${target.kw}</em>. Role a página, explore as categorias de OnlyFans e Privacy, e escolha onde entrar hoje mesmo.</p>
    </div>
        `;
    html = parts[0] + catSeoBlock + '\n</body>' + parts[1];

    // Inject schema update
    html = html.replace(/"name":\s*".*?"/, `"name": "${target.title} - Links Atualizados 2026"`);
    html = html.replace(/"description":\s*".*?"/, `"description": "Encontre os melhores ${target.title}. Entre grátis em comunidades vips e receba conteúdo inédito diariamente. Links 100% ativos!"`);
    html = html.replace(/"url":\s*".*?"/, `"url": "https://onlygrupos.online/${target.filename}.html"`);

    fs.writeFileSync(`${target.filename}.html`, html);
    count++;
});

// Update generate-sitemap.js to capture niche files
let mapJs = fs.readFileSync('generate-sitemap.js', 'utf8');
if (!mapJs.includes('const niches')) {
    mapJs = mapJs.replace(
        "const groups = htmlFiles.filter(f => f.startsWith('grupo-'));",
        "const groups = htmlFiles.filter(f => f.startsWith('grupo-'));\n    const niches = htmlFiles.filter(f => !f.startsWith('grupos-de-whatsapp-') && !f.startsWith('grupo-') && !EXCLUDE_FILES.includes(f) && f !== 'index.html');"
    );
    mapJs = mapJs.replace(
        "groups.forEach(file => {",
        "niches.forEach(file => {\n        xml += `  <url>\\n`;\n        xml += `    <loc>\${DOMAIN}/\${file}</loc>\\n`;\n        xml += `    <lastmod>\${today}</lastmod>\\n`;\n        xml += `    <changefreq>weekly</changefreq>\\n`;\n        xml += `    <priority>0.8</priority>\\n`;\n        xml += `  </url>\\n`;\n    });\n\n    groups.forEach(file => {"
    );
    mapJs = mapJs.replace(
        "console.log(`🌐 Total de links indexados: ${1 + categories.length + groups.length}`);",
        "console.log(`🌐 Total de links indexados: ${1 + categories.length + groups.length + niches.length}`);"
    );
    fs.writeFileSync('generate-sitemap.js', mapJs);
}

console.log(`✅ Generated ${count} Geographic & Niche Matrix pages!`);
