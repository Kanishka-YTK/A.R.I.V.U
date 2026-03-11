const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'locales', 'translations_extended.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const resultLines = [];
const langKeys = new Map();
let currentLang = null;

for (let line of lines) {
    const langMatch = line.match(/^    ([a-z]{2}): \{/);
    if (langMatch) {
        currentLang = langMatch[1];
        langKeys.set(currentLang, new Set());
        resultLines.push(line);
        continue;
    }

    if (line.trim() === '},') {
        currentLang = null;
        resultLines.push(line);
        continue;
    }

    if (currentLang) {
        // Match both single and double quoted keys, and handle potential whitespace
        const keyMatch = line.match(/^\s+['"]([^'"]+)['"]:/);
        if (keyMatch) {
            const key = keyMatch[1];
            if (langKeys.get(currentLang).has(key)) {
                console.log(`Removing duplicate key "${key}" in language "${currentLang}"`);
                continue; // Skip duplicate
            }
            langKeys.get(currentLang).add(key);
        }
    }
    resultLines.push(line);
}

fs.writeFileSync(filePath, resultLines.join('\n'));
console.log('Finished removing duplicate keys.');
