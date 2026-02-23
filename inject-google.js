const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

const metaTag = '<meta name="google-site-verification" content="hNCMVxwJ0cOxF8TrmcqcLf88BEED8YW4vBz90dsIhVU" />';

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Check if the tag is already there to prevent duplicates
    if (!content.includes('google-site-verification')) {
        content = content.replace('</head>', `    ${metaTag}\n</head>`);
        fs.writeFileSync(file, content);
    }
});

console.log(`✅ Injected Google Site Verification tag into ${files.length} HTML files.`);
