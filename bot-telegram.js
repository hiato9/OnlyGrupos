require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');

const token = process.env.TELEGRAM_BOT_TOKEN || 'COLOQUE_O_TOKEN_DO_BOTFATHER_AQUI';
const chatId = process.env.TELEGRAM_CHAT_ID || 'COLOQUE_SEU_CHAT_ID_AQUI';

const app = express();
app.use(cors());
app.use(express.json());

let bot;
try {
    bot = new TelegramBot(token, {polling: true});
} catch(e) {
    console.error("Erro ao iniciar Telegram Bot. Verifique o TOKEN.");
}

const dbFile = 'pending-groups.json';
function savePending(obj) {
   let arr = [];
   if(fs.existsSync(dbFile)) arr = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
   obj.id = Date.now().toString();
   arr.push(obj);
   fs.writeFileSync(dbFile, JSON.stringify(arr, null, 2));
   return obj.id;
}

function getPending(id) {
    if(!fs.existsSync(dbFile)) return null;
    let arr = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    return arr.find(x => x.id === id);
}

app.post('/api/cadastrar-grupo', async (req, res) => {
    const { name, link, category, contact } = req.body;
    
    if(!name || !link) return res.status(400).send('Faltam dados principais');

    // Salva na memoria leve
    const localId = savePending(req.body);

    const message = `🚨 <b>NOVO GRUPO PARA APROVAÇÃO</b> 🚨\n\n` +
                    `<b>Nome:</b> ${name}\n` +
                    `<b>Categoria:</b> ${category}\n` +
                    `<b>Contato:</b> ${contact}\n` +
                    `<b>Link:</b> ${link}\n\n` +
                    `Você aprova a publicação imediata no OnlyGrupos?`;

    const options = {
        parse_mode: 'HTML',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '✅ Aceitar (Publicar)', callback_data: `approve_${localId}` },
                    { text: '❌ Recusar', callback_data: `reject_${localId}` }
                ]
            ]
        }
    };

    try {
        if(bot) await bot.sendMessage(chatId, message, options);
        res.status(200).json({ status: 'ok', msg: 'Enviado para análise via TG' });
    } catch (e) {
        console.log("Erro no bot:", e);
        res.status(500).json({ error: 'Erro no TG' });
    }
});

if(bot) {
    bot.on('callback_query', (query) => {
        const data = query.data;
        const msgId = query.message.message_id;

        if (data.startsWith('reject_')) {
            const id = data.split('_')[1];
            const groupInfo = getPending(id);
            bot.editMessageText(`❌ Cadastro de grupo <b>${groupInfo ? groupInfo.name : 'ID '+id}</b> recusado.`, {
                chat_id: query.message.chat.id,
                message_id: msgId,
                parse_mode: 'HTML'
            });
            return;
        }

        if (data.startsWith('approve_')) {
            const id = data.split('_')[1];
            const groupInfo = getPending(id);
            
            if(!groupInfo) {
                bot.answerCallbackQuery(query.id, { text: "Erro: Cadastro não encontrado na memória local."});
                return;
            }

            bot.editMessageText(`⏳ Iniciando pipeline de aprovação do <b>${groupInfo.name}</b>...\nGerando páginas estáticas...`, {
                chat_id: query.message.chat.id,
                message_id: msgId,
                parse_mode: 'HTML'
            });

            const scriptAddGroup = `
const fs = require('fs');
let genFile = fs.readFileSync('generate-seo-pages.js', 'utf8');

const newId = Math.floor(Math.random() * 90000) + 1000;
const newEntry = \\n    { id: \` + newId + \`, name: "${groupInfo.name}", category: "${groupInfo.category}", views: "New", type: "${groupInfo.link.includes('whatsapp') ? 'whatsapp' : 'telegram'}", desc: "Grupo recém-aprovado pelos administradores oficiais do nosso portal.", link: "${groupInfo.link}" },\\n;

genFile = genFile.replace(/(const groups = \\[)/, '$1' + newEntry);
fs.writeFileSync('generate-seo-pages.js', genFile);

let mainScript = fs.readFileSync('script.js', 'utf8');
mainScript = mainScript.replace(/(const groups = \\[)/, '$1' + newEntry);
fs.writeFileSync('script.js', mainScript);
`;
            fs.writeFileSync('temp-approve.js', scriptAddGroup);

            exec('node temp-approve.js && node generate-seo-pages.js && node apply-seo-faq-all.js', (err, stdout, stderr) => {
                if(err) {
                    bot.editMessageText(`⚠️ Falha na build local: ${err.message}`, { chat_id: query.message.chat.id, message_id: msgId });
                    return;
                }

                bot.editMessageText(`✅ Grupo <b>${groupInfo.name}</b> injetado com sucesso! Subindo via Git Push...`, { chat_id: query.message.chat.id, message_id: msgId, parse_mode: 'HTML' });

                exec('git add . && git commit -m "feat(SEO): auto-publish do novo grupo via Telegram Approval" && git push', (gitErr, gitOut, gitStd) => {
                     if(gitErr) {
                         bot.sendMessage(query.message.chat.id, `⚠️ Erro no git push: ${gitErr.message}`);
                     } else {
                         bot.sendMessage(query.message.chat.id, `🚀 Grupo publicado no ar com sucesso! A Vercel está reconstruindo o site.`);
                     }
                });
            });
        }
    });
}

const port = process.env.BOT_PORT || 3001;
app.listen(port, () => {
    console.log(\`🤖 Telegram Bot Approval Backend ouvindo na porta \${port}\`);
});
