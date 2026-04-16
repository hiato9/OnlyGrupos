require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { MercadoPagoConfig, Payment } = require('mercadopago');

const app = express();

// Configurando CORS restrito
app.use(cors({
    origin: ['https://onlymodels.online', 'https://onlygrupos.online', 'http://localhost:5000', 'http://127.0.0.1:5000', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Set up Mercado Pago Client
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'APP_USR-5238277782838185-022119-7012073cb2ab2a45bd57ba433b024469-455113527' });
const payment = new Payment(client);

// Limiter definition
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per `window`
    message: { error: 'Muitas tentativas de pagamento. Tente novamente mais tarde.' }
});

app.post('/create-pix', limiter, async (req, res) => {
    try {
        const { transactionAmount, description, email, cpf, name } = req.body;

        // Simplify name extraction (first name and last name)
        let firstName = 'Cliente';
        let lastName = 'OnlyModels';
        if (name) {
            const nameParts = name.trim().split(' ');
            firstName = nameParts[0];
            if (nameParts.length > 1) {
                lastName = nameParts.slice(1).join(' ');
            }
        }

        // Clean CPF string (remove dots and dashes)
        let cleanCpf = cpf ? cpf.replace(/\D/g, '') : '';
        if (cleanCpf.length !== 11) {
            return res.status(400).json({ error: 'CPF inválido.' });
        }

        const body = {
            transaction_amount: transactionAmount || 34.90,
            description: description || 'OnlyModels VIP',
            payment_method_id: 'pix',
            payer: {
                email: email || 'cliente@onlymodels.com',
                first_name: firstName,
                last_name: lastName,
                identification: {
                    type: 'CPF',
                    number: cleanCpf
                }
            }
        };

        const response = await payment.create({ body });

        // Return exactly what the front-end needs: Copy/Paste string and the QR Code image (base64)
        res.json({
            qr_code: response.point_of_interaction.transaction_data.qr_code,
            qr_code_base64: response.point_of_interaction.transaction_data.qr_code_base64,
            payment_id: response.id
        });

    } catch (error) {
        console.error("Error creating PIX:", error);
        res.status(500).json({ error: 'Failed to generate PIX' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
