import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
      className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
      aria-label="Switch Language"
    >
      <Globe className="h-5 w-5" />
      <span>{language.toUpperCase()}</span>
    </button>
  );
}