const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.startsWith('grupo-') && f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let randomNum = Math.floor(Math.random() * 700) + 300; // Between 300 and 999

    // The current div looks like this:
    // <div id="modalAccesses" class="modal-accesses" style="color: #00E676; margin-top: 5px; font-weight: 600; font-size: 0.9rem;">⚡ 512 Novos Acessos Hoje!</div>
    content = content.replace(
        /⚡ \d+ Novos Acessos/g,
        `⚡ ${randomNum} Novos Acessos`
    );

    fs.writeFileSync(file, content);
});

console.log('✅ Rerolled access counters in ' + files.length + ' files');
