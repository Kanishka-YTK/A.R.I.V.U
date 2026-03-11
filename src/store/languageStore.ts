import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations, Language } from '@/locales/translations';
import { translationsExtended } from '@/locales/translations_extended';

interface LanguageState {
    currentLanguage: Language;
    isHydrated: boolean;
    setLanguage: (lang: Language) => void;
    setHydrated: (state: boolean) => void;
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            currentLanguage: 'en',
            isHydrated: false,
            setLanguage: (lang) => set({ currentLanguage: lang }),
            setHydrated: (state) => set({ isHydrated: state }),
        }),
        {
            name: 'arivu-language-storage',
            partialize: (state) => ({ currentLanguage: state.currentLanguage }),
            // CRITICAL: skipHydration prevents Zustand from auto-rehydrating from
            // localStorage during the first client render, which would cause a mismatch
            // with the server-rendered HTML (server always uses 'en').
            // TranslationWrapper manually calls rehydrate() in a useEffect instead.
            skipHydration: true,
            onRehydrateStorage: () => (state) => {
                // Mark hydration complete after localStorage state is loaded.
                // Called by manual rehydrate() in TranslationWrapper.
                if (state) state.setHydrated(true);
            }
        }
    )
);

/**
 * useTranslation — the correct way to get the `t()` function in components.
 *
 * WHY NOT `const { t } = useLanguageStore()`?
 * `t` was previously stored as a stable function reference in Zustand state.
 * A stable reference never changes, so Zustand's equality check sees no update
 * when `currentLanguage` changes → components using only `{ t }` would never
 * re-render on language switch.
 *
 * This hook explicitly subscribes to `currentLanguage` and `isHydrated`, so
 * every consumer re-renders whenever the language changes.
 */
export function useTranslation() {
    const currentLanguage = useLanguageStore((state) => state.currentLanguage);
    const isHydrated = useLanguageStore((state) => state.isHydrated);

    const t = (key: string, params?: Record<string, string | number>): string => {
        // During SSR / before rehydration, force 'en' to match server-rendered HTML.
        const activeLanguage = isHydrated ? currentLanguage : 'en';

        const langDictExtended = translationsExtended[activeLanguage] || translationsExtended['en'];
        const langDictBase = translations[activeLanguage] || translations['en'];

        let translation =
            langDictExtended[key] ||
            langDictBase[key as keyof typeof translations['en']] ||
            translationsExtended['en'][key] ||
            translations['en'][key as keyof typeof translations['en']] ||
            key;

        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                translation = translation.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
                translation = translation.replace(new RegExp(`{${k}}`, 'g'), String(v));
            });
        }

        return translation;
    };

    return { t, currentLanguage, isHydrated };
}
