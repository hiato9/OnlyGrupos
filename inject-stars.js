const fs = require('fs');

// 1. Inject into script.js
let scriptContent = fs.readFileSync('script.js', 'utf8');
if (!scriptContent.includes('fa-star')) {
    const starSnippet = `
            <div class="group-title mb-1">\${group.name}</div>
            <div class="text-warning mb-2" style="font-size: 0.85rem; font-weight: bold;">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                <span class="text-muted small ms-1" style="font-weight: 500;">(\${(4.6 + (group.link ? group.link.length % 4 : group.name.length % 4) / 10).toFixed(1)}) \${240 + ((group.link ? group.link.length : group.name.length) * 13) % 400} avaliações</span>
            </div>`;

    scriptContent = scriptContent.replace(
        '<div class="group-title">${group.name}</div>',
        starSnippet
    );
    fs.writeFileSync('script.js', scriptContent);
    console.log('✅ Injected UI stars into script.js cards');
}

// 2. Inject into all 36 group HTML pages
const files = fs.readdirSync(__dirname).filter(f => f.startsWith('grupo-') && f.endsWith('.html'));

let injectedHtmlCount = 0;
files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');

    if (html.includes('fa-star')) return;

    const ratingDec = (4.6 + (file.length % 4) / 10).toFixed(1);
    const reviewsCount = 240 + (file.length * 13) % 400;

    const htmlStarSnippet = `
                    <div class="text-warning mb-3" style="font-size: 1.1rem; font-weight: bold; margin-top: -10px;">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                        <span class="text-muted fs-6 ms-1" style="font-weight: 500;">(${ratingDec}) ${reviewsCount} avaliações</span>
                    </div>`;

    html = html.replace(/(<h2 id="modalGroupName"[\s\S]*?<\/h2>)/i, `$1\n${htmlStarSnippet}`);

    fs.writeFileSync(file, html);
    injectedHtmlCount++;
});

console.log(`✅ Injected HTML UI stars into ${injectedHtmlCount} static group pages.`);
