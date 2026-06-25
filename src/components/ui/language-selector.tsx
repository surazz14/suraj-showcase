import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from './button';
import { useI18n, Language } from '@/contexts/I18nContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, availableLanguages } = useI18n();

  const currentLanguage = availableLanguages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={language === lang.code ? 'bg-accent' : ''}
          >
            <span className="mr-2">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Simple language selector with current flag display
export const SimpleLanguageSelector: React.FC = () => {
  const { language, setLanguage, availableLanguages } = useI18n();

  const currentLanguage = availableLanguages.find(lang => lang.code === language);
  const nextLanguageIndex = (availableLanguages.findIndex(lang => lang.code === language) + 1) % availableLanguages.length;
  const nextLanguage = availableLanguages[nextLanguageIndex];

  const handleToggle = () => {
    setLanguage(nextLanguage.code);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className="relative"
      title={`Switch to ${nextLanguage.name}`}
    >
      <span className="text-lg">{currentLanguage?.flag}</span>
      <span className="sr-only">Switch language</span>
    </Button>
  );
};
