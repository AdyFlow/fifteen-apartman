import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Language = 'hu' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (hu: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'hu',
  toggleLanguage: () => {},
  t: (hu) => hu,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('hu');

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'hu' ? 'en' : 'hu'));
  }, []);

  const t = useCallback(
    (hu: string, en: string) => (language === 'hu' ? hu : en),
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
