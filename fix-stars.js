const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') || f === 'script.js');

let fixedCount = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Check if it has the broken tags
    if (content.includes('fa-star')) {
        content = content.replace(/<i class="fas fa-star"><\/i>/g, '⭐')
            .replace(/<i class="fas fa-star-half-alt"><\/i>/g, '⭐');

        fs.writeFileSync(file, content);
        fixedCount++;
    }
});

console.log(`✅ Fixed stars in ${fixedCount} files using native emojis.`);
