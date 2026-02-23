const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

let patched = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.match(/styles\.css\?v=(\d+)/)) {
        content = content.replace(/styles\.css\?v=(\d+)/g, (match, p1) => `styles.css?v=${parseInt(p1) + 1}`);
        fs.writeFileSync(file, content);
        patched++;
    }
});

console.log(`✅ Dynamically bumped styles.css cache version in ${patched} HTML files.`);
