const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

let injectedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Skip if already injected
    if (content.includes('application/ld+json')) return;

    // Extract Title dynamically
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : 'OnlyGrupos Premium';

    // Extract Description dynamically
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    const description = descMatch ? descMatch[1] : 'Os melhores grupos premium do Brasil.';

    let schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": `https://onlygrupos.online/${file}`
    };

    // If it's the home page, treat it as the main WebSite root schema
    if (file === 'index.html') {
        schema["@type"] = "WebSite";
        schema.url = "https://onlygrupos.online/";
    }

    const schemaScript = `    <script type="application/ld+json">\n    ${JSON.stringify(schema, null, 4)}\n    </script>\n`;

    // Inject right before </head>
    content = content.replace('</head>', `${schemaScript}</head>`);

    fs.writeFileSync(file, content);
    injectedCount++;
});

console.log(`✅ JSON-LD Schema Markup injected into ${injectedCount} HTML files.`);
