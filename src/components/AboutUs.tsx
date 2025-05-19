import React from 'react';
import { Clock, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function AboutUs() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white" id="quienes-somos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">{t('quienes-somos-titulo')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('quienes-somos-descripcion')}
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <Clock className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2">{t('anos-experiencia')}</h3>
                <p className="text-gray-600">{t('experiencia-mercado')}</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <Award className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-lg mb-2">{t('equipo-profesional')}</h3>
                <p className="text-gray-600">{t('equipo-calificado')}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Equipo profesional" 
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Oficina moderna" 
                className="rounded-lg shadow-lg h-64 w-full object-cover"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Reunión de negocios" 
                className="rounded-lg shadow-lg h-64 w-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Propiedad exclusiva" 
                className="rounded-lg shadow-lg h-48 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}