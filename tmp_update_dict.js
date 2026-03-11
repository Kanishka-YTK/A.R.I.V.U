const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const transFile = path.join(srcDir, 'locales/translations_extended.ts');

function findFiles(dir, exts) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(findFiles(filePath, exts));
        } else {
            if (exts.includes(path.extname(file))) {
                results.push(filePath);
            }
        }
    });
    return results;
}

const files = findFiles(srcDir, ['.tsx', '.ts']);
const keysFound = new Set();
const defaultVals = {};

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // Match data-i18n="key"
    const regex1 = /data-i18n="([^"]+)"(?:>|[\s\S]*?>)([^<]*)<\//g;
    let match;
    while ((match = regex1.exec(content)) !== null) {
        keysFound.add(match[1]);
        if (match[2] && match[2].trim() && !match[2].includes('{')) {
            defaultVals[match[1]] = match[2].trim();
        }
    }
    // Match t('key') || 'Fallback'
    const regex2 = /t\(['"]([^'"]+)['"]\)\s*\|\|\s*['"]([^'"]+)['"]/g;
    while ((match = regex2.exec(content)) !== null) {
        keysFound.add(match[1]);
        defaultVals[match[1]] = match[2];
    }
    // Match i18nKey: 'key'
    const regex3 = /i18nKey:\s*['"]([^'"]+)['"]/g;
    while ((match = regex3.exec(content)) !== null) {
        keysFound.add(match[1]);
    }
});

let transContent = fs.readFileSync(transFile, 'utf8');

// Basic parser to inject keys into translationsExtended
const languages = ['en', 'ta', 'te', 'hi', 'kn', 'ml', 'mr', 'gu'];

// mock translation generator based on English
function mockTranslate(lang, englishText) {
    if (!englishText) return "";
    const prefix = {
        'ta': 'தமிழ் ',
        'te': 'తెలుగు ',
        'hi': 'हिन्दी ',
        'kn': 'ಕನ್ನಡ ',
        'ml': 'മലയാളം ',
        'mr': 'मराठी ',
        'gu': 'ગુજરાતી '
    }[lang] || '';
    if (lang === 'en') return englishText;
    return prefix + englishText;
}

// We will recreate the translationsExtended object strings!
// Actually, it's safer to just require it or evaluate it, modify it, and stringify it? No, it's TS.
// Let's use regex to find each language block: `en: { ... }, ta: { ... }`

for (const lang of languages) {
    const langRegex = new RegExp(`${lang}:\\s*\\{([\\s\\S]*?)\n    (?:\\},|\\}$|\\/[\\/*]|^[a-z]{2}:)`, 'm');
    const match = transContent.match(langRegex);
    if (match) {
        const block = match[1];
        let newBlock = block;
        keysFound.forEach(key => {
            const safeKey = `'${key}'`;
            if (!block.includes(`${safeKey}:`) && !block.includes(`"${key}":`)) {
                // Key is missing
                const val = defaultVals[key] || "Text";
                const newVal = mockTranslate(lang, val);
                newBlock += `,\n        ${safeKey}: "${newVal.replace(/"/g, '\\"')}"`;
            }
        });
        transContent = transContent.replace(block, newBlock);
    }
}

fs.writeFileSync(transFile, transContent);
console.log('Injected ' + keysFound.size + ' unique keys.');
