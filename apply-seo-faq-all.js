const fs = require('fs');

const generateScript = fs.readFileSync('generate-seo-pages.js', 'utf8');
const match = generateScript.match(/const groups = (\[[\s\S]*?\]);/);
let groups = [];
if (match) {
    groups = eval(match[1]);
}

function generateSlug(name) {
    return name.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

const files = fs.readdirSync(__dirname).filter(f => f.startsWith('grupo-') && f.endsWith('.html'));

let count = 0;
files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    const parts = html.split('VOLTAR PARA A BUSCA</a>');

    if (parts.length >= 2) {
        const nameMatch = parts[0].match(/<h2 id="modalTitle">(.*?)<\/h2>/);
        const groupName = nameMatch ? nameMatch[1].trim() : 'este grupo VIP';

        const currentGroup = groups.find(g => generateSlug(g.name) === generateSlug(groupName));
        const category = currentGroup ? currentGroup.category : '';

        let related = groups.filter(g => g.category === category && g.id !== (currentGroup ? currentGroup.id : -1));
        
        if (related.length < 6) {
            let others = groups.filter(g => g.category !== category && g.id !== (currentGroup ? currentGroup.id : -1));
            others.sort(() => 0.5 - Math.random());
            related = related.concat(others.slice(0, 6 - related.length));
        }

        related.sort(() => 0.5 - Math.random());
        related = related.slice(0, 6);

        let relatedHtml = `
                <!-- Related Groups Section -->
                <div class="related-groups-section" style="margin-top: 25px; margin-bottom: 20px; text-align: left;">
                    <h3 style="color: #229ED9; font-size: 0.85rem; font-weight: 800; text-transform: uppercase;">🔥 Veja Também</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; padding-bottom: 8px; margin-top: 10px;">`;

        related.forEach(rg => {
            let prefix = rg.type === 'whatsapp' ? 'grupo-whatsapp' : 'grupo-telegram';
            let slug = generateSlug(rg.name);
            let fileName = `${prefix}-${slug}.html`;
            relatedHtml += `
                        <a href="${fileName}" style="background: #1A1A1A; border: 1px solid #333; padding: 10px; border-radius: 8px; text-decoration: none; display: flex; flex-direction: column; justify-content: center; transition: border-color 0.2s;" onmouseover="this.style.borderColor='#229ED9'" onmouseout="this.style.borderColor='#333'">
                           <span style="color: #fff; font-size: 0.75rem; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">${rg.name}</span>
                           <span style="color: #888; font-size: 0.65rem; margin-top: 4px;">${rg.category}</span>
                        </a>`;
        });

        relatedHtml += `
                    </div>
                </div>`;

        const newSeoBlock = `
                <!-- SEO Deep Content FAQ -->
                <details class="seo-faq-section mt-4" style="border-top: 1px solid #333; padding-top: 15px; cursor: pointer; outline: none;">
                    <summary style="font-size: 0.85rem; color: #888; font-weight: 600; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center; transition: color 0.3s ease;" onmouseover="this.style.color='#229ED9'" onmouseout="this.style.color='#888'">
                        <span style="display: flex; align-items: center; gap: 8px;"><span style="font-size: 1.1rem;">💬</span> Dúvidas Frequentes (FAQ)</span>
                        <span style="font-size: 0.7rem; color: #555;">▼</span>
                    </summary>
                    <div style="margin-top: 15px; text-align: left; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                        <div style="margin-bottom: 12px;">
                            <strong style="color: #229ED9; font-size: 0.8rem; display: block; margin-bottom: 4px;">Como acessar o grupo ${groupName}?</strong>
                            <p style="color: #aaa; font-size: 0.75rem; line-height: 1.5; margin: 0;">O link oficial e seguro para entrar no canal do Telegram do grupo <strong>${groupName}</strong> está disponível no botão azul acima. Clique para ser redirecionado imediatamente.</p>
                        </div>
                        <div style="margin-bottom: 12px;">
                            <strong style="color: #229ED9; font-size: 0.8rem; display: block; margin-bottom: 4px;">Quais conteúdos vou encontrar lá dentro?</strong>
                            <p style="color: #aaa; font-size: 0.75rem; line-height: 1.5; margin: 0;">Este é um grupo verificado da nossa plataforma. Você encontrará mídia em alta definição, fotos originais e conteúdos vazados exclusivos que não estão disponíveis em redes abertas.</p>
                        </div>
                        <div style="margin-bottom: 0;">
                            <strong style="color: #229ED9; font-size: 0.8rem; display: block; margin-bottom: 4px;">As regras do chat são rigorosas?</strong>
                            <p style="color: #aaa; font-size: 0.75rem; line-height: 1.5; margin: 0;">Sim. Para manter a qualidade do material VIP, exigimos respeito absoluto entre todos os membros inscritos. Menores de 18 anos são terminantemente proibidos.</p>
                        </div>
                    </div>
                </details>
                <style>
                    details.seo-faq-section summary::-webkit-details-marker { display: none; }
                </style>`;

        html = parts[0] + 'VOLTAR PARA A BUSCA</a>\n' + relatedHtml + '\n' + newSeoBlock + '\n            </div>\n        </div>\n    </div>\n</body>\n</html>';

        fs.writeFileSync(file, html);
        count++;
    }
});

const catFiles = fs.readdirSync(__dirname).filter(f => f.startsWith('grupos-de-whatsapp') && f.endsWith('.html'));
catFiles.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');

    const parts = html.split('</body>');
    const hasFaq = html.includes('seo-faq-section');
    if (parts.length === 2) {
        let cleanHtmlStr = parts[0];
        if (hasFaq) {
            cleanHtmlStr = cleanHtmlStr.split('<!-- Category SEO Block -->')[0];
        }

        const titleMatch = cleanHtmlStr.match(/<title>(.*?)<\/title>/);
        let catName = titleMatch ? titleMatch[1].replace('Grupos de WhatsApp ', '') : 'Categoria VIP';
        catName = catName.split('-')[0].trim();

        const catSeoBlock = `
    <!-- Category SEO Block -->
    <div class="seo-faq-section" style="max-width: 1200px; margin: 40px auto 20px; padding: 20px 15px; border-top: 1px solid #222; text-align: center;">
        <h2 style="color: #555; font-size: 1rem; margin-bottom: 10px;">Sobre os Grupos de ${catName}</h2>
        <p style="color: #444; font-size: 0.8rem; line-height: 1.5; max-width: 800px; margin: 0 auto;">Nesta categoria, você encontra uma seleção premium e atualizada diariamente dos melhores links de <strong>Grupos de ${catName}</strong> para Telegram em 2026. Nossa plataforma garante que os links estejam ativos e verificados. Se você busca conteúdos vazados, exclusividades do Privacy e OnlyFans, explore as opções acima e junte-se à nossa comunidade 100% gratuita.</p>
    </div>
        `;

        html = cleanHtmlStr + catSeoBlock + '\n</body>' + parts[1];
        fs.writeFileSync(file, html);
        count++;
    }
});

console.log('✅ Mass injected SEO Accordions & Related Groups into ' + count + ' files!');
