'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguageStore } from '@/store/languageStore';
import { translations, Language } from '@/locales/translations';

const langDisplayNames: Record<Language, string> = {
    en: 'English (English)',
    ta: 'தமிழ் (Tamil)',
    te: 'తెలుగు (Telugu)',
    hi: 'हिन्दी (Hindi)',
    kn: 'ಕನ್ನಡ (Kannada)',
    ml: 'മലയാളം (Malayalam)',
    mr: 'मराठी (Marathi)',
    gu: 'ગુજરાતી (Gujarati)',
};

export default function LanguageSwitcher() {
    const { currentLanguage, setLanguage } = useLanguageStore();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (lang: Language) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    return (
        <div className="relative z-50 inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-[#FFFFFF]/80 backdrop-blur-md border border-[#16A34A]/30 text-[#1A4731] px-4 py-2 text-label-fixed font-rajdhani font-bold tracking-widest uppercase rounded-full shadow-sm hover:bg-[#F0FAF0] transition-colors"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <Globe className="w-4 h-4 text-[#16A34A]" />
                <span className="hidden sm:inline-block">
                    {langDisplayNames[currentLanguage]}
                </span>
                <span className="sm:hidden">
                    {currentLanguage.toUpperCase()}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#FFFFFF] border border-[#16A34A]/30 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-1">
                        {(Object.keys(translations) as Language[]).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => handleSelect(lang)}
                                className={`w-full text-left px-4 py-3 text-label-fixed font-rajdhani font-bold tracking-wider hover:bg-[#F0FAF0] transition-colors flex items-center justify-between ${
                                    currentLanguage === lang ? 'bg-[#16A34A]/10 text-[#16A34A]' : 'text-[#374151]'
                                }`}
                            >
                                <span>{langDisplayNames[lang]}</span>
                                {currentLanguage === lang && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
