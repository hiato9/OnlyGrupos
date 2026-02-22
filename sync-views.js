const fs = require('fs');

// Read script.js
let scriptContent = fs.readFileSync('script.js', 'utf8');

// Find all HTML files
const htmlFiles = fs.readdirSync(__dirname).filter(f => f.startsWith('grupo-') && f.endsWith('.html'));

htmlFiles.forEach(file => {
    // Read the HTML
    const html = fs.readFileSync(file, 'utf8');

    // Extract the number
    const match = html.match(/⚡ (\d+)/);
    if (match) {
        const number = match[1];
        // The file name is linked in script.js as link: "filename.html"
        // Let's find the group object in scriptContent and replace its views: "..."
        // A safer way is regex matching the block before link: "filename.html"
        // But since JS is simple, we can replace views just by parsing the AST, but regex is faster for this one-off.

        // Find the block for this file:
        const groupBlockRegex = new RegExp(`({[^}]*?views:\\s*)"[^"]+"([^}]*?link:\\s*"${file}")`, 'g');
        scriptContent = scriptContent.replace(groupBlockRegex, `$1"${number}"$2`);
    }
});

fs.writeFileSync('script.js', scriptContent);
console.log('✅ script.js views synced with HTML files');
