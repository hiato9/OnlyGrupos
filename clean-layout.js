const fs = require('fs');

// 1. Clean script.js
let scriptContent = fs.readFileSync('script.js', 'utf8');
scriptContent = scriptContent.replace(
    /<div class="group-title mb-1">\$\{group\.name\}<\/div>[\s\S]*?<div class="text-warning mb-2"[\s\S]*?<\/div>/,
    '<div class="group-title">${group.name}</div>'
);
fs.writeFileSync('script.js', scriptContent);

// 2. Clean HTML Files
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/<div class="text-warning mb-3"[\s\S]*?⭐⭐⭐⭐⭐[\s\S]*?<\/div>\s*/g, '');
    fs.writeFileSync(file, html);
});

console.log('✅ Visual stars removed from all files.');
