const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'locales', 'translations_extended.ts');
let content = fs.readFileSync(file, 'utf8');

// We will evaluate the file by stripping export and replacing it back,
// but it's typescript. So we'll use a regex replacer.
// Match all string values: "some value",
const regex = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;

// We need to fix specific bad values manually by replacing them
const badKeys = ['auth.name', 'auth.farmName', 'auth.aadhar', 'auth.email', 'auth.password', 'auth.farmerId', 'auth.role', 'hero.powered', 'card.farmer.title', 'card.farmer.desc', 'card.farmer.login', 'card.customer.title', 'card.customer.desc', 'card.customer.login'];

const fixes = {
    'auth.name': 'Name',
    'auth.farmName': 'Farm Name',
    'auth.aadhar': 'Aadhar Number',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.farmerId': 'Farmer ID',
    'auth.role': 'Select Role',
    'hero.powered': 'Powered by A.R.I.V.U',
    'card.farmer.title': 'I AM A FARMER',
    'card.farmer.desc': 'Manage products, track analytics, monitor crops.',
    'card.farmer.login': 'Login as Farmer',
    'card.customer.title': 'I AM A CUSTOMER',
    'card.customer.desc': 'Discover fresh organic produce directly from farms.',
    'card.customer.login': 'Login as Customer',
    'card.farmer.enter': 'Enter as Farmer',
    'card.customer.enter': 'Enter as Customer',
    'stats.farmers': 'Farmers',
    'stats.products': 'Products',
    'stats.countries': 'Countries',
    'stats.verified': 'Verified Farms',
    'auth.back': 'Back',
    'auth.register': 'Register'
};

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

const languages = ['en', 'ta', 'te', 'hi', 'kn', 'ml', 'mr', 'gu'];

for (const lang of languages) {
    const langRegex = new RegExp(`${lang}:\\s*\\{([\\s\\S]*?)\n    (?:\\},|\\}$|\\/[\\/*]|^[a-z]{2}:)`, 'm');
    const match = content.match(langRegex);
    if (match) {
        let block = match[1];
        
        // Find bad lines and replace them
        for (const [k, v] of Object.entries(fixes)) {
            const keyRegex = new RegExp(`'${k}':\\s*"([^"]*)"`, 'g');
            block = block.replace(keyRegex, `'${k}': "${prefixes[lang]}${v}"`);
        }
        
        // Also fix any value containing className or e.target
        const classRegex = /'([^']+)':\s*"[^"]*(?:className|e\.target)[^"]*"/g;
        block = block.replace(classRegex, (match, key) => {
            // It replaces unknown bad ones with "Text"
            return `'${key}': "${prefixes[lang]}${key}"`; 
        });

        // Also fix the generic "Text" or "prefix Text" with key
        const textRegex = new RegExp(`'([^']+)':\\s*"(${prefixes[lang]}Text|Text)"`, 'g');
        block = block.replace(textRegex, (match, key) => {
            let label = key.split('.').pop();
            label = label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, ' ');
            return `'${key}': "${prefixes[lang]}${label}"`;
        });

        content = content.replace(match[1], block);
    }
}

fs.writeFileSync(file, content);
console.log('Sanitized labels.');
