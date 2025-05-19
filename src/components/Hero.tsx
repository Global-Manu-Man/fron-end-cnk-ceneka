import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  const scrollToProperties = () => {
    const element = document.getElementById('propiedades');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative h-[600px] bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t('encuentra-hogar')}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {t('expertos-inmobiliarios')}
          </p>
          <button 
            onClick={scrollToProperties}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            {t('ver-propiedades')}
          </button>
        </div>
      </div>
    </div>
  );
}