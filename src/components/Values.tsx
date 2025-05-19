import React from 'react';
import { Heart, Shield, Lightbulb, HandshakeIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Values() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white" id="valores">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heart className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">{t('nuestros-valores')}</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('valores-descripcion')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 rounded-xl p-8 transform hover:scale-105 transition-transform duration-300">
            <HandshakeIcon className="h-12 w-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">{t('compromiso')}</h3>
            <p className="text-gray-700">{t('compromiso-desc')}</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 transform hover:scale-105 transition-transform duration-300">
            <Shield className="h-12 w-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">{t('honestidad')}</h3>
            <p className="text-gray-700">{t('honestidad-desc')}</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 transform hover:scale-105 transition-transform duration-300">
            <Lightbulb className="h-12 w-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-bold mb-4">{t('innovacion')}</h3>
            <p className="text-gray-700">{t('innovacion-desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}