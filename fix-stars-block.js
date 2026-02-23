const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') || f === 'script.js');

let patched = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    if (content.includes('d-inline-block mt-1')) {
        content = content.replace(/d-inline-block mt-1/g, 'd-block mt-2');
        fs.writeFileSync(file, content);
        patched++;
    }
});

console.log(`✅ Patched star layout spacing to block mode in ${patched} files.`);
