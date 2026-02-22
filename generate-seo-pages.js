const fs = require('fs');

const groups = [
    { id: 1, name: "CDzinhas Brasil", category: "Cdzinhas", views: "12K", type: "whatsapp", desc: "O acervo mais completo de CDs do Brasil. Conteúdos exclusivos que você não encontra em lugar nenhum. Entre e confira agora!", link: "https://chat.whatsapp.com/Gx2Ldpp2rrgHzHgJKIDxc9?mode=gi_t" },
    { id: 2, name: "Bordel das Góticas", category: "Cdzinhas", views: "8.5K", type: "telegram", desc: "Aqui as góticas mais safadas e taradas de sexo.", link: "https://chat.whatsapp.com/BJ04oVJ8IDU0OGUAkADDjL?mode=gi_t" },
    { id: 3, name: "Góticas Rabudas", category: "Cdzinhas", views: "15K", type: "whatsapp", desc: "Uma seleção de rabas góticas gigantes que vão fazer você perder o juízo. Preparado pra essa tentação?", link: "https://chat.whatsapp.com/JJPi679Fnec6qOaa7vk6O6?mode=gi_t" },
    { id: 4, name: "Femboys BR", category: "Cdzinhas", views: "9K", type: "whatsapp", desc: "Os femboys mais delicados e provocantes do Brasil estão aqui. Beleza andrógina e muita safadeza te esperando.", link: "https://chat.whatsapp.com/JscO9OqMLW50K9f0PYPRcw?mode=gi_t" },
    { id: 5, name: "Brotheragem 2026", category: "Gays", views: "22K", type: "telegram", desc: "Sem frescura e direto ao ponto. Brotheragem de verdade, na sigilo e com muito prazer envolvido.", link: "https://chat.whatsapp.com/BpGVbxFA7632ceDc01re7J?mode=gi_t" },
    { id: 6, name: "Brincadeira de Macho", category: "Gays", views: "18K", type: "telegram", desc: "Onde machos alphas relaxam. Brincadeiras pesadas, testosterona lá em cima e zero tabu.", link: "https://t.me/example6" },
    { id: 7, name: "Fut dos Rapazes", category: "Gays", views: "11K", type: "telegram", desc: "O pós-jogo que você sempre sonhou. A resenha começa no campo e termina no vestiário, bem quente.", link: "https://t.me/example7" },
    { id: 8, name: "Sensação Gay", category: "Gays", views: "14K", type: "whatsapp", desc: "Descubra novas sensações e experiências intensas. Un mundo de prazer gay sem limites pra você explorar.", link: "https://chat.whatsapp.com/example8" },
    { id: 9, name: "Gays Exibidos", category: "Gays", views: "16K", type: "whatsapp", desc: "Eles adoram se mostrar e você vai adorar ver. Exibicionismo amador real, cru e delicioso.", link: "https://chat.whatsapp.com/example9" },
    { id: 10, name: "Covil dos Cornos", category: "Cornos", views: "30K", type: "whatsapp", desc: "O santuário para quem ama ver sua mulher nos braços de outro. Aqui seu fetiche é nossa prioridade.", link: "https://chat.whatsapp.com/CZZTWNFxP2rIdpXivpg7Rc?mode=gi_t" },
    { id: 11, name: "Exibição Cuckold 2.0", category: "Cornos", views: "25K", type: "telegram", desc: "Esposas gostosas que adoram provocar e humilhar seus maridos. Venha assistir de camarote.", link: "https://chat.whatsapp.com/K1MMeJirp3o6lNhifkAJFT?mode=gi_t" },
    { id: 12, name: "Putas de Corno", category: "Cornos", views: "28K", type: "whatsapp", desc: "Elas mandam, e você obedece. Mulheres dominadoras procurando cornos submissos pra servir agora.", link: "https://chat.whatsapp.com/Bn4sjWgZINAB8XKlDQvrjy?mode=gi_t" },
    { id: 13, name: "Exibição Brasil", category: "Cornos", views: "20K", type: "whatsapp", desc: "Casais reais caindo na putaria. Veja esposas brasileiras traindo e se exibindo sem pudor.", link: "https://chat.whatsapp.com/G4YNfqpAct9D3R8eXcRXUw?mode=gi_t" },
    { id: 14, name: "Flagras de Esposas", category: "Cornos", views: "35K", type: "telegram", desc: "Vídeos amadores vazados de esposas infiéis. O proibido nunca foi tão excitante.", link: "https://chat.whatsapp.com/CcCI5CbRUlL33an3P5X4Ko?mode=gi_t" },
    { id: 29, name: "Putaria sem Fim", category: "Putaria 24h", views: "50K", type: "whatsapp", desc: "Sem regras, sem limites, só putaria pesada. O grupo que nunca dorme e onde tudo é permitido.", link: "https://chat.whatsapp.com/example29" },
    { id: 30, name: "Bordel do Pimpolho", category: "Putaria 24h", views: "45K", type: "telegram", desc: "Bem-vindo ao puteiro virtual. As melhores profissionais e amadoras servindo conteúdo de primeira.", link: "https://chat.whatsapp.com/DvCV4qsjSpEJzvd6zsT8OE?mode=gi_t" },
    { id: 31, name: "Putaria 24h", category: "Putaria 24h", views: "60K", type: "whatsapp", desc: "Clique e goze. Conteúdo frenético 24h por dia pra saciar sua vontade a qualquer momento.", link: "https://chat.whatsapp.com/example31" },
    { id: 33, name: "Pode Tudo 24h", category: "Putaria 24h", views: "42K", type: "whatsapp", desc: "O submundo do prazer. Fetiches estranhos, bizarros e tudo o que é proibido na superfície.", link: "https://chat.whatsapp.com/K1MMeJirp3o6lNhifkAJFT?mode=gi_t" },
    { id: 32, name: "Entrou Gozou", category: "Putaria 24h", views: "48K", type: "telegram", desc: "Rápido, direto e eficiente. Entre, bata uma e relaxe. O melhor anti-stress que existe.", link: "https://chat.whatsapp.com/LJTlPJHhmvT0ivjnmGnIcK?mode=gi_t" },
    { id: 15, name: "Gabi Sanchez VIP", category: "Modelos", views: "80K", type: "telegram", desc: "Tudo o que a Gabi não posta no Instagram está aqui. Conteúdo explícito, íntimo e sem censura.", link: "https://chat.whatsapp.com/JxFewuWyUrVAlgPmglkX6B?mode=gi_t" },
    { id: 16, name: "Luiza Mel", category: "Modelos", views: "70K", type: "telegram", desc: "A musa que conquistou o Brasil agora 100% nua pra você. Vídeos caseiros e ensaios picantes.", link: "https://t.me/example16" },
    { id: 17, name: "Paloma Silva", category: "Modelos", views: "65K", type: "telegram", desc: "A novinha de 19 anos mais promissora do momento. Venha ver o que ela esconde por baixo da roupa.", link: "https://chat.whatsapp.com/JxFewuWyUrVAlgPmglkX6B?mode=gi_t" },
    { id: 18, name: "Amanda Fox", category: "Modelos", views: "66K", type: "whatsapp", desc: "Entre no grupo VIP da Amanda Fox e receba nudes diários direto no seu WhatsApp.", link: "https://chat.whatsapp.com/example18" },
    { id: 19, name: "Trans Brasil", category: "Trans", views: "15K", type: "whatsapp", desc: "A elite das trans brasileiras reunida. Corpos esculturais e surpresas deliciosas te aguardam.", link: "https://chat.whatsapp.com/BvUr8YWOUCgLnwELo6A2EV?mode=gi_t" },
    { id: 20, name: "Tesão de Trans", category: "Trans", views: "18K", type: "telegram", desc: "Pra quem tem bom gosto e sabe o que é bom. Dotadas, femininas e prontas pra realizar fantasias.", link: "https://t.me/example20" },
    { id: 21, name: "Mundo Trans", category: "Trans", views: "14K", type: "whatsapp", desc: "Mergulhe nesse mundo de prazer. O melhor acervo de conteúdo trans da internet, atualizado toda hora.", link: "https://t.me/example21" },
    { id: 22, name: "Mulheres de Pau", category: "Trans", views: "20K", type: "telegram", desc: "Elas são lindas e têm um segredinho que você vai adorar. Venha conferir o melhor dos dois mundos.", link: "https://t.me/example22" },
    { id: 23, name: "OnlyModels 2026", category: "Vazadas", views: "90K", type: "whatsapp", desc: "O que é pago lá fora, aqui é de graça. 0800 do conteúdo mais exclusivo da internet. Não perca!", link: "https://chat.whatsapp.com/DMHWudnCUp00R775I02iG4?mode=gi_t" },
    { id: 24, name: "Vazadas Brasil", category: "Vazadas", views: "85K", type: "whatsapp", desc: "Caiu na net, tá aqui! O maior banco de dados de vídeos e fotos vazadas de amadoras e famosas.", link: "https://chat.whatsapp.com/BJ04oVJ8IDU0OGUAkADDjL?mode=gi_t" },
    { id: 25, name: "Vazadas do Privacy", category: "Vazadas", views: "88K", type: "whatsapp", desc: "Privacy desbloqueado! Acesse packs completos sem pagar nada. A casa caiu pra elas.", link: "https://chat.whatsapp.com/DvCV4qsjSpEJzvd6zsT8OE?mode=gi_t" },
    { id: 26, name: "Only Brasil", category: "Vazadas", views: "82K", type: "telegram", desc: "As brasileirinhas do OnlyFans vazadas na íntegra. Todo dia novidade fresquinha pra você.", link: "https://chat.whatsapp.com/GcUmu3WEQPf4cF5eZ4eEMQ?mode=gi_t" },
    { id: 27, name: "Vazou Brasil", category: "Vazadas", views: "75K", type: "whatsapp", desc: "Flagras, nudes e sex tapes que não deveriam estar online, mas nós temos. Venha ver antes que apaguem!", link: "https://chat.whatsapp.com/example27" },
    { id: 28, name: "Top Models 2.0", category: "Vazadas", views: "95K", type: "telegram", desc: "O canal que as famosas temem. Vazamentos exclusivos e bombas diárias. O ano começou quente!", link: "https://chat.whatsapp.com/DMHWudnCUp00R775I02iG4?mode=gi_t" },
    { id: 34, name: "Amizades Reais", category: "Amizade", views: "5K", type: "whatsapp", desc: "Cansado de fake? Aqui a gente troca ideia de verdade, conhece gente nova e quem sabe rola algo mais.", link: "https://chat.whatsapp.com/example34" },
    { id: 35, name: "Amizade e Romance", category: "Amizade", views: "4K", type: "telegram", desc: "Procurando sua alma gêmea ou só um contatinho? O amor (e o prazer) pode estar a um clique.", link: "https://t.me/example35" },
    { id: 36, name: "Boteco dos Amigos", category: "Amizade", views: "3K", type: "whatsapp", desc: "Puxa uma cadeira e vem resenhar. Zoeira, memes e conversa fiada num ambiente descontraído.", link: "https://chat.whatsapp.com/example36" }
];

function generateSlug(name) {
    return name.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

let newScriptData = `// GERAÇÃO AUTOMÁTICA DE LINKS\n`;
let generatedFiles = [];

groups.forEach(group => {
    let prefix = group.type === 'whatsapp' ? 'grupo-whatsapp' : 'grupo-telegram';
    let slug = generateSlug(group.name);
    let fileName = `${prefix}-${slug}.html`;

    let originalLink = group.link;
    if (group.id === 18 && group.name === "Amanda Fox") {
        originalLink = "https://chat.whatsapp.com/example18";
    }

    let seoTitle = `Grupo de ${group.type === 'whatsapp' ? 'WhatsApp' : 'Telegram'} ${group.name} - Links Ativos 2026`;
    let seoDesc = `Acesse o grupo ${group.name} na categoria ${group.category}. ${group.desc} Link 100% atualizado e ativo.`;
    let keywords = `grupo ${group.type}, ${group.name.toLowerCase()}, ${group.category.toLowerCase()}, link grupo, grupos +18`;

    let htmlTemplate = `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${seoTitle}</title>
    <meta name="description" content="${seoDesc}">
    <meta name="keywords" content="${keywords}">
    
    <link rel="stylesheet" href="styles.css?v=8">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    
    <style>
        body {
            background-image: url('assets/onlygrupos-bg-mock.jpg');
            background-color: #121212; 
            margin: 0;
            padding: 0;
            overflow: hidden; 
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        .fake-background-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, rgba(18,18,18,0.8) 0%, rgba(18,18,18,1) 100%);
            z-index: 1;
        }

        .modal-seo-override {
            display: grid !important;
            animation: none !important;
            z-index: 10000;
        }

        .seo-hidden-text {
            position: absolute;
            left: -9999px;
            top: -9999px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        }
    </style>
</head>

<body>
    <div class="fake-background-overlay"></div>

    <article class="seo-hidden-text">
        <h1>Buscando o Grupo de ${group.type === 'whatsapp' ? 'WhatsApp' : 'Telegram'} ${group.name}?</h1>
        <p>Bem-vindo ao maior achador de grupos privados. O grupo ${group.name} na categoria ${group.category} é um dos mais procurados. ${group.desc} Clique no botão de acesso para entrar agora mesmo.</p>
        <h2>Como entrar no link do grupo?</h2>
        <p>Basta clicar em "Entrar no Grupo" abaixo. Nossos links são verificados diariamente em 2026 para garantir que não estejam revogados.</p>
    </article>

    <div class="modal modal-seo-override">
        <div class="modal-content">
            <div class="modal-header-row">
                <div class="modal-title-block">
                    <h2 id="modalTitle">${group.name}</h2>
                    <div id="modalAccesses" class="modal-accesses">🔥 ${group.views} Acessos</div>
                </div>
                <a href="index.html" class="close-modal" style="text-decoration: none; position: absolute; top: -5px; right: 0;" aria-label="Voltar para a página inicial">×</a>
            </div>

            <div class="modal-body">
                <p id="modalDesc" style="font-size: 0.9rem; color: #ccc; line-height: 1.5; margin-bottom: 20px;">
                    🔥 ${group.desc}
                </p>

                <div class="rules-section">
                    <h3 class="rules-title">REGRAS DO GRUPO</h3>
                    <div class="rules-container">
                        <ul class="rules-list">
                            <li>Apenas +18</li>
                            <li>Acesso Exclusivo Premium</li>
                            <li>Conteúdo HD</li>
                            <li>Respeito é obrigatório</li>
                        </ul>
                    </div>
                </div>

                <a href="${originalLink}" class="btn-modal-enter" style="margin-bottom: 10px;" target="_blank">ENTRAR NO GRUPO</a>
                <a href="index.html" class="btn-modal-back" style="text-decoration: none;">VOLTAR PARA A BUSCA</a>
            </div>
        </div>
    </div>
</body>
</html>`;

    fs.writeFileSync('./' + fileName, htmlTemplate);
    generatedFiles.push(fileName);
    newScriptData += `${group.id} -> ${fileName}\n`;
});

console.log("Pages generated:", generatedFiles.length);

let scriptContent = fs.readFileSync('./script.js', 'utf-8');

groups.forEach(group => {
    let prefix = group.type === 'whatsapp' ? 'grupo-whatsapp' : 'grupo-telegram';
    let slug = generateSlug(group.name);
    let fileName = `${prefix}-${slug}.html`;

    const regex = new RegExp(`(id:\\s*${group.id},[\\s\\S]*?link:\\s*")([a-zA-Z0-9://?_=.-]+)(")`, 'g');
    scriptContent = scriptContent.replace(regex, `$1${fileName}$3`);
});

fs.writeFileSync('./script.js', scriptContent);
console.log("script.js updated with local HTML links.");
