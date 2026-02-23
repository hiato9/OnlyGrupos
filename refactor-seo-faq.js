const fs = require('fs');
let file = 'grupo-whatsapp-amanda-fox.html';
let html = fs.readFileSync(file, 'utf8');

// The new sleek accordion block
const newSeoBlock = `
                <!-- SEO Deep Content FAQ -->
                <details class="seo-faq-section mt-4" style="border-top: 1px solid #333; padding-top: 15px; cursor: pointer; outline: none;">
                    <summary style="font-size: 0.85rem; color: #888; font-weight: 600; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center; transition: color 0.3s ease;" onmouseover="this.style.color='#00e676'" onmouseout="this.style.color='#888'">
                        <span>Dúvidas Frequentes (FAQ)</span>
                        <span style="font-size: 0.7rem; color: #555;">▼</span>
                    </summary>
                    <div style="margin-top: 15px; text-align: left; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                        <div style="margin-bottom: 12px;">
                            <strong style="color: #00e676; font-size: 0.8rem; display: block; margin-bottom: 4px;">Como acessar o grupo Amanda Fox?</strong>
                            <p style="color: #aaa; font-size: 0.75rem; line-height: 1.5; margin: 0;">O link oficial e seguro para entrar no canal do Telegram e WhatsApp da Amanda Fox está disponível no botão verde acima. Clique para ser redirecionado imediatamente.</p>
                        </div>
                        <div style="margin-bottom: 12px;">
                            <strong style="color: #00e676; font-size: 0.8rem; display: block; margin-bottom: 4px;">Quais conteúdos vou encontrar lá dentro?</strong>
                            <p style="color: #aaa; font-size: 0.75rem; line-height: 1.5; margin: 0;">Este é um grupo verificado da categoria Modelos e OnlyFans. Você encontrará mídia em alta definição, fotos originais e conteúdos vazados exclusivos que não estão disponíveis em redes abertas.</p>
                        </div>
                        <div style="margin-bottom: 0;">
                            <strong style="color: #00e676; font-size: 0.8rem; display: block; margin-bottom: 4px;">As regras do chat são rigorosas?</strong>
                            <p style="color: #aaa; font-size: 0.75rem; line-height: 1.5; margin: 0;">Sim. Para manter a qualidade do material VIP da Amanda Fox, exigimos respeito absoluto entre todos os membros inscritos. Menores de 18 anos são terminantemente proibidos.</p>
                        </div>
                    </div>
                </details>
                <style>
                    details.seo-faq-section summary::-webkit-details-marker { display: none; }
                </style>`;

// Replace the old ugly block with the new one
if (html.includes('<!-- SEO Deep Content FAQ -->')) {
    html = html.replace(/<!-- SEO Deep Content FAQ -->[\s\S]*?<\/div>(\s*)<\/div>/, newSeoBlock + '$1</div>');
    // Note: The previous block ended with </div> because we didn't inject the closing tag of .modal-body, we just injected our div.
    // Wait, the regex needs to accurately replace the whole old block.
    // The old block starts with "<!-- SEO Deep Content FAQ -->" and ends with "</div>" 4 times (the outer div and 3 inner divs).
    // Let's just use string replacement on the exact old block, or regex from "<!-- SEO Deep" to the last "</div>" before "</div>" of modal-body.
}

// Better robust replacement:
html = html.replace(/<!-- SEO Deep Content FAQ -->[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>)/, newSeoBlock + '\n            ');
fs.writeFileSync(file, html);
console.log('✅ Replaced ugly FAQ with Sleek Accordion in Amanda Fox');
