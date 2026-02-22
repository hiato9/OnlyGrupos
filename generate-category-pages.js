const fs = require('fs');

const categories = [
    "Cdzinhas",
    "Gays",
    "Cornos",
    "Modelos",
    "Trans",
    "Vazadas",
    "Putaria 24h",
    "Amizade"
];

function generateSlug(name) {
    return name.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

let templateHtml = fs.readFileSync('index.html', 'utf8');

let generatedCount = 0;

categories.forEach(category => {
    let slug = generateSlug(category);
    let fileName = `grupos-de-whatsapp-${slug}.html`;

    let html = templateHtml;

    // 1. Update Title
    let seoTitle = `${category} - Melhores Grupos de WhatsApp e Telegram +18`;
    html = html.replace(
        '<title>OnlyGrupos - Melhores Grupos de WhatsApp e Telegram</title>',
        `<title>${seoTitle}</title>`
    );
    // If not found, try generic replacement
    html = html.replace(/<title>.*?<\/title>/, `<title>${seoTitle}</title>`);

    // 2. Inject Meta Description and JSON-LD Schema
    let seoDesc = `Encontre os melhores links de grupos de WhatsApp e Telegram focados em ${category}. Lista 100% atualizada 2026.`;

    // JSON-LD Schema
    let schema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Grupos de ${category}",
      "description": "${seoDesc}",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Veja nossos grupos em destaque de ${category}"
        }
      ]
    }
    </script>
    `;

    // Try injecting before </head>
    html = html.replace('</head>', `    <meta name="description" content="${seoDesc}">\n${schema}\n</head>`);

    // 3. Inject javascript variable to pre-load category
    let jsInjection = `<script>window.INITIAL_CATEGORY = "${category}";</script>\n    <script src="script.js`;
    html = html.replace('<script src="script.js', jsInjection);

    // 4. Inject hidden SEO text right after <body>
    let seoText = `
    <article style="position:absolute; left:-9999px; top:-9999px; width:1px; height:1px; overflow:hidden;">
        <h1>Grupos de WhatsApp ${category}</h1>
        <p>Bem-vindo ao buscador de links de ${category}. Se você procura os melhores e mais atualizados links para entrar agora, você está no lugar certo.</p>
    </article>
    `;
    html = html.replace('<body>', `<body>\n${seoText}`);

    fs.writeFileSync(fileName, html);
    generatedCount++;
    console.log("Created: " + fileName);
});

console.log(`Successfully generated ${generatedCount} category pages!`);
