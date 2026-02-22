const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.startsWith('grupo-') && f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let randomNum = Math.floor(Math.random() * 700) + 300; // Between 300 and 999

    // Replace the modal access div with the new format and color
    content = content.replace(
        /<div id="modalAccesses" class="modal-accesses">.*?<\/div>/g,
        `<div id="modalAccesses" class="modal-accesses" style="color: #00E676; margin-top: 5px; font-weight: 600; font-size: 0.9rem;">⚡ ${randomNum} Novos Acessos Hoje!</div>`
    );

    fs.writeFileSync(file, content);
});

console.log('✅ Updated access counters in ' + files.length + ' files');
