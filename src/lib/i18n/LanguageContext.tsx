'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import enDict from './dictionaries/en.json';
import trDict from './dictionaries/tr.json';
import esDict from './dictionaries/es.json';
import frDict from './dictionaries/fr.json';

const dictionaries = {
    en: enDict,
    tr: trDict,
    es: esDict,
    fr: frDict,
};

export type SupportedLanguage = keyof typeof dictionaries;

interface LanguageContextType {
    language: SupportedLanguage;
    setLanguage: (lang: SupportedLanguage) => void;
    t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<SupportedLanguage>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Check localStorage for saved language preference
        const savedLanguage = localStorage.getItem('app-language') as SupportedLanguage;
        if (savedLanguage && dictionaries[savedLanguage]) {
            setLanguageState(savedLanguage);
        } else {
            // Fallback to browser language
            const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
            if (dictionaries[browserLang]) {
                setLanguageState(browserLang);
            }
        }
        setMounted(true);
    }, []);

    const setLanguage = (lang: SupportedLanguage) => {
        setLanguageState(lang);
        localStorage.setItem('app-language', lang);
        document.documentElement.lang = lang;
    };

    const t = (path: string): string => {
        const keys = path.split('.');
        let value: any = dictionaries[language];

        // Fallback to english if something is missing in translation
        let enFallback: any = dictionaries['en'];

        for (const key of keys) {
            if (value) value = value[key];
            if (enFallback) enFallback = enFallback[key];
        }

        return value || enFallback || path;
    };

    // Prevent hydration mismatch by not rendering until client-side locale is known
    // Since Next.js requires consistent HTML, we render children, but we'll use a wrapper that changes key or just suppressHydrationWarning
    if (!mounted) {
        return (
            <LanguageContext.Provider value={{ language: 'en', setLanguage, t }}>
                <div style={{ visibility: 'hidden' }}>{children}</div>
            </LanguageContext.Provider>
        );
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        // Fallback for SSR or if used outside provider accidentally
        return {
            language: 'en' as SupportedLanguage,
            setLanguage: () => { },
            t: (path: string) => path // Just return the key during SSR
        };
    }
    return context;
}
