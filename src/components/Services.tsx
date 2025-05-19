import React from 'react';
import { Building2, FileCheck, LineChart, Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Services() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gray-50" id="servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Briefcase className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">{t('nuestros-servicios')}</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('servicios-descripcion')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
              <Building2 className="h-12 w-12 text-blue-600 relative" />
            </div>
            <h3 className="text-xl font-bold mb-4">{t('asesoria-inmobiliaria')}</h3>
            <p className="text-gray-700 mb-4">{t('asesoria-desc')}</p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <FileCheck className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <span>{t('asesoria-desc')}</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
              <LineChart className="h-12 w-12 text-blue-600 relative" />
            </div>
            <h3 className="text-xl font-bold mb-4">{t('proyectos-inversion')}</h3>
            <p className="text-gray-700 mb-4">{t('proyectos-desc')}</p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <FileCheck className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                <span>{t('proyectos-desc')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}