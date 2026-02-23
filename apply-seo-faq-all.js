const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.startsWith('grupo-') && f.endsWith('.html'));

let count = 0;
files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');

    const parts = html.split('VOLTAR PARA A BUSCA</a>');

    // Safety check just in case
    if (parts.length === 2) {
        // Extract group name
        const nameMatch = parts[0].match(/<h2 id="modalTitle">(.*?)<\/h2>/);
        const groupName = nameMatch ? nameMatch[1].trim() : 'este grupo VIP';

        const newSeoBlock = `
                <!-- SEO Deep Content FAQ -->
                <details class="seo-faq-section mt-4" style="border-top: 1px solid #333; padding-top: 15px; cursor: pointer; outline: none;">
                    <summary style="font-size: 0.85rem; color: #888; font-weight: 600; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center; transition: color 0.3s ease;" onmouseover="this.style.color='#00e676'" onmouseout="this.style.color='#888'">
                        <span style="display: flex; align-items: center; gap: 8px;"><span style="font-size: 1.1rem;">💬</span> Dúvidas Frequentes (FAQ)</span>
                        <span style="font-size: 0.7rem; color: #555;">▼</span>
                    </summary>
                    <div style="margin-top: 15px; text-align: left; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                        <div style="margin-bottom: 12px;">
                            <strong style="color: #00e676; font-size: 0.8rem; display: block; margin-bottom: 4px;">Como acessar o grupo ${groupName}?</strong>
                            <p style="color: #aaa; font-size: 0.75rem; line-height: 1.5; margin: 0;">O link oficial e seguro para entrar no canal do Telegram e WhatsApp do grupo <strong>${groupName}</strong> está disponível no botão verde acima. Clique para ser redirecionado imediatamente.</p>
                        </div>
                        <div style="margin-bottom: 12px;">
                            <strong style="color: #00e676; font-size: 0.8rem; display: block; margin-bottom: 4px;">Quais conteúdos vou encontrar lá dentro?</strong>
                            <p style="color: #aaa; font-size: 0.75rem; line-height: 1.5; margin: 0;">Este é um grupo verificado da nossa plataforma. Você encontrará mídia em alta definição, fotos originais e conteúdos vazados exclusivos que não estão disponíveis em redes abertas.</p>
                        </div>
                        <div style="margin-bottom: 0;">
                            <strong style="color: #00e676; font-size: 0.8rem; display: block; margin-bottom: 4px;">As regras do chat são rigorosas?</strong>
                            <p style="color: #aaa; font-size: 0.75rem; line-height: 1.5; margin: 0;">Sim. Para manter a qualidade do material VIP, exigimos respeito absoluto entre todos os membros inscritos. Menores de 18 anos são terminantemente proibidos.</p>
                        </div>
                    </div>
                </details>
                <style>
                    details.seo-faq-section summary::-webkit-details-marker { display: none; }
                </style>`;

        // Reconstruct perfectly and safely, overriding any previous injection issues
        html = parts[0] + 'VOLTAR PARA A BUSCA</a>\n' + newSeoBlock + '\n            </div>\n        </div>\n    </div>\n</body>\n</html>';

        fs.writeFileSync(file, html);
        count++;
    }
});

// Now do the same for categories (grupos-de-whatsapp-...)
const catFiles = fs.readdirSync(__dirname).filter(f => f.startsWith('grupos-de-whatsapp') && f.endsWith('.html'));
catFiles.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');

    // The category pages have a `.pagination-container` before `</body>`
    // We can inject the SEO text at the very bottom, right before `</body>`
    const parts = html.split('</body>');
    if (parts.length === 2 && !html.includes('seo-faq-section')) {
        const titleMatch = html.match(/<title>(.*?)<\/title>/);
        let catName = titleMatch ? titleMatch[1].replace('Grupos de WhatsApp ', '') : 'Categoria VIP';
        catName = catName.split('-')[0].trim(); // Get clean name

        const catSeoBlock = `
    <!-- Category SEO Block -->
    <div class="seo-faq-section" style="max-width: 1200px; margin: 40px auto 20px; padding: 20px 15px; border-top: 1px solid #222; text-align: center;">
        <h2 style="color: #555; font-size: 1rem; margin-bottom: 10px;">Sobre os Grupos de ${catName}</h2>
        <p style="color: #444; font-size: 0.8rem; line-height: 1.5; max-width: 800px; margin: 0 auto;">Nesta categoria, você encontra uma seleção premium e atualizada diariamente dos melhores links de <strong>Grupos de ${catName}</strong> para WhatsApp e Telegram em 2026. Nossa plataforma garante que os links estejam ativos e verificados. Se você busca conteúdos vazados, exclusividades do Privacy e OnlyFans, explore as opções acima e junte-se à nossa comunidade 100% gratuita.</p>
    </div>
        `;

        html = parts[0] + catSeoBlock + '\n</body>' + parts[1];
        fs.writeFileSync(file, html);
        count++;
    }
});

console.log('✅ Mass injected SEO Accordions & Category Texts into ' + count + ' files!');
