import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white min-h-[70vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AlertTriangle className="h-24 w-24 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          {t('pagina-no-encontrada')}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          {t('ruta-no-existe')}
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          {t('volver-inicio')}
        </button>
      </div>
    </section>
  );
}