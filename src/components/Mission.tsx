import React from 'react';
import { Target, Trophy, TrendingUp, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Mission() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gray-50" id="mision">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Target className="h-16 w-16 text-blue-600 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl font-bold mb-8">{t('nuestra-mision')}</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12 transform hover:scale-105 transition-all duration-300">
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('mision-descripcion')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
                <Trophy className="h-12 w-12 text-blue-600 relative mx-auto" />
              </div>
              <h3 className="font-semibold text-xl mb-3">{t('liderazgo')}</h3>
              <p className="text-gray-600">{t('liderazgo-desc')}</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
                <TrendingUp className="h-12 w-12 text-blue-600 relative mx-auto" />
              </div>
              <h3 className="font-semibold text-xl mb-3">{t('crecimiento')}</h3>
              <p className="text-gray-600">{t('crecimiento-desc')}</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
                <Award className="h-12 w-12 text-blue-600 relative mx-auto" />
              </div>
              <h3 className="font-semibold text-xl mb-3">{t('excelencia')}</h3>
              <p className="text-gray-600">{t('excelencia-desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}