
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'locales', 'translations_extended.ts');
let content = fs.readFileSync(filePath, 'utf8');

const monitorTranslations = {
    en: {
        'monitor.status': 'Status',
        'monitor.running': 'RUNNING',
        'monitor.stopped': 'STOPPED',
        'monitor.intruder': 'INTRUDER DETECTED',
        'monitor.clear': 'CLEAR',
        'monitor.optimal': 'OPTIMAL',
        'monitor.moderate': 'MODERATE',
        'monitor.dry': 'DRY - CRITICAL',
        'monitor.threshold': 'Threshold',
        'monitor.auto_mode': 'Auto Mode (Moisture Based)',
        'monitor.on': 'ON',
        'monitor.off': 'OFF',
        'monitor.auto': 'Auto',
        'monitor.manual': 'Manual',
        'monitor.active': 'Active',
        'monitor.arm': 'Arm System',
        'monitor.pattern_1': 'Continuous',
        'monitor.pattern_2': 'Pulse',
        'monitor.pattern_3': 'Random',
        'monitor.intensity': 'Intensity',
        'monitor.rules': 'Smart Rules Engine',
        'monitor.log': 'Security Log',
        'monitor.critical_msg': 'Critical: Intruder detected!',
        'monitor.info_msg': 'Info: Irrigation started.',
        'monitor.warn_msg': 'Warning: Low moisture.',
        'monitor.heartbeat': 'System heartbeat: Normal.',
        'monitor.chart.water': 'Water Usage (Weekly)',
        'monitor.chart.runtime': 'Motor Runtime (Daily)',
        'monitor.chart.temp_hum': 'Temp & Humidity (48h)',
        'monitor.chart.pest': 'Intrusion Detections (14D)',
        'monitor.chart.vibration': 'Vibration Activations',
    },
    ta: {
        'monitor.status': 'நிலை',
        'monitor.running': 'இயங்குகிறது',
        'monitor.stopped': 'நிறுத்தப்பட்டது',
        'monitor.intruder': 'ஊடுருவல் கண்டறியப்பட்டது',
        'monitor.clear': 'தெளிவானது',
        'monitor.optimal': 'உகந்தது',
        'monitor.moderate': 'மிதமானது',
        'monitor.dry': 'உலர் - முக்கியமானது',
        'monitor.threshold': 'வரம்பு',
        'monitor.auto_mode': 'தானியங்கி பயன்முறை (ஈரப்பதம் சார்ந்தது)',
        'monitor.on': 'ஆன்',
        'monitor.off': 'ஆஃப்',
        'monitor.auto': 'தானியங்கி',
        'monitor.manual': 'கையேடு',
        'monitor.active': 'செயலில் உள்ளது',
        'monitor.arm': 'அமைப்பை இயக்கவும்',
        'monitor.pattern_1': 'தொடர்ச்சியான',
        'monitor.pattern_2': 'துடிப்பு',
        'monitor.pattern_3': 'சீரற்ற',
        'monitor.intensity': 'தீவிரம்',
        'monitor.rules': 'ஸ்மார்ட் விதிகள் இயந்திரம்',
        'monitor.log': 'பாதுகாப்பு பதிவு',
        'monitor.critical_msg': 'முக்கியமானது: ஊடுருவல் கண்டறியப்பட்டது!',
        'monitor.info_msg': 'தகவல்: நீர்ப்பாசனம் தொடங்கியது.',
        'monitor.warn_msg': 'எச்சரிக்கை: குறைந்த ஈரப்பதம்.',
        'monitor.heartbeat': 'அமைப்பு செயல்பாடு: சாதாரணமானது.',
        'monitor.chart.water': 'நீர் பயன்பாடு (வாரம்)',
        'monitor.chart.runtime': 'மோட்டார் இயங்கும் நேரம் (நாள்)',
        'monitor.chart.temp_hum': 'வெப்பநிலை மற்றும் ஈரப்பதம் (48 மணி)',
        'monitor.chart.pest': 'ஊடுருவல் கண்டறிதல் (14 நாட்கள்)',
        'monitor.chart.vibration': 'அதிர்வு செயல்பாடுகள்',
    },
    te: {
        'monitor.status': 'స్థితి',
        'monitor.running': 'నడుస్తోంది',
        'monitor.stopped': 'నిలిపివేయబడింది',
        'monitor.intruder': 'చొరబాటు కనుగొనబడింది',
        'monitor.clear': 'క్లియర్',
        'monitor.optimal': 'అనుకూలమైనది',
        'monitor.moderate': 'మితమైనది',
        'monitor.dry': 'పొడి - క్లిష్టమైనది',
        'monitor.threshold': 'థ్రెషోల్డ్',
        'monitor.auto_mode': 'ఆటో మోడ్ (తేమ ఆధారిత)',
        'monitor.on': 'ఆన్',
        'monitor.off': 'ఆఫ్',
        'monitor.auto': 'ఆటో',
        'monitor.manual': 'మాన్యువల్',
        'monitor.active': 'క్రియాశీలకంగా ఉంది',
        'monitor.arm': 'సిస్టమ్ ఆయుధం',
        'monitor.pattern_1': 'నిరంతర',
        'monitor.pattern_2': 'పల్స్',
        'monitor.pattern_3': 'యాదృచ్ఛిక',
        'monitor.intensity': 'తీవ్రత',
        'monitor.rules': 'స్మార్ట్ రూల్స్ ఇంజిన్',
        'monitor.log': 'భద్రతా లాగ్',
        'monitor.critical_msg': 'క్లిష్టమైనది: చొరబాటుదారుడు కనుగొనబడ్డాడు!',
        'monitor.info_msg': 'సమాచారం: నీటి పారుదల ప్రారంభమైంది.',
        'monitor.warn_msg': 'హెచ్చరిక: తక్కువ తేమ.',
        'monitor.heartbeat': 'సిస్టమ్ హార్ట్ బీట్: సాధారణం.',
        'monitor.chart.water': 'నీటి వినియోగం (వారానికి)',
        'monitor.chart.runtime': 'మోటార్ రన్‌టైమ్ (రోజువారీ)',
        'monitor.chart.temp_hum': 'ఉష్ణోగ్రత & తేమ (48గం)',
        'monitor.chart.pest': 'చొరబాటు గుర్తింపులు (14రో)',
        'monitor.chart.vibration': 'వైబ్రేషన్ యాక్టివేషన్స్',
    },
    ml: {
        'monitor.status': 'നില',
        'monitor.running': 'പ്രവർത്തിക്കുന്നു',
        'monitor.stopped': 'നിർത്തിയിരിക്കുന്നു',
        'monitor.intruder': 'നുഴഞ്ഞുകയറ്റം കണ്ടെത്തി',
        'monitor.clear': 'വ്യക്തമാണ്',
        'monitor.optimal': 'അനുയോജ്യം',
        'monitor.moderate': 'മിതമായ',
        'monitor.dry': 'ഉണങ്ങിയ - നിർണ്ണായകമാണ്',
        'monitor.threshold': 'ത്രെഷോൾഡ്',
        'monitor.auto_mode': 'ഓട്ടോ മോഡ് (ഈർപ്പം അധിഷ്ഠിതം)',
        'monitor.on': 'ഓൺ',
        'monitor.off': 'ഓഫ്',
        'monitor.auto': 'ഓട്ടോ',
        'monitor.manual': 'മാനുവൽ',
        'monitor.active': 'സജീവമാണ്',
        'monitor.arm': 'സിസ്റ്റം സജ്ജമാക്കുക',
        'monitor.pattern_1': 'തുടർച്ചയായ',
        'monitor.pattern_2': 'പൾസ്',
        'monitor.pattern_3': 'ക്രമരഹിതം',
        'monitor.intensity': 'തീവ്രത',
        'monitor.rules': 'സ്മാർട്ട് റൂൾസ് എൻജിൻ',
        'monitor.log': 'സുരക്ഷാ ലോഗ്',
        'monitor.critical_msg': 'നിർണ്ണായകമാണ്: നുഴഞ്ഞുകയറ്റക്കാരനെ കണ്ടെത്തി!',
        'monitor.info_msg': 'വിവരം: നനയ്ക്കൽ ആരംഭിച്ചു.',
        'monitor.warn_msg': 'മുന്നറിയിപ്പ്: കുറഞ്ഞ ഈർപ്പം.',
        'monitor.heartbeat': 'സിസ്റ്റം ഹൃദയമിടിപ്പ്: സാധാരണ നില.',
        'monitor.chart.water': 'ജല ഉപയോഗം (ആഴ്ചതോറും)',
        'monitor.chart.runtime': 'മോട്ടോർ റൺടൈം (ദിവസേനയുള്ളത്)',
        'monitor.chart.temp_hum': 'താപനിലയും ഈർപ്പവും (48 മണിക്കൂർ)',
        'monitor.chart.pest': 'നുഴഞ്ഞുകയറ്റം കണ്ടെത്തൽ (14 ദിവസം)',
        'monitor.chart.vibration': 'വൈബ്രേഷൻ ആക്റ്റിവേഷനുകൾ',
    },
    hi: {
        'monitor.status': 'स्थिति',
        'monitor.running': 'चल रहा है',
        'monitor.stopped': 'रुका हुआ',
        'monitor.intruder': 'घुसपैठ पाया गया',
        'monitor.clear': 'साफ',
        'monitor.optimal': 'इष्टतम',
        'monitor.moderate': 'मध्यम',
        'monitor.dry': 'सूखा - गंभीर',
        'monitor.threshold': 'दहलीज',
        'monitor.auto_mode': 'ऑटो मोड (नमी आधारित)',
        'monitor.on': 'चालू',
        'monitor.off': 'बंद',
        'monitor.auto': 'ऑटो',
        'monitor.manual': 'मैनुअल',
        'monitor.active': 'सक्रिय',
        'monitor.arm': 'सिस्टम आर्म करें',
        'monitor.pattern_1': 'निरंतर',
        'monitor.pattern_2': 'पल्स',
        'monitor.pattern_3': 'यादृच्छिक',
        'monitor.intensity': 'तीव्रता',
        'monitor.rules': 'स्मार्ट रूल्स इंजन',
        'monitor.log': 'सुरक्षा लॉग',
        'monitor.critical_msg': 'गंभीर: घुसपैठिए का पता चला!',
        'monitor.info_msg': 'जानकारी: सिंचाई शुरू हुई।',
        'monitor.warn_msg': 'चेतावनी: कम नमी।',
        'monitor.heartbeat': 'सिस्टम हार्टबीट: सामान्य।',
        'monitor.chart.water': 'पानी का उपयोग (साप्ताहिक)',
        'monitor.chart.runtime': 'मोटर रनटाइम (दैनिक)',
        'monitor.chart.temp_hum': 'तापमान और आर्द्रता (48 घंटे)',
        'monitor.chart.pest': 'घुसपैठ का पता लगाना (14 दिन)',
        'monitor.chart.vibration': 'कंपन सक्रियण',
    }
};

const languages = ['en', 'ta', 'te', 'hi', 'kn', 'ml', 'mr', 'gu'];

languages.forEach(lang => {
    const langStartMatch = content.match(new RegExp(`    ${lang}: \\{`));
    if (!langStartMatch) return;
    const langStart = langStartMatch.index;
    
    let nextLangIdx = -1;
    let braceCount = 0;
    let foundStart = false;
    for (let i = langStart; i < content.length; i++) {
        if (content[i] === '{') {
            braceCount++;
            foundStart = true;
        } else if (content[i] === '}') {
            braceCount--;
            if (foundStart && braceCount === 0) {
                nextLangIdx = i + 1;
                break;
            }
        }
    }

    if (nextLangIdx === -1) return;

    let langContent = content.substring(langStart, nextLangIdx);
    const lines = langContent.split('\n');
    const seen = new Set();
    lines.forEach(line => {
        const m = line.match(/^\s*['"](.+?)['"]\s*:/);
        if (m) seen.add(m[1]);
    });
    
    const master = monitorTranslations[lang] || monitorTranslations['en'];
    const newLines = [];
    Object.entries(master).forEach(([key, val]) => {
        if (!seen.has(key)) {
            newLines.push(`        '${key}': '${val.replace(/'/g, "\\'")}',`);
            const upperKey = key.toUpperCase();
            if (!seen.has(upperKey)) {
                newLines.push(`        '${upperKey}': '${val.replace(/'/g, "\\'")}',`);
            }
        }
    });

    if (newLines.length > 0) {
        const lastBrace = langContent.lastIndexOf('}');
        langContent = langContent.substring(0, lastBrace) + newLines.join('\n') + '\n    ' + langContent.substring(lastBrace);
        content = content.substring(0, langStart) + langContent + content.substring(nextLangIdx);
    }
});

fs.writeFileSync(filePath, content);
console.log('Successfully updated monitor translations');
