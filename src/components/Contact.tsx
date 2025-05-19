import React, { useState, useRef } from 'react';
import { Mail, User, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Contact() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://formspree.io/f/mwkawqzq', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        formRef.current?.reset();
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el formulario. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Mail className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">{t('contactanos')}</h2>
            <p className="text-lg text-gray-600">
              {t('estamos-ayudarte')}
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-green-600 mb-4">{t('gracias-contacto')}</h3>
              <p className="text-gray-600 mb-6">
                {t('recibido-mensaje')}
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                {t('enviar-otro')}
              </button>
            </div>
          ) : (
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="nombre">
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t('nombre')}
                    </span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder={t('nombre')}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                    <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {t('email')}
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email@example.com"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="block text-sm font-medium text-gray-700" htmlFor="mensaje">
                  <span className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {t('mensaje')}
                  </span>
                </label>
                <textarea
                  name="mensaje"
                  id="mensaje"
                  rows={4}
                  placeholder={t('escribir-mensaje')}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <p className="text-sm text-gray-500 mb-6">
                {t('politicas')}
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transform hover:scale-[1.02] transition-all duration-300 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? t('enviando') : t('quiero-contacto')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}