const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') || f === 'script.js');

let patched = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Check if it has the stars and span
    if (content.includes('⭐⭐⭐⭐⭐')) {
        // Enforce line break and add a tiny top margin, remove the left margin (ms-1)
        content = content.replace(/⭐⭐⭐⭐⭐\s*<span class="(.*?)\s*ms-1"(.*?)>/g,
            '⭐⭐⭐⭐⭐<br>\n<span class="$1 d-inline-block mt-1"$2>');

        // For script.js we need to handle the template literals correctly without breaking anything
        // The regex above generically targets `<span class="...">`

        fs.writeFileSync(file, content);
        patched++;
    }
});

console.log(`✅ Patched star layout spacing in ${patched} files.`);
