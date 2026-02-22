const fs = require('fs');

// Generate random dates weighted towards today
function getRandomWeightedDate() {
    const today = new Date(); // Using real today, or 2026-02-22
    // Let's enforce 2026-02-22 since that's what the environment uses
    const baseDate = new Date('2026-02-22T12:00:00Z');

    // Weights: 0 days ago (40%), 1 day ago (20%), 2 days ago (15%), 3-7 days ago (25%)
    const rand = Math.random();
    let daysAgo = 0;

    if (rand < 0.40) daysAgo = 0;
    else if (rand < 0.60) daysAgo = 1;
    else if (rand < 0.75) daysAgo = 2;
    else if (rand < 0.85) daysAgo = 3;
    else if (rand < 0.90) daysAgo = 4;
    else if (rand < 0.95) daysAgo = 5;
    else daysAgo = Math.floor(Math.random() * 2) + 6; // 6 or 7

    const targetDate = new Date(baseDate.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    const dd = String(targetDate.getUTCDate()).padStart(2, '0');
    const mm = String(targetDate.getUTCMonth() + 1).padStart(2, '0');
    const yyyy = targetDate.getUTCFullYear();

    return `${dd}/${mm}/${yyyy}`;
}

let scriptContent = fs.readFileSync('script.js', 'utf8');

// Replace existing date fields if any, or append them.
// First, strip out any existing date fields to avoid duplicates
scriptContent = scriptContent.replace(/,\s*date:\s*"[^"]+"/g, '');

// Now match every group block ending with link: "..."
// Note: Some blocks might end with a trailing comma on the link line, or just a newline and brace.
// Example:
//         link: "grupo-whatsapp-cdzinhas-brasil.html"
//     },
const blockRegex = /(link:\s*"[^"]+")(\s*\})/g;

scriptContent = scriptContent.replace(blockRegex, (match, p1, p2) => {
    const newDate = getRandomWeightedDate();
    return `${p1},\n        date: "${newDate}"${p2}`;
});

// Remove the `getRandomDate` function and the injection logic from DOMContentLoaded
scriptContent = scriptContent.replace(/function getRandomDate\(\) \{[\s\S]*?\n\}/, '');
scriptContent = scriptContent.replace(/\/\/ Inject Random Dates[\s\S]*?\}\);/g, '');

fs.writeFileSync('script.js', scriptContent);
console.log('✅ Synchronized static dates into script.js and removed dynamic generator.');
