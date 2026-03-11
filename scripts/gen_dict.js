const fs = require('fs');
const path = require('path');

const newTranslations = {
    en: {
        'hero.project': 'Project : S.H.I.E.L.D',
        'auth.btn.regFarm': 'REGISTER AS FARMER',
        'auth.btn.regCust': 'REGISTER AS CUSTOMER',
        'auth.btn.logFarm': 'LOGIN AS FARMER',
        'auth.btn.logCust': 'LOGIN AS CUSTOMER',
        
        // Farmer Sidebar & Topbar
        'nav.hub': 'Farmer Hub',
        'nav.logout': 'Logout',
        'farm.top.title': 'DASHBOARD OVERVIEW',
        'farm.top.status': 'STATUS',

        // Shop / Customer
        'shop.title': 'Marketplace',
        'shop.subtitle': 'Verified organic produce from trusted sources',
        'shop.filter': 'Filter',
        'shop.sort': 'Sort',
        'shop.price_asc': 'Price: Low to High',
        'shop.price_desc': 'Price: High to Low',
        'shop.origin': 'Origin',
        'shop.type': 'Type',
        'shop.all': 'All',

        // Add Product
        'prod.add.title': 'Add New Product',
        'prod.add.desc': 'List a new crop or product to the marketplace.',
        'prod.name': 'Product Name',
        'prod.category': 'Category',
        'prod.price': 'Price ($)',
        'prod.unit': 'Unit (e.g., kg, ton)',
        'prod.quantity': 'Total Quantity',
        'prod.type': 'Sale Type',
        'prod.type.retail': 'Retail',
        'prod.type.wholesale': 'Wholesale',
        'prod.origin': 'Farm Origin',
        'prod.date': 'Harvest Date',
        'prod.submit': 'Add Product To Blockchain',
        
        // My Products
        'prod.my.title': 'My Products Matrix',
        'prod.my.desc': 'Live status of your listed agricultural assets.',
        'prod.th.product': 'Product',
        'prod.th.category': 'Category',
        'prod.th.price': 'Price',
        'prod.th.stock': 'Stock',
        'prod.th.type': 'Type',
        'prod.th.actions': 'Actions',
        'prod.edit': 'Edit',
        'prod.del': 'Del',

        // Crop Monitor
        'crop.title': 'IoT Crop Monitor',
        'crop.desc': 'Real-time telemetry from active sensor nodes.',
        'crop.moisture': 'Soil Moisture',
        'crop.temp': 'Temperature',
        'crop.ph': 'pH Level',
        'crop.npk': 'NPK Status',
        'crop.nitrogen': 'Nitrogen',
        'crop.phosphorus': 'Phosphorus',
        'crop.potassium': 'Potassium',
        'crop.status.optimal': 'Optimal',
        'crop.status.critical': 'Critical',
        'crop.status.warning': 'Warning',
        
        // Analytics
        'stat.title': 'Analytics Hub',
        'stat.desc': "Comprehensive metrics mapping your farm's performance.",
        'stat.rev': 'Weekly Revenue',
        'stat.type': 'Order Types',
        'stat.best': 'Best Selling Products',
        'stat.heat': 'Pest Activity Heatmap',
        'stat.heat.desc': 'Data collecting... Require more sensor readings.',
    },
    ta: {
        'hero.project': 'திட்டம் : S.H.I.E.L.D',
        'auth.btn.regFarm': 'விவசாயியாக பதிவு செய்க',
        'auth.btn.regCust': 'வாடிக்கையாளராக பதிவு செய்க',
        'auth.btn.logFarm': 'விவசாயியாக உள்நுழைக',
        'auth.btn.logCust': 'வாடிக்கையாளராக உள்நுழைக',
        
        // Farmer Sidebar & Topbar
        'nav.hub': 'விவசாயி மையம்',
        'nav.logout': 'வெளியேறு',
        'farm.top.title': 'டாஷ்போர்டு கண்ணோட்டம்',
        'farm.top.status': 'நிலை',

        // Shop / Customer
        'shop.title': 'சந்தை',
        'shop.subtitle': 'நம்பகமான மூலாதாரங்களில் இருந்து சரிபார்க்கப்பட்ட தயாரிப்புகள்',
        'shop.filter': 'வடிகட்டி',
        'shop.sort': 'வரிசைப்படுத்து',
        'shop.price_asc': 'விலை: குறைந்ததிலிருந்து அதிகம்',
        'shop.price_desc': 'விலை: அதிகத்திலுருந்து குறைவு',
        'shop.origin': 'தோற்றம்',
        'shop.type': 'வகை',
        'shop.all': 'அனைத்தும்',

        // Add Product
        'prod.add.title': 'புதிய தயாரிப்பைச் சேர்',
        'prod.add.desc': 'சந்தைக்கு ஒரு புதிய பயிரை பட்டியலிடுங்கள்.',
        'prod.name': 'தயாரிப்பு பெயர்',
        'prod.category': 'வகை',
        'prod.price': 'விலை ($)',
        'prod.unit': 'அலகு (உ.ம்., கிலோ, டன்)',
        'prod.quantity': 'மொத்த அளவு',
        'prod.type': 'விற்பனை வகை',
        'prod.type.retail': 'சில்லறை',
        'prod.type.wholesale': 'மொத்தம்',
        'prod.origin': 'பண்ணை தோற்றம்',
        'prod.date': 'அறுவடை தேதி',
        'prod.submit': 'பிளாக்செயினில் தயாரிப்பைச் சேர்',
        
        // My Products
        'prod.my.title': 'என் தயாரிப்புகள் அணிவரிசை',
        'prod.my.desc': 'உங்கள் பட்டியலிடப்பட்ட விவசாய சொத்துகளின் நேரடி நிலை.',
        'prod.th.product': 'தயாரிப்பு',
        'prod.th.category': 'வகை',
        'prod.th.price': 'விலை',
        'prod.th.stock': 'இருப்பு',
        'prod.th.type': 'வகை',
        'prod.th.actions': 'செயல்கள்',
        'prod.edit': 'த திருத்து',
        'prod.del': 'அழி',

        // Crop Monitor
        'crop.title': 'IoT பயிர் மாணிட்டர்',
        'crop.desc': 'சென்சார் முனைகளில் இருந்து நிகழ்நேர டெலிமெட்ரி.',
        'crop.moisture': 'மண் ஈரப்பதம்',
        'crop.temp': 'வெப்பநிலை',
        'crop.ph': 'pH நிலை',
        'crop.npk': 'NPK நிலை',
        'crop.nitrogen': 'நைட்ரஜன்',
        'crop.phosphorus': 'பாஸ்பரஸ்',
        'crop.potassium': 'பொட்டாசியம்',
        'crop.status.optimal': 'உகந்தது',
        'crop.status.critical': 'மிக முக்கியமானது',
        'crop.status.warning': 'எச்சரிக்கை',
        
        // Analytics
        'stat.title': 'பகுப்பாய்வு மையம்',
        'stat.desc': "உங்கள் பண்ணையின் செயல்திறனைக் காட்டும் அளவீடுகள்.",
        'stat.rev': 'வாராந்திர வருவாய்',
        'stat.type': 'ஆர்டர் வகைகள்',
        'stat.best': 'சிறந்த விற்பனையாகும் தயாரிப்புகள்',
        'stat.heat': 'பூச்சி செயல்பாட்டு வரைபடம்',
        'stat.heat.desc': 'தரவு சேகரிக்கப்படுகிறது... மேலும் சென்சார் தறுவுகள் தேவை.',
    },
    te: {
        'hero.project': 'ప్రాజెక్ట్ : S.H.I.E.L.D',
        'auth.btn.regFarm': 'రైతుగా నమోదు చేసుకోండి',
        'auth.btn.regCust': 'వినియోగదారుడిగా నమోదు చేసుకోండి',
        'auth.btn.logFarm': 'రైతుగా లాగిన్ అవ్వండి',
        'auth.btn.logCust': 'వినియోగదారుడిగా లాగిన్ అవ్వండి',
        
        // Farmer Sidebar & Topbar
        'nav.hub': 'రైతు హబ్',
        'nav.logout': 'లాగౌట్',
        'farm.top.title': 'డాష్‌బోర్డ్ అవలోకనం',
        'farm.top.status': 'స్థితి',

        // Shop / Customer
        'shop.title': 'మార్కెట్‌ప్లేస్',
        'shop.subtitle': 'నమ్మకమైన మూలాల నుండి ధృవీకరించబడిన సేంద్రీయ ఉత్పత్తులు',
        'shop.filter': 'ఫిల్టర్',
        'shop.sort': 'క్రమబద్ధీకరించు',
        'shop.price_asc': 'ధర: తక్కువ నుండి ఎక్కువ వరకు',
        'shop.price_desc': 'ధర: ఎక్కువ నుండి తక్కువ వరకు',
        'shop.origin': 'మూలం',
        'shop.type': 'రకం',
        'shop.all': 'అన్నీ',

        // Add Product
        'prod.add.title': 'కొత్త ఉత్పత్తిని జోడించు',
        'prod.add.desc': 'కొత్త పంట లేదా ఉత్పత్తిని జాబితా చేయండి.',
        'prod.name': 'ఉత్పత్తి పేరు',
        'prod.category': 'వర్గం',
        'prod.price': 'ధర ($)',
        'prod.unit': 'యూనిట్ (ఉదా., కేజీ, టన్ను)',
        'prod.quantity': 'మొత్తం పరిమాణం',
        'prod.type': 'విక్రయం రకం',
        'prod.type.retail': 'రిటైల్',
        'prod.type.wholesale': 'హోల్‌సేల్',
        'prod.origin': 'పొలం మూలం',
        'prod.date': 'హార్వెస్ట్ తేదీ',
        'prod.submit': 'బ్లాక్‌చెయిన్‌కి ఉత్పత్తిని జోడించు',
        
        // My Products
        'prod.my.title': 'నా ఉత్పత్తుల మ్యాట్రిక్స్',
        'prod.my.desc': 'మీ వ్యవసాయ ఆస్తుల ప్రత్యక్ష స్థితి.',
        'prod.th.product': 'ఉత్పత్తి',
        'prod.th.category': 'వర్గం',
        'prod.th.price': 'ధర',
        'prod.th.stock': 'స్టాక్',
        'prod.th.type': 'రకం',
        'prod.th.actions': 'చర్యలు',
        'prod.edit': 'సవరించు',
        'prod.del': 'తొలగించు',

        // Crop Monitor
        'crop.title': 'IoT పంట మానిటర్',
        'crop.desc': 'సెన్సార్ల నుండి రియల్ టైమ్ టెలిమెట్రీ.',
        'crop.moisture': 'నేల తేమ',
        'crop.temp': 'ఉష్ణోగ్రత',
        'crop.ph': 'pH స్థాయి',
        'crop.npk': 'NPK స్థితి',
        'crop.nitrogen': 'నత్రజని',
        'crop.phosphorus': 'భాస్వరం',
        'crop.potassium': 'పొటాషియం',
        'crop.status.optimal': 'అనుకూలమైనది',
        'crop.status.critical': 'క్లిష్టమైన',
        'crop.status.warning': 'హెచ్చరిక',
        
        // Analytics
        'stat.title': 'విశ్లేషణల కేంద్రం',
        'stat.desc': "మీ పొలం పనితీరును మ్యాప్ చేసే సమగ్ర కొలమానాలు.",
        'stat.rev': 'వారపు ఆదాయం',
        'stat.type': 'ఆర్డర్ రకాలు',
        'stat.best': 'అత్యధికంగా అమ్ముడవుతున్న ఉత్పత్తులు',
        'stat.heat': 'పెస్ట్ యాక్టివిటీ హీట్‌మ్యాప్',
        'stat.heat.desc': 'డేటా సేకరించబడుతోంది... మరిన్ని సెన్సార్ రీడింగ్‌లు అవసరం.',
    },
    hi: {
        'hero.project': 'प्रोजेक्ट : S.H.I.E.L.D',
        'auth.btn.regFarm': 'किसान के रूप में पंजीकरण करें',
        'auth.btn.regCust': 'ग्राहक के रूप में पंजीकरण करें',
        'auth.btn.logFarm': 'किसान के रूप में लॉग इन करें',
        'auth.btn.logCust': 'ग्राहक के रूप में लॉग इन करें',
        
        // Farmer Sidebar & Topbar
        'nav.hub': 'किसान हब',
        'nav.logout': 'लॉग आउट',
        'farm.top.title': 'डैशबोर्ड अवलोकन',
        'farm.top.status': 'स्थिति',

        // Shop / Customer
        'shop.title': 'मार्केटप्लेस',
        'shop.subtitle': 'विश्वसनीय स्रोतों से उपज',
        'shop.filter': 'फ़िल्टर',
        'shop.sort': 'क्रमबद्ध करें',
        'shop.price_asc': 'मूल्य: कम से ज्यादा',
        'shop.price_desc': 'मूल्य: ज्यादा से कम',
        'shop.origin': 'मूल',
        'shop.type': 'प्रकार',
        'shop.all': 'सभी',

        // Add Product
        'prod.add.title': 'नया उत्पाद जोड़ें',
        'prod.add.desc': 'बाज़ार में नई फसल सूचीबद्ध करें।',
        'prod.name': 'उत्पाद का नाम',
        'prod.category': 'श्रेणी',
        'prod.price': 'मूल्य ($)',
        'prod.unit': 'इकाई (उदा. किलो)',
        'prod.quantity': 'कुल मात्रा',
        'prod.type': 'बिक्री का प्रकार',
        'prod.type.retail': 'खुदरा',
        'prod.type.wholesale': 'थोक',
        'prod.origin': 'खेत का मूल',
        'prod.date': 'कटाई की तिथि',
        'prod.submit': 'ब्लॉकचेन में जोड़ें',
        
        // My Products
        'prod.my.title': 'मेरे उत्पाद',
        'prod.my.desc': 'आपकी कृषि संपत्तियों की लाइव स्थिति।',
        'prod.th.product': 'उत्पाद',
        'prod.th.category': 'श्रेणी',
        'prod.th.price': 'मूल्य',
        'prod.th.stock': 'स्टॉक',
        'prod.th.type': 'प्रकार',
        'prod.th.actions': 'कार्रवाई',
        'prod.edit': 'संपादित करें',
        'prod.del': 'हटाएं',

        // Crop Monitor
        'crop.title': 'IoT फसल मॉनिटर',
        'crop.desc': 'सेंसर नोड्स से रीयल-टाइम डेटा।',
        'crop.moisture': 'मिट्टी की नमी',
        'crop.temp': 'तापमान',
        'crop.ph': 'pH स्तर',
        'crop.npk': 'NPK स्थिति',
        'crop.nitrogen': 'नाइट्रोजन',
        'crop.phosphorus': 'फास्फोरस',
        'crop.potassium': 'पोटेशियम',
        'crop.status.optimal': 'अनुकूल',
        'crop.status.critical': 'गंभीर',
        'crop.status.warning': 'चेतावनी',
        
        // Analytics
        'stat.title': 'एनालिटिक्स हब',
        'stat.desc': "आपके खेत के प्रदर्शन के मेट्रिक्स।",
        'stat.rev': 'साप्ताहिक राजस्व',
        'stat.type': 'ऑर्डर के प्रकार',
        'stat.best': 'सर्वश्रेष्ठ उत्पाद',
        'stat.heat': 'कीट गतिविधि हीटमैप',
        'stat.heat.desc': 'कलेक्शन जारी... और डेटा चाहिए।',
    },
    kn: {
        'hero.project': 'ಪ್ರಾಜೆಕ್ಟ್ : S.H.I.E.L.D',
        'auth.btn.regFarm': 'ರೈತನಾಗಿ ನೋಂದಾಯಿಸಿ',
        'auth.btn.regCust': 'ಗ್ರಾಹಕರಾಗಿ ನೋಂದಾಯಿಸಿ',
        'auth.btn.logFarm': 'ರೈತನಾಗಿ ಲಾಗಿನ್',
        'auth.btn.logCust': 'ಗ್ರಾಹಕರಾಗಿ ಲಾಗಿನ್',
        
        // Farmer Sidebar & Topbar
        'nav.hub': 'ರೈತರ ಹಬ್',
        'nav.logout': 'ಲಾಗ್ ಔಟ್',
        'farm.top.title': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
        'farm.top.status': 'ಸ್ಥಿತಿ',

        // Shop / Customer
        'shop.title': 'ಮಾರುಕಟ್ಟೆ',
        'shop.subtitle': 'ವಿಶ್ವಾಸಾರ್ಹ ಉತ್ಪನ್ನಗಳು',
        'shop.filter': 'ಫಿಲ್ಟರ್',
        'shop.sort': 'ವಿಂಗಡಿಸು',
        'shop.price_asc': 'ಬೆಲೆ: ಕಡಿಮೆ ಯಿಂದ ಹೆಚ್ಚು',
        'shop.price_desc': 'ಬೆಲೆ: ಹೆಚ್ಚು ಯಿಂದ ಕಡಿಮೆ',
        'shop.origin': 'ಮೂಲ',
        'shop.type': 'ವಿಧ',
        'shop.all': 'ಎಲ್ಲಾ',

        // Add Product
        'prod.add.title': 'ಹೊಸ ಉತ್ಪನ್ನ ಸೇರಿಸಿ',
        'prod.add.desc': 'ಮಾರುಕಟ್ಟೆಗೆ ಹೊಸ ಬೆಳೆ ಪಟ್ಟಿ ಮಾಡಿ.',
        'prod.name': 'ಉತ್ಪನ್ನದ ಹೆಸರು',
        'prod.category': 'ವರ್ಗ',
        'prod.price': 'ಬೆಲೆ ($)',
        'prod.unit': 'ಘಟಕ (ಉದಾ. ಕೆಜಿ)',
        'prod.quantity': 'ಒಟ್ಟು ಪ್ರಮಾಣ',
        'prod.type': 'ಮಾರಾಟದ ಪ್ರಕಾರ',
        'prod.type.retail': 'ಚಿಲ್ಲರೆ',
        'prod.type.wholesale': 'ಸಗಟು',
        'prod.origin': 'ಕೃಷಿ ಮೂಲ',
        'prod.date': 'ಕೊಯ್ಲು ದಿನಾಂಕ',
        'prod.submit': 'ಬ್ಲಾಕ್‌ಚೈನ್‌ಗೆ ಸೇರಿಸಿ',
        
        // My Products
        'prod.my.title': 'ನನ್ನ ಉತ್ಪನ್ನಗಳು',
        'prod.my.desc': 'ನಿಮ್ಮ ಆಸ್ತಿಗಳ ಲೈವ್ ಸ್ಥಿತಿ.',
        'prod.th.product': 'ಉತ್ಪನ್ನ',
        'prod.th.category': 'ವರ್ಗ',
        'prod.th.price': 'ಬೆಲೆ',
        'prod.th.stock': 'ಸ್ಟಾಕ್',
        'prod.th.type': 'ಪ್ರಕಾರ',
        'prod.th.actions': 'ಕ್ರಿಯೆಗಳು',
        'prod.edit': 'ತಿದ್ದು',
        'prod.del': 'ಅಳಿಸು',

        // Crop Monitor
        'crop.title': 'IoT ಬೆಳೆ ಮಾನಿಟರ್',
        'crop.desc': 'ಸಂವೇದಕಗಳಿಂದ ಡೇಟಾ.',
        'crop.moisture': 'ಮಣ್ಣಿನ ತೇವಾಂಶ',
        'crop.temp': 'ತಾಪಮಾನ',
        'crop.ph': 'pH ಮಟ್ಟ',
        'crop.npk': 'NPK ಸ್ಥಿತಿ',
        'crop.nitrogen': 'ಸಾರಜನಕ',
        'crop.phosphorus': 'ರಂಜಕ',
        'crop.potassium': 'ಪೊಟ್ಯಾಸಿಯಮ್',
        'crop.status.optimal': 'ಉತ್ತಮ',
        'crop.status.critical': 'ಗಂಭೀರ',
        'crop.status.warning': 'ಎಚ್ಚರಿಕೆ',
        
        // Analytics
        'stat.title': 'ವಿಶ್ಲೇಷಣೆ ಹಬ್',
        'stat.desc': "ನಿಮ್ಮ ಜಮೀನಿನ ಕಾರ್ಯಕ್ಷಮತೆ.",
        'stat.rev': 'ಸಾಪ್ತಾಹಿಕ ಆದಾಯ',
        'stat.type': 'ಆದೇಶದ ಪ್ರಕಾರಗಳು',
        'stat.best': 'ಉತ್ತಮ ಉತ್ಪನ್ನಗಳು',
        'stat.heat': 'ಕೀಟ ಚಟುವಟಿಕೆ ಮ್ಯಾಪ್',
        'stat.heat.desc': 'ಡೇಟಾ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತಿದೆ...',
    },
    ml: {
        'hero.project': 'പ്രൊജക്ട് : S.H.I.E.L.D',
        'auth.btn.regFarm': 'കർഷകനായി രജിസ്റ്റർ ചെയ്യുക',
        'auth.btn.regCust': 'ഉപഭോക്താവായി രജിസ്റ്റർ ചെയ്യുക',
        'auth.btn.logFarm': 'കർഷകനായി ലോഗിൻ ചെയ്യുക',
        'auth.btn.logCust': 'ഉപഭോക്താവായി ലോഗിൻ ചെയ്യുക',
        
        // Farmer Sidebar & Topbar
        'nav.hub': 'കർഷക ഹബ്',
        'nav.logout': 'ലോഗ്ഔട്ട്',
        'farm.top.title': 'ഡാഷ്‌ബോർഡ്',
        'farm.top.status': 'അവസ്ഥ',

        // Shop / Customer
        'shop.title': 'മാർക്കറ്റ് പ്ലേസ്',
        'shop.subtitle': 'വിശ്വസനീയമായ ഉറവിടങ്ങളിൽ നിന്നുള്ള ഉൽപ്പന്നങ്ങൾ',
        'shop.filter': 'ഫിൽട്ടർ',
        'shop.sort': 'ക്രമീകരിക്കുക',
        'shop.price_asc': 'വില: കുറവ് മുതൽ കൂടുതൽ',
        'shop.price_desc': 'വില: കൂടുതൽ മുതൽ കുറവ്',
        'shop.origin': 'ഉത്ഭവം',
        'shop.type': 'തരം',
        'shop.all': 'എല്ലാം',

        // Add Product
        'prod.add.title': 'പുതിയ ഉൽപ്പന്നം ചേർക്കുക',
        'prod.add.desc': 'ഒരു പുതിയ വിള ചേർക്കുക.',
        'prod.name': 'ഉൽപ്പന്നത്തിന്റെ പേര്',
        'prod.category': 'വിഭാഗം',
        'prod.price': 'വില ($)',
        'prod.unit': 'യൂണിറ്റ് (ഉദാ: കി.ഗ്രാം)',
        'prod.quantity': 'മൊത്തം അളവ്',
        'prod.type': 'വിൽപ്പന തരം',
        'prod.type.retail': 'റീട്ടെയിൽ',
        'prod.type.wholesale': 'ഹോൾസെയിൽ',
        'prod.origin': 'കൃഷിയിടം',
        'prod.date': 'വിളവെടുപ്പ് തീയതി',
        'prod.submit': 'ബ്ലോക്ക്ചെയിനിൽ ചേർക്കുക',
        
        // My Products
        'prod.my.title': 'എന്റെ ഉൽപ്പന്നങ്ങൾ',
        'prod.my.desc': 'നിങ്ങളുടെ ആസ്തികളുടെ തൽസമയ നില.',
        'prod.th.product': 'ഉൽപ്പന്നം',
        'prod.th.category': 'വിഭാഗം',
        'prod.th.price': 'വില',
        'prod.th.stock': 'സ്റ്റോക്ക്',
        'prod.th.type': 'തരം',
        'prod.th.actions': 'പ്രവർത്തനങ്ങൾ',
        'prod.edit': 'തിരുത്തുക',
        'prod.del': 'മായ്ക്കുക',

        // Crop Monitor
        'crop.title': 'IoT വിള മോണിറ്റർ',
        'crop.desc': 'സെൻസറുകളിൽ നിന്നുള്ള ഡാറ്റ.',
        'crop.moisture': 'മണ്ണിലെ ഈർപ്പം',
        'crop.temp': 'താപനില',
        'crop.ph': 'pH ലെവൽ',
        'crop.npk': 'NPK നില',
        'crop.nitrogen': 'നൈട്രജൻ',
        'crop.phosphorus': 'ഫോസ്ഫറസ്',
        'crop.potassium': 'പൊട്ടാസ്യം',
        'crop.status.optimal': 'അനുകൂലം',
        'crop.status.critical': 'ഗുരുതരം',
        'crop.status.warning': 'മുന്നറിയിപ്പ്',
        
        // Analytics
        'stat.title': 'അനലിറ്റിക്സ് ഹബ്',
        'stat.desc': "നിങ്ങളുടെ കൃഷിയിടത്തിന്റെ പ്രകടനം.",
        'stat.rev': 'പ്രതിവാര വരുമാനം',
        'stat.type': 'ഓർഡർ തരങ്ങൾ',
        'stat.best': 'മികച്ച ഉൽപ്പന്നങ്ങൾ',
        'stat.heat': 'കീട പ്രവർത്തന ഭൂപടം',
        'stat.heat.desc': 'ഡാറ്റ ശേഖരിക്കുന്നു...',
    },
    mr: {
        'hero.project': 'प्रकल्प : S.H.I.E.L.D',
        'auth.btn.regFarm': 'शेतकरी म्हणून नोंदणी करा',
        'auth.btn.regCust': 'ग्राहक म्हणून नोंदणी करा',
        'auth.btn.logFarm': 'शेतकरी म्हणून लॉग इन करा',
        'auth.btn.logCust': 'ग्राहक म्हणून लॉग इन करा',
        
        // Farmer Sidebar & Topbar
        'nav.hub': 'शेतकरी हब',
        'nav.logout': 'लॉग आउट',
        'farm.top.title': 'डॅशबोर्ड',
        'farm.top.status': 'स्थिती',

        // Shop / Customer
        'shop.title': 'मार्केटप्लेस',
        'shop.subtitle': 'विश्वसनीय उत्पादने',
        'shop.filter': 'फिल्टर',
        'shop.sort': 'क्रमवारी लावा',
        'shop.price_asc': 'किंमत: कमी ते जास्त',
        'shop.price_desc': 'किंमत: जास्त ते कमी',
        'shop.origin': 'मूळ',
        'shop.type': 'प्रकार',
        'shop.all': 'सर्व',

        // Add Product
        'prod.add.title': 'नवीन उत्पादन जोडा',
        'prod.add.desc': 'नवीन पीक जोडण्यासाठी.',
        'prod.name': 'उत्पादनाचे नाव',
        'prod.category': 'श्रेणी',
        'prod.price': 'किंमत ($)',
        'prod.unit': 'युनिट (उदा. किलो)',
        'prod.quantity': 'एकूण प्रमाण',
        'prod.type': 'विक्रीचा प्रकार',
        'prod.type.retail': 'किरकोळ',
        'prod.type.wholesale': 'घाऊक',
        'prod.origin': 'शेताचे मूळ',
        'prod.date': 'काढणीची तारीख',
        'prod.submit': 'ब्लॉकचेनवर जोडा',
        
        // My Products
        'prod.my.title': 'माझी उत्पादने',
        'prod.my.desc': 'तुमच्या मालमत्तेची थेट स्थिती.',
        'prod.th.product': 'उत्पादन',
        'prod.th.category': 'श्रेणी',
        'prod.th.price': 'किंमत',
        'prod.th.stock': 'स्टॉक',
        'prod.th.type': 'प्रकार',
        'prod.th.actions': 'कृती',
        'prod.edit': 'संपादित करा',
        'prod.del': 'हटवा',

        // Crop Monitor
        'crop.title': 'IoT पीक मॉनिटर',
        'crop.desc': 'सेन्सरकडून डेटा.',
        'crop.moisture': 'मातीतील ओलावा',
        'crop.temp': 'तापमान',
        'crop.ph': 'pH पातळी',
        'crop.npk': 'NPK स्थिती',
        'crop.nitrogen': 'नायट्रोजन',
        'crop.phosphorus': 'फॉस्फरस',
        'crop.potassium': 'पोटॅशियम',
        'crop.status.optimal': 'अनुकूल',
        'crop.status.critical': 'गंभीर',
        'crop.status.warning': 'चेतावणी',
        
        // Analytics
        'stat.title': 'अॅनालिटिक्स हब',
        'stat.desc': "तुमच्या शेताचे मेट्रिक्स.",
        'stat.rev': 'साप्ताहिक महसूल',
        'stat.type': 'ऑर्डरचे प्रकार',
        'stat.best': 'सर्वोत्कृष्ट उत्पादने',
        'stat.heat': 'कीटक अ‍ॅक्टिव्हिटी मॅप',
        'stat.heat.desc': 'डेटा गोळा करणे सुरू आहे...',
    },
    gu: {
        'hero.project': 'પ્રોજેક્ટ : S.H.I.E.L.D',
        'auth.btn.regFarm': 'ખેડૂત તરીકે નોંધણી કરો',
        'auth.btn.regCust': 'ગ્રાહક તરીકે નોંધણી કરો',
        'auth.btn.logFarm': 'ખેડૂત તરીકે લોગિન કરો',
        'auth.btn.logCust': 'ગ્રાહક તરીકે લોગિન કરો',
        
        // Farmer Sidebar & Topbar
        'nav.hub': 'ખેડૂત હબ',
        'nav.logout': 'લોગઆઉટ',
        'farm.top.title': 'ડેશબોર્ડ',
        'farm.top.status': 'સ્થિતિ',

        // Shop / Customer
        'shop.title': 'માર્કેટપ્લેસ',
        'shop.subtitle': 'વિશ્વસનીય સ્ત્રોતોમાંથી ઉત્પાદનો',
        'shop.filter': 'ફિલ્ટર',
        'shop.sort': 'ક્રમમાં ગોઠવો',
        'shop.price_asc': 'કિંમત: ઓછી થી વધુ',
        'shop.price_desc': 'કિંમત: વધુ થી ઓછી',
        'shop.origin': 'મૂળ',
        'shop.type': 'પ્રકાર',
        'shop.all': 'બધા',

        // Add Product
        'prod.add.title': 'નવું ઉત્પાદન ઉમેરો',
        'prod.add.desc': 'નવો પાક ઉમેરો.',
        'prod.name': 'ઉત્પાદન નામ',
        'prod.category': 'શ્રેણી',
        'prod.price': 'કિંમત ($)',
        'prod.unit': 'એકમ (દા.ત. કિલો)',
        'prod.quantity': 'કુલ જથ્થો',
        'prod.type': 'વેચાણ પ્રકાર',
        'prod.type.retail': 'છૂટક',
        'prod.type.wholesale': 'જથ્થાબંધ',
        'prod.origin': 'ખેતર મૂળ',
        'prod.date': 'લણણીની તારીખ',
        'prod.submit': 'બ્લોકચેનમાં ઉમેરો',
        
        // My Products
        'prod.my.title': 'મારા ઉત્પાદનો',
        'prod.my.desc': 'તમારી સંપત્તિની સ્થિતિ.',
        'prod.th.product': 'ઉત્પાદન',
        'prod.th.category': 'શ્રેણી',
        'prod.th.price': 'કિંમત',
        'prod.th.stock': 'સ્ટોક',
        'prod.th.type': 'પ્રકાર',
        'prod.th.actions': 'ક્રિયાઓ',
        'prod.edit': 'ફેરફાર',
        'prod.del': 'કાઢી નાખો',

        // Crop Monitor
        'crop.title': 'IoT પાક મોનિટર',
        'crop.desc': 'સેન્સર તરફથી ડેટા.',
        'crop.moisture': 'માટીનો ભેજ',
        'crop.temp': 'તાપમાન',
        'crop.ph': 'pH સ્તર',
        'crop.npk': 'NPK સ્થિતિ',
        'crop.nitrogen': 'નાઇટ્રોજન',
        'crop.phosphorus': 'ફોસ્ફરસ',
        'crop.potassium': 'પોટેશિયમ',
        'crop.status.optimal': 'અનુકૂળ',
        'crop.status.critical': 'ગંભીર',
        'crop.status.warning': 'ચેતવણી',
        
        // Analytics
        'stat.title': 'એનાલિટિક્સ હબ',
        'stat.desc': "તમારા ખેતરની કામગીરી.",
        'stat.rev': 'સાપ્તાહિક આવક',
        'stat.type': 'ઓર્ડરના પ્રકારો',
        'stat.best': 'શ્રેષ્ઠ ઉત્પાદનો',
        'stat.heat': 'જંતુ પ્રવૃત્તિ નકશો',
        'stat.heat.desc': 'ડેટા ભેગો કરી રહ્યો છે...',
    }
};

const extendedTranslationsPath = path.join(__dirname, '../src/locales/translations_extended.ts');

let extendedFile = fs.readFileSync(extendedTranslationsPath, 'utf8');

Object.keys(newTranslations).forEach(lang => {
    Object.keys(newTranslations[lang]).forEach(key => {
        const insertMatch = new RegExp(`\\s*'${key}':\\s*'.*?'`);
        
        // Try to replace if exists in translations_extended.ts, else inject just before the close bracket of the language block.
        const langRegex = new RegExp(`(${lang}:\\s*{[\\s\\S]*?)(}$)`, 'm');
        
        const existingLangBlock = extendedFile.match(langRegex);
        if(!existingLangBlock) return;
        
        if (extendedFile.includes(`'${key}':`)) {
             // Let's just blindly push it if not present, don't overcomplicate.
        } else {
             const keyVal = `        '${key}': '${newTranslations[lang][key].replace(/'/g, "\\'")}',\n`;
             // Append right before the close bracket for that language
             const replaceBlock = new RegExp(`(${lang}:\\s*{[\\s\\S]*?\\n)(\\s*})`, 'm');
             extendedFile = extendedFile.replace(replaceBlock, `$1${keyVal}$2`);
        }
    });
});

fs.writeFileSync(extendedTranslationsPath, extendedFile, 'utf8');
console.log("Translations Extended Updated Successfully!");
