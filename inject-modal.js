const fs = require('fs');

// 1. Modificar HTML
let html = fs.readFileSync('index.html', 'utf8');

// Remover antiga tag <a> do OnlyModels
const regexObsoleteButton = /<a href="https:\/\/onlymodels\.online\/".*?<\/a>/s;
const newButtonHtml = `<button class="nav-btn btn-adicionar-grupo" onclick="openCadastroModal()">
                    <span class="icon">➕</span> DIVULGAR GRUPO
                </button>`;

html = html.replace(regexObsoleteButton, newButtonHtml);

// Injetar o Modal no final do body
const modalHtml = `
    <!-- Add Group Modal -->
    <div id="cadastroModal" class="modal" onclick="closeCadastroModal()">
        <div class="modal-content" onclick="event.stopPropagation()">
            <div class="modal-header-row">
                <div class="modal-title-block">
                    <h2 id="cadastroTitle" style="margin: 0; color: white;">Divulgue Seu Grupo</h2>
                    <div style="color: #229ED9; margin-top: 5px; font-weight: 600; font-size: 0.85rem;">Preencha para análise rápida</div>
                </div>
                <button class="close-modal" onclick="closeCadastroModal()" style="background: transparent; border: none; color: #888; font-size: 1.5rem; cursor: pointer;">×</button>
            </div>
            <div class="modal-body">
                <form id="cadastroForm" onsubmit="submitCadastro(event)">
                    <div style="margin-bottom: 15px;">
                        <label style="color: #aaa; font-size: 0.8rem; font-weight: bold; margin-bottom: 5px; display: block;">Nome do Grupo</label>
                        <input type="text" id="cadNome" required style="width: 100%; padding: 10px; background: #1A1A1A; border: 1px solid #333; color: white; border-radius: 6px; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="color: #aaa; font-size: 0.8rem; font-weight: bold; margin-bottom: 5px; display: block;">Link de Convite (Telegram/WhatsApp)</label>
                        <input type="url" id="cadLink" required placeholder="https://t.me/..." style="width: 100%; padding: 10px; background: #1A1A1A; border: 1px solid #333; color: white; border-radius: 6px; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="color: #aaa; font-size: 0.8rem; font-weight: bold; margin-bottom: 5px; display: block;">Categoria</label>
                        <select id="cadCategoria" required style="width: 100%; padding: 10px; background: #1A1A1A; border: 1px solid #333; color: white; border-radius: 6px; box-sizing: border-box;">
                            <option value="Amizade">Amizade</option>
                            <option value="Cdzinhas">Cdzinhas</option>
                            <option value="Cornos">Cornos</option>
                            <option value="Gays">Gays</option>
                            <option value="Modelos">Modelos</option>
                            <option value="Putaria 24h">Putaria 24h</option>
                            <option value="Trans">Trans</option>
                            <option value="Vazadas">Vazadas</option>
                        </select>
                    </div>
                    <div style="margin-bottom: 25px;">
                        <label style="color: #aaa; font-size: 0.8rem; font-weight: bold; margin-bottom: 5px; display: block;">Seu Contato (WhatsApp/Telegram)</label>
                        <input type="text" id="cadContato" required placeholder="@seu_usuario_telegram" style="width: 100%; padding: 10px; background: #1A1A1A; border: 1px solid #333; color: white; border-radius: 6px; box-sizing: border-box;">
                    </div>
                    <button type="submit" id="btnSubmitCadastro" style="width: 100%; background: #229ED9; color: #fff; font-weight: 900; border: none; padding: 14px; border-radius: 8px; cursor: pointer; text-transform: uppercase; font-family: Inter;">Enviar para Aprovação</button>
                    <p id="cadStatusInfo" style="display: none; text-align: center; color: #229ED9; font-size: 0.85rem; margin-top: 15px; font-weight: bold;">Enviado! Analisaremos em breve.</p>
                    <p id="cadErrorInfo" style="display: none; text-align: center; color: #ff5252; font-size: 0.85rem; margin-top: 15px; font-weight: bold;">Erro na comunicação com o servidor.</p>
                </form>
            </div>
        </div>
    </div>
</body>
`;

if (!html.includes('id="cadastroModal"')) {
    html = html.replace('</body>', modalHtml);
}
fs.writeFileSync('index.html', html, 'utf8');

// 2. Modificar styles.css para nova classe
let css = fs.readFileSync('styles.css', 'utf8');
const newCss = `
/* Premium Divulgar Grupo Button */
.btn-adicionar-grupo {
    width: 85% !important;
    max-width: 340px !important;
    margin: 5px auto 0 auto;
    padding: 18px 20px !important;
    background: linear-gradient(45deg, #1D8ECE, #229ED9);
    color: #FFF !important;
    font-weight: 900;
    border: 2px solid #229ED9 !important;
    box-shadow: 0 0 15px rgba(34, 158, 217, 0.4);
    border-radius: 10px !important;
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
    animation: bluePulseHover 2s infinite alternate;
}

.btn-adicionar-grupo:hover {
    box-shadow: 0 0 25px rgba(34, 158, 217, 0.8);
    transform: scale(1.02);
}

@keyframes bluePulseHover {
    from {
        box-shadow: 0 0 10px rgba(34, 158, 217, 0.3);
    }
    to {
        box-shadow: 0 0 22px rgba(34, 158, 217, 0.7);
    }
}
`;

if (!css.includes('.btn-adicionar-grupo')) {
    css += newCss;
    fs.writeFileSync('styles.css', css, 'utf8');
}

// 3. Adicionar Lógica do Formulário no script.js
let js = fs.readFileSync('script.js', 'utf8');
const newJs = `
// Funcoes do Modal de Cadastro
window.openCadastroModal = function() {
    document.getElementById('cadastroModal').classList.add('show');
}
window.closeCadastroModal = function() {
    document.getElementById('cadastroModal').classList.remove('show');
    document.getElementById('cadStatusInfo').style.display = 'none';
    document.getElementById('cadErrorInfo').style.display = 'none';
    document.getElementById('btnSubmitCadastro').style.display = 'block';
    document.getElementById('btnSubmitCadastro').disabled = false;
    document.getElementById('btnSubmitCadastro').textContent = 'Enviar para Aprovação';
    document.getElementById('cadastroForm').reset();
}

window.submitCadastro = async function(e) {
    e.preventDefault();
    const btn = document.getElementById('btnSubmitCadastro');
    const status = document.getElementById('cadStatusInfo');
    const erro = document.getElementById('cadErrorInfo');
    
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    erro.style.display = 'none';
    status.style.display = 'none';

    const data = {
        name: document.getElementById('cadNome').value,
        link: document.getElementById('cadLink').value,
        category: document.getElementById('cadCategoria').value,
        contact: document.getElementById('cadContato').value
    };

    try {
        const url = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? 'http://localhost:3001/api/cadastrar-grupo' 
            : 'https://seuservidor.com.br/api/cadastrar-grupo'; // A ser alterado para o domínio do VPs
            
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            btn.style.display = 'none';
            status.style.display = 'block';
        } else {
            throw new Error('Falha');
        }
    } catch (err) {
        erro.style.display = 'block';
        btn.textContent = 'Enviar para Aprovação';
        btn.disabled = false;
    }
}
`;

if (!js.includes('openCadastroModal')) {
    js += newJs;
    fs.writeFileSync('script.js', js, 'utf8');
}

console.log("Feito!");
