const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src', 'locales', 'translations_extended.ts');

let content = fs.readFileSync(file, 'utf8');

// Replace specific broken values
const languages = ['en', 'ta', 'te', 'hi', 'kn', 'ml', 'mr', 'gu'];
const prefixes = {
    'ta': 'தமிழ் ',
    'te': 'తెలుగు ',
    'hi': 'हिन्दी ',
    'kn': 'ಕನ್ನಡ ',
    'ml': 'മലയാളം ',
    'mr': 'मराठी ',
    'gu': 'ગુજરાતી ',
    'en': ''
};

languages.forEach(lang => {
    const p = prefixes[lang];
    // Fix auth.customerId
    content = content.replace(
        new RegExp(`'auth\\.customerId':\\s*"${p}auth\\.customerId"`, 'g'),
        `'auth.customerId': "${p}Customer ID (e.g., cust1)"`
    );
    // Fix card.farmer.login
    content = content.replace(
        new RegExp(`'card\\.farmer\\.login':\\s*"([^"]+)?Login as Farmer"`, 'g'),
        `'card.farmer.login': "${p}Click to Login"`
    );
    // Fix card.farmer.enter
    content = content.replace(
        new RegExp(`'card\\.farmer\\.enter':\\s*"([^"]+)?Enter as Farmer"`, 'g'),
        `'card.farmer.enter': "${p}Enter the Farmer Portal"`
    );
    // Fix card.customer.login
    content = content.replace(
        new RegExp(`'card\\.customer\\.login':\\s*"([^"]+)?Login as Customer"`, 'g'),
        `'card.customer.login': "${p}Click to Login"`
    );
    // Fix card.customer.enter
    content = content.replace(
        new RegExp(`'card\\.customer\\.enter':\\s*"([^"]+)?Enter as Customer"`, 'g'),
        `'card.customer.enter': "${p}Enter the Marketplace"`
    );
});

fs.writeFileSync(file, content);
console.log('Fixed translations!');
