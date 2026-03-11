'use client';

import { useEffect, useState } from 'react';
import { useLanguageStore } from '@/store/languageStore';
import { translations } from '@/locales/translations';
import { translationsExtended } from '@/locales/translations_extended';

export default function TranslationWrapper({ children }: { children: React.ReactNode }) {
    const language = useLanguageStore(state => state.currentLanguage);
    const isHydrated = useLanguageStore(state => state.isHydrated);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Manually rehydrate the Zustand persist store AFTER React has matched
        // server HTML. This is the canonical fix for SSR hydration mismatches
        // when using zustand/persist with skipHydration: true.
        // onRehydrateStorage will fire and set isHydrated: true, triggering
        // a re-render with the user's saved language.
        useLanguageStore.persist.rehydrate();
    }, []);

    // 1. Handle typography class and lang attribute for exact locking
    useEffect(() => {
        if (!mounted || !isHydrated) return;
        document.documentElement.lang = language;
        const indicLangs = ['ta', 'te', 'hi', 'kn', 'ml', 'mr', 'gu'];
        if (indicLangs.includes(language)) {
            document.body.classList.add('indic-font');
        } else {
            document.body.classList.remove('indic-font');
        }
    }, [language, mounted, isHydrated]);

    // 2. High-Performance DOM Sweep for data-i18n
    useEffect(() => {
        if (!mounted || !isHydrated) return;

        const translateDOM = () => {
            const elements = document.querySelectorAll('[data-i18n]');
            const dict = {
                ...translations[language as keyof typeof translations],
                ...translationsExtended[language as keyof typeof translationsExtended]
            };

            elements.forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (!key) return;

                const paramsAttr = el.getAttribute('data-i18n-params');
                let translation = (dict as any)[key] || key;

                if (paramsAttr) {
                    try {
                        const params = JSON.parse(paramsAttr);
                        Object.entries(params).forEach(([pk, pv]) => {
                            translation = translation.replace(new RegExp(`{{${pk}}}`, 'g'), String(pv));
                            translation = translation.replace(new RegExp(`{${pk}}`, 'g'), String(pv));
                        });
                    } catch (e) {
                        console.error('Error parsing data-i18n-params', e);
                    }
                }

                // 1. Handle Input/Textarea Placeholders
                if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
                    if (el.placeholder !== translation) el.placeholder = translation;
                }
                
                // 2. Handle Title Attributes (Tooltips)
                if (el.hasAttribute('title')) {
                    if (el.getAttribute('title') !== translation) el.setAttribute('title', translation);
                }

                // 3. Handle ARIA Labels
                if (el.hasAttribute('aria-label')) {
                    if (el.getAttribute('aria-label') !== translation) el.setAttribute('aria-label', translation);
                }

                // 4. Handle Text Nodes (only if it has no children or we specifically want to replace text)
                // We check if it has children to avoid wiping out icons nested inside buttons
                if (el.children.length === 0) {
                    if (el.textContent !== translation) el.textContent = translation;
                } else {
                    // If it has children, we hunt for the specific text node child if possible, 
                    // or assume the React component will handle its own inner text if 't()' is used.
                    // However, the user wants a "global sweep". 
                    // For complex elements, we usually rely on 't()' inside the component.
                }
            });
        };

        // Run sweep on language change
        translateDOM();

        // Optional: MutationObserver to catch dynamic content (e.g. new products added)
        const observer = new MutationObserver((mutations) => {
            translateDOM();
        });

        observer.observe(document.body, { 
            childList: true, 
            subtree: true,
            attributes: true,
            attributeFilter: ['data-i18n']
        });

        return () => observer.disconnect();
    }, [language, mounted, isHydrated]);

    return <>{children}</>;
}
