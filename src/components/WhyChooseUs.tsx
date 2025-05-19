import React from 'react';
import { Building, Shield, Star, Key } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function WhyChooseUs() {
  const { t } = useLanguage();

  const features = [
    { icon: Building, title: t('experiencia'), desc: t('experiencia-desc') },
    { icon: Shield, title: t('confianza'), desc: t('confianza-desc') },
    { icon: Star, title: t('calidad'), desc: t('calidad-desc') },
    { icon: Key, title: t('resultados'), desc: t('resultados-desc') }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">{t('por-que-elegirnos')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <item.icon className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}