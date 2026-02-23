const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove the old basic schema if it exists
    content = content.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');

    // 2. Extract Title and Description dynamically
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : 'OnlyGrupos Premium';

    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    const description = descMatch ? descMatch[1] : 'Acesso VIP aos melhores grupos do Brasil.';

    let schemas = [];

    // 3. Logic to inject the 'God Tier' schemas based on the page type
    if (file === 'index.html') {
        // HOME PAGE: Brand Authority
        schemas.push({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "OnlyGrupos",
            "url": "https://onlygrupos.online/",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://onlygrupos.online/?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        });
        schemas.push({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "OnlyGrupos",
            "url": "https://onlygrupos.online/",
            "logo": "https://onlygrupos.online/images/onlygrupos-logo.png"
        });
    }
    else if (file.startsWith('grupos-de-whatsapp-')) {
        // CATEGORY PAGES: Collection
        schemas.push({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": title,
            "description": description,
            "url": `https://onlygrupos.online/${file}`
        });
    }
    else if (file.startsWith('grupo-')) {
        // INDIVIDUAL GROUP PAGES: The 'Star Rating' Hack
        // We generate a deterministic fake rating based on the filename length so it stays constant for SEO
        const rating = (4.6 + (file.length % 4) / 10).toFixed(1); // Between 4.6 and 4.9
        const reviews = 240 + (file.length * 13) % 400; // Between 240 and 640 reviews

        schemas.push({
            "@context": "https://schema.org",
            "@type": "Product", // Maintains the "Product" identity for SEO indexing, but without fake reviews
            "name": title,
            "description": description,
            "url": `https://onlygrupos.online/${file}`
        });
    }
    else {
        // FALLBACK: onlymodels-premium.html, etc.
        schemas.push({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "url": `https://onlygrupos.online/${file}`
        });
    }

    // 4. Inject into code (handling arrays of schemas)
    const schemaScript = `    <script type="application/ld+json">\n    ${JSON.stringify(schemas, null, 4)}\n    </script>\n`;

    // Inject right before </head>
    content = content.replace('</head>', `${schemaScript}</head>`);

    fs.writeFileSync(file, content);
});

console.log(`✅ MODO DEUS ATIVADO: Advanced Schema injection completed in ${files.length} HTML files.`);
