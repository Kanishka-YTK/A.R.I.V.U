
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'locales', 'translations_extended.ts');
let content = fs.readFileSync(filePath, 'utf8');

const languages = ['en', 'ta', 'te', 'hi', 'kn', 'ml', 'mr', 'gu'];

const missingKeys = {
    en: {
        'farm.add_product': 'Add Product',
        'farm.view_orders': 'View Orders',
        'farm.sensors': 'Sensors',
        'farm.report': 'Report',
        'farm.low_stock': 'Low Stock Alerts',
        'farm.orders_desc': 'Manage and fulfill your customer requests.',
        'farm.delivered': 'Delivered',
        'farm.processing': 'Processing',
        'orders.id': 'Order ID',
        'orders.customer': 'Customer',
        'orders.product': 'Product',
        'orders.qty': 'Qty',
        'orders.type': 'Type',
        'orders.total': 'Total',
        'orders.country': 'Country',
        'orders.status': 'Status',
        'orders.pending': 'Pending',
        'orders.shipped': 'Shipped',
        'orders.confirmed': 'Confirmed',
        'orders.delivered': 'Delivered'
    },
    ta: {
        'farm.add_product': 'தயாரிப்பைச் சேர்',
        'farm.view_orders': 'ஆர்டர்களைப் பார்',
        'farm.sensors': 'சென்சார்கள்',
        'farm.report': 'அறிக்கை',
        'farm.low_stock': 'குறைந்த இருப்பு எச்சரிக்கைகள்',
        'farm.orders_desc': 'உங்கள் வாடிக்கையாளர் கோரிக்கைகளை நிர்வகிக்கவும் மற்றும் பூர்த்தி செய்யவும்.',
        'farm.delivered': 'டெலிவரி செய்யப்பட்டது',
        'farm.processing': 'செயலாக்கத்தில் உள்ளது',
        'orders.id': 'ஆர்டர் ஐடி',
        'orders.customer': 'வாடிக்கையாளர்',
        'orders.product': 'தயாரிப்பு',
        'orders.qty': 'அளவு',
        'orders.type': 'வகை',
        'orders.total': 'மொத்தம்',
        'orders.country': 'நாடு',
        'orders.status': 'நிலை',
        'orders.pending': 'நிலுவையில் உள்ளது',
        'orders.shipped': 'அனுப்பப்பட்டது',
        'orders.confirmed': 'உறுதிப்படுத்தப்பட்டது',
        'orders.delivered': 'டெலிவரி செய்யப்பட்டது'
    },
    te: {
        'farm.add_product': 'ఉత్పత్తిని జోడించండి',
        'farm.view_orders': 'ఆర్డర్‌లను చూడండి',
        'farm.sensors': 'సెన్సార్లు',
        'farm.report': 'నివేదిక',
        'farm.low_stock': 'తక్కువ స్టాక్ హెచ్చరికలు',
        'farm.orders_desc': 'మీ కస్టమర్ అభ్యర్థనలను నిర్వహించండి మరియు నెరవేర్చండి.',
        'farm.delivered': 'డెలివరీ చేయబడింది',
        'farm.processing': 'ప్రాసెసింగ్‌లో ఉంది',
        'orders.id': 'ఆర్డర్ ID',
        'orders.customer': 'కస్టమర్',
        'orders.product': 'ఉత్పత్తి',
        'orders.qty': 'పరిమాణం',
        'orders.type': 'రకం',
        'orders.total': 'మొత్తం',
        'orders.country': 'దేశం',
        'orders.status': 'స్థితి',
        'orders.pending': 'పెండింగ్‌లో ఉంది',
        'orders.shipped': 'షిప్పింగ్ చేయబడింది',
        'orders.confirmed': 'ధృవీకరించబడింది',
        'orders.delivered': 'డెలివరీ చేయబడింది'
    },
    hi: {
        'farm.add_product': 'उत्पाद जोड़ें',
        'farm.view_orders': 'आदेश देखें',
        'farm.sensors': 'सेंसर',
        'farm.report': 'रिपोर्ट',
        'farm.low_stock': 'कम स्टॉक अलर्ट',
        'farm.orders_desc': 'अपने ग्राहक अनुरोधों को प्रबंधित और पूरा करें।',
        'farm.delivered': 'डिलिवर किया गया',
        'farm.processing': 'प्रसंस्करण में',
        'orders.id': 'आदेश आईडी',
        'orders.customer': 'ग्राहक',
        'orders.product': 'उत्पाद',
        'orders.qty': 'मात्रा',
        'orders.type': 'प्रकार',
        'orders.total': 'कुल',
        'orders.country': 'देश',
        'orders.status': 'स्थिति',
        'orders.pending': 'लंबित',
        'orders.shipped': 'भेज दिया गया',
        'orders.confirmed': 'पुष्टि की गई',
        'orders.delivered': 'डिलिवर किया गया'
    },
    kn: {
        'farm.add_product': 'ಉತ್ಪನ್ನವನ್ನು ಸೇರಿಸಿ',
        'farm.view_orders': 'ಆದೇಶಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
        'farm.sensors': 'ಸೆನ್ಸರ್ಗಳು',
        'farm.report': 'ವರದಿ',
        'farm.low_stock': 'ಕಡಿಮೆ ಸ್ಟಾಕ್ ಎಚ್ಚರಿಕೆಗಳು',
        'farm.orders_desc': 'ನಿಮ್ಮ ಗ್ರಾಹಕರ ವಿನಂತಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ಪೂರೈಸಿ.',
        'farm.delivered': 'ತಲುಪಿಸಲಾಗಿದೆ',
        'farm.processing': 'ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ',
        'orders.id': 'ಆದೇಶದ ID',
        'orders.customer': 'ಗ್ರಾಹಕ',
        'orders.product': 'ಉತ್ಪನ್ನ',
        'orders.qty': 'ಪ್ರಮಾಣ',
        'orders.type': 'ವಿಧ',
        'orders.total': 'ಒಟ್ಟು',
        'orders.country': 'ದೇಶ',
        'orders.status': 'ಸ್ಥಿತಿ',
        'orders.pending': 'ಬಾಕಿ ಇದೆ',
        'orders.shipped': 'ರವಾನಿಸಲಾಗಿದೆ',
        'orders.confirmed': 'ದೃಢೀಕರಿಸಲಾಗಿದೆ',
        'orders.delivered': 'ತಲುಪಿಸಲಾಗಿದೆ'
    },
    ml: {
        'farm.add_product': 'ഉൽപ്പന്നം ചേർക്കുക',
        'farm.view_orders': 'ഓർഡറുകൾ കാണുക',
        'farm.sensors': 'സെൻസറുകൾ',
        'farm.report': 'റിപ്പോർട്ട്',
        'farm.low_stock': 'കുറഞ്ഞ സ്റ്റോക്ക് അറിയിപ്പുകൾ',
        'farm.orders_desc': 'നിങ്ങളുടെ ഉപഭോക്തൃ അഭ്യർത്ഥനകൾ നിയന്ത്രിക്കുകയും നിറവേറ്റുകയും ചെയ്യുക.',
        'farm.delivered': 'ഡെലിവർ ചെയ്തു',
        'farm.processing': 'പ്രോസസ്സിംഗിൽ',
        'orders.id': 'ഓർഡർ ഐഡി',
        'orders.customer': 'ഉപഭോക്താവ്',
        'orders.product': 'ഉൽപ്പന്നം',
        'orders.qty': 'അളവ്',
        'orders.type': 'തരം',
        'orders.total': 'ആകെ',
        'orders.country': 'രാജ്യം',
        'orders.status': 'നില',
        'orders.pending': 'തീർപ്പുകൽപ്പിച്ചിട്ടില്ല',
        'orders.shipped': 'അയച്ചു',
        'orders.confirmed': 'സ്ഥിരീകരിച്ചു',
        'orders.delivered': 'ഡെലിവർ ചെയ്തു'
    },
    mr: {
        'farm.add_product': 'उत्पादन जोडा',
        'farm.view_orders': 'ऑर्डर्स पहा',
        'farm.sensors': 'सेन्सर',
        'farm.report': 'रिपोर्ट',
        'farm.low_stock': 'कमी स्टॉक अलर्ट',
        'farm.orders_desc': 'आपल्या ग्राहकांच्या विनंत्या व्यवस्थापित करा आणि पूर्ण करा.',
        'farm.delivered': 'वितरित झाले',
        'farm.processing': 'प्रक्रिया सुरू आहे',
        'orders.id': 'ऑर्डर आयडी',
        'orders.customer': 'ग्राहक',
        'orders.product': 'उत्पादन',
        'orders.qty': 'प्रमाण',
        'orders.type': 'प्रकार',
        'orders.total': 'एकूण',
        'orders.country': 'देश',
        'orders.status': 'स्थिती',
        'orders.pending': 'लंबित',
        'orders.shipped': 'पाठवले',
        'orders.confirmed': 'निश्चित झाले',
        'orders.delivered': 'वितरित झाले'
    },
    gu: {
        'farm.add_product': 'ઉત્પાદન ઉમેરો',
        'farm.view_orders': 'ઓર્ડર જુઓ',
        'farm.sensors': 'સેન્સર',
        'farm.report': 'રિપોર્ટ',
        'farm.low_stock': 'ઓછા સ્ટોક એલર્ટ',
        'farm.orders_desc': 'તમારા ગ્રાહકોની વિનંતીઓ મેનેજ કરો અને પૂર્ણ કરો.',
        'farm.delivered': 'ડિલિવર થયું',
        'farm.processing': 'પ્રોસેસિંગમાં',
        'orders.id': 'ઓર્ડર આઈડી',
        'orders.customer': 'ગ્રાહક',
        'orders.product': 'ઉત્પાદન',
        'orders.qty': 'જથ્થો',
        'orders.type': 'પ્રકાર',
        'orders.total': 'કુલ',
        'orders.country': 'દેશ',
        'orders.status': 'સ્થિતિ',
        'orders.pending': 'બાકી',
        'orders.shipped': 'મોકલી દેવાયું',
        'orders.confirmed': 'કન્ફર્મ થયું',
        'orders.delivered': 'ડિલિવર થયું'
    }
};

languages.forEach(lang => {
    const langStart = content.indexOf(`    ${lang}: {`);
    let nextLangIdx = -1;
    const currentLangIdx = languages.indexOf(lang);
    if (currentLangIdx < languages.length - 1) {
        const nextLang = languages[currentLangIdx + 1];
        nextLangIdx = content.indexOf(`    ${nextLang}: {`);
    } else {
        nextLangIdx = content.lastIndexOf('}');
    }

    let langContent = content.substring(langStart, nextLangIdx);
    
    // Get existing keys
    const lines = langContent.split('\n');
    const seen = new Set();
    lines.forEach(line => {
        const m = line.match(/^\s*['"](.+?)['"]\s*:/);
        if (m) seen.add(m[1]);
    });
    
    // Add missing master keys
    const master = missingKeys[lang] || {};
    const newLines = [];
    Object.entries(master).forEach(([key, val]) => {
        if (!seen.has(key)) {
            newLines.push(`        '${key}': '${val.replace(/'/g, "\\'")}',`);
            // Also add uppercase version to handle everything
            const upperKey = key.toUpperCase();
            if (!seen.has(upperKey)) {
                newLines.push(`        '${upperKey}': '${val.replace(/'/g, "\\'")}',`);
            }
        }
    });

    if (newLines.length > 0) {
        // Find the last closing brace in langContent
        const lastBrace = langContent.lastIndexOf('}');
        langContent = langContent.substring(0, lastBrace) + newLines.join('\n') + '\n    ' + langContent.substring(lastBrace);
        content = content.substring(0, langStart) + langContent + content.substring(nextLangIdx);
    }
});

fs.writeFileSync(filePath, content);
console.log('Successfully added missing keys to translations_extended.ts');
