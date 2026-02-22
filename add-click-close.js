const fs = require('fs');

// 1. Update all generated HTML files
const htmlFiles = fs.readdirSync(__dirname).filter(f => f.startsWith('grupo-') && f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Some files might be slightly different. Look for the modal wrapper.
    // Replace <div class="modal modal-seo-override"> OR <div class="modal-seo-static">
    content = content.replace(/<div class="(?:modal )?modal(?:-seo-override|-seo-static)">/, '<div class="modal modal-seo-override" onclick="if(document.referrer) history.back(); else window.location.href=\'index.html\';">');

    // Replace <div class="modal-content"> OR <div class="modal-content-seo-static">
    content = content.replace(/<div class="modal-content(?:-seo-static)?">/, '<div class="modal-content" onclick="event.stopPropagation()">');

    fs.writeFileSync(file, content);
});

// 2. Update the generator script
let genContent = fs.readFileSync('generate-seo-pages.js', 'utf8');

genContent = genContent.replace(
    '<div class="modal modal-seo-override">',
    '<div class="modal modal-seo-override" onclick="if(document.referrer) history.back(); else window.location.href=\'index.html\';">'
);

genContent = genContent.replace(
    '<div class="modal-content">',
    '<div class="modal-content" onclick="event.stopPropagation()">'
);

fs.writeFileSync('generate-seo-pages.js', genContent);

console.log('✅ Click-to-close logic applied to all files and generator.');
