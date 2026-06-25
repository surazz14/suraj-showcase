import React, { createContext, useContext, useState, useEffect } from 'react';

// Import language files
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import fr from '@/locales/fr.json';

export type Language = 'en' | 'es' | 'fr';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const AVAILABLE_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

const translations = {
  en,
  es,
  fr,
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: LanguageOption[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  defaultLanguage = 'en' 
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first, then browser language, then default
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Check browser language
    const browserLanguage = navigator.language.split('-')[0] as Language;
    if (Object.keys(translations).includes(browserLanguage)) {
      return browserLanguage;
    }
    
    return defaultLanguage;
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Update document language attribute
    document.documentElement.lang = newLanguage;
  };

  useEffect(() => {
    // Set initial document language
    document.documentElement.lang = language;
  }, [language]);

  // Translation function with nested key support
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        let fallbackValue: any = translations.en;
        for (const fallbackKey of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
            fallbackValue = fallbackValue[fallbackKey];
          } else {
            console.warn(`Translation key "${key}" not found in ${language} or English fallback`);
            return key; // Return the key itself as last resort
          }
        }
        return fallbackValue;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const value: I18nContextType = {
    language,
    setLanguage,
    t,
    availableLanguages: AVAILABLE_LANGUAGES,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};
