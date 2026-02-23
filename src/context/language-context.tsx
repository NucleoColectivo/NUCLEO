'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import esTranslations from '@/lib/i18n/es.json';
import enTranslations from '@/lib/i18n/en.json';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => any;
}

const translations: Record<Language, any> = {
  es: esTranslations,
  en: enTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    // Optional: could add logic to detect browser language or read from cookie
    // For now, defaults to 'es'
    if (typeof window !== "undefined") {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en' || browserLang === 'es') {
        // setLanguage(browserLang);
      }
    }
  }, []);

  const t = useCallback((key: string): any => {
    const keys = key.split('.');
    let current = translations[language];
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        // Fallback to Spanish
        let fallback = translations.es;
        for (const fk of keys) {
            if (fallback && typeof fallback === 'object' && fk in fallback) {
                fallback = fallback[fk];
            } else {
                return key; // Key not found in either language
            }
        }
        return fallback;
      }
    }
    return current;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
