require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Gerencianet = require('gn-api-sdk-node');

const app = express();
app.use(cors()); // Permite que o seu site (front-end) se comunique com este servidor
app.use(express.json());

// Configuração das Credenciais da Efí Bank
// A Vercel vai ler essas variáveis lá das configurações de "Environment Variables" ocultas
const options = {
    sandbox: process.env.EFI_SANDBOX === 'true', // testando na API de homologação?
    client_id: process.env.EFI_CLIENT_ID,
    client_secret: process.env.EFI_CLIENT_SECRET,
    // Como a Vercel não tem pasta física para jogar o certificado .p12, converteremos ele pra Base64
    certificate: process.env.EFI_CERTIFICADO_BASE64
}

// Rota 1: Teste de saúde - Pra ver se a Vercel subiu o site com sucesso
app.get('/', (req, res) => {
    res.send('✅ API de Pagamentos OnlyGrupos (Efí Bank) está Rodando!');
});

// Rota 2: A Rota Mágica que o seu Front-end vai chamar para pedir a imagem do PIX
app.post('/gerar-pix', async (req, res) => {
    try {
        // Puxamos valores do front-end (ex: valor do pacote, nome do cliente, etc)
        // Se nao for fornecido, cobramos o padrao de 39.90
        const valorDaCobranca = req.body.valor || "39.90";
        const descricaoDaCobranca = req.body.descricao || "Desbloqueio VIP OnlyModels";

        const gerencianet = new Gerencianet(options);

        // 1. Criar a cobrança do PIX no banco
        const body = {
            calendario: {
                expiracao: 3600 // O PIX expira em 1 hora
            },
            valor: {
                original: valorDaCobranca
            },
            chave: process.env.EFI_CHAVE_PIX, // A sua chave PIX castrada lá no painel da EFí
            solicitacaoPagador: descricaoDaCobranca
        };

        const cobranca = await gerencianet.pixCreateImmediateCharge([], body);

        // 2. Com a cobrança gerada, pedir o QR Code visual pro aplicativo do usuário ler
        const params = {
            id: cobranca.loc.id
        };

        const qrcode = await gerencianet.pixGenerateQRCode(params);

        // 3. Empacota a imagem do QR, o Copia&Cola e devolve pro front-end desenhar na tela
        res.json({
            sucesso: true,
            txid: cobranca.txid, // Esse ID serve para sabermos se esse PIX foi pago depois!
            qrCodeImage: qrcode.imagemQrcode,    // A Imagem que vamos desenhar na tela
            qrCodeString: qrcode.qrcode          // O Código para o botão "Copiar Cógido"
        });

    } catch (error) {
        console.error("Erro ao gerar a cobrança:", error);
        res.status(500).json({
            sucesso: false,
            erro: "Falha na comunicação com o banco",
            detalhes: error.message || error
        });
    }
});

// Inicializador Padrão da Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`⚡ Servidor de Pagamentos iniciado na porta ${PORT}`);
});
