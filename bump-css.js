const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

let patched = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('styles.css?v=8')) {
        content = content.replace(/styles\.css\?v=8/g, 'styles.css?v=9');
        fs.writeFileSync(file, content);
        patched++;
    }
});

console.log(`✅ Bumped styles.css cache version to v=9 in ${patched} HTML files.`);
