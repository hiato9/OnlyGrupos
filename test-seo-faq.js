const fs = require('fs');
let file = 'grupo-whatsapp-amanda-souza-vip.html';
let html = fs.readFileSync(file, 'utf8');

const seoBlock = `
                <!-- SEO Deep Content FAQ -->
                <div class="seo-faq-section mt-5 pt-4 text-start" style="border-top: 1px solid #222;">
                    <h4 style="font-size: 0.95rem; color: #888; font-weight: 700; margin-bottom: 12px; letter-spacing: -0.5px;">📋 Dúvidas Frequentes sobre este Grupo</h4>
                    
                    <div style="margin-bottom: 12px;">
                        <strong style="color: #bbb; font-size: 0.85rem; display: block; margin-bottom: 2px;">Como acessar o grupo Amanda Souza VIP?</strong>
                        <p style="color: #666; font-size: 0.8rem; line-height: 1.4; margin: 0;">O link oficial e seguro para entrar no canal do Telegram e WhatsApp da Amanda Souza está disponível no botão verde acima. Clique para ser redirecionado imediatamente.</p>
                    </div>

                    <div style="margin-bottom: 12px;">
                        <strong style="color: #bbb; font-size: 0.85rem; display: block; margin-bottom: 2px;">Quais conteúdos vou encontrar lá dentro?</strong>
                        <p style="color: #666; font-size: 0.8rem; line-height: 1.4; margin: 0;">Este é um grupo verificado da categoria Modelos e OnlyFans. Você encontrará mídia em alta definição, fotos originais e conteúdos vazados exclusivos que não estão disponíveis em redes abertas.</p>
                    </div>

                    <div style="margin-bottom: 0;">
                        <strong style="color: #bbb; font-size: 0.85rem; display: block; margin-bottom: 2px;">As regras do chat são rigorosas?</strong>
                        <p style="color: #666; font-size: 0.8rem; line-height: 1.4; margin: 0;">Sim. Para manter a qualidade do material VIP da Amanda Souza, exigimos respeito absoluto entre todos os membros inscritos. Menores de 18 anos são terminantemente proibidos.</p>
                    </div>
                </div>
`;

if (!html.includes('seo-faq-section')) {
    html = html.replace(/(VOLTAR PARA A BUSCA<\/a>\s*)<\/div>/i, '$1' + seoBlock + '\n            </div>');
    fs.writeFileSync(file, html);
    console.log('✅ Injected prototype SEO FAQ into Amanda Souza VIP');
} else {
    console.log('⚠️ SEO block already exists.');
}
