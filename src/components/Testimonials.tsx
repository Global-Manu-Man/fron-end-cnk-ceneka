import React from 'react';
import { Quote, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Testimonials() {
  const { t, language } = useLanguage();

  const testimonials = {
    es: [
      {
        name: "Carlos Ramírez",
        role: "Comprador de Casa",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        text: "El equipo de CNK ceneka hizo que el proceso de compra de mi casa fuera increíblemente sencillo. Su profesionalismo y atención al detalle son excepcionales.",
        rating: 5
      },
      {
        name: "Ana Martínez",
        role: "Inversionista",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        text: "He trabajado con varios agentes inmobiliarios, pero ninguno se compara con el servicio personalizado que recibí de CNK ceneka. Realmente entienden las necesidades de sus clientes.",
        rating: 5
      },
      {
        name: "Roberto Sánchez",
        role: "Vendedor de Propiedad",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        text: "Vendieron mi propiedad en tiempo récord y al mejor precio. Su conocimiento del mercado y estrategias de marketing son impresionantes.",
        rating: 5
      }
    ],
    en: [
      {
        name: "Charles Raymond",
        role: "Home Buyer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        text: "The CNK ceneka team made the process of buying my house incredibly easy. Their professionalism and attention to detail are exceptional.",
        rating: 5
      },
      {
        name: "Anna Martinez",
        role: "Investor",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        text: "I've worked with several real estate agents, but none compare to the personalized service I received from CNK ceneka. They truly understand their clients' needs.",
        rating: 5
      },
      {
        name: "Robert Sanders",
        role: "Property Seller",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
        text: "They sold my property in record time and at the best price. Their market knowledge and marketing strategies are impressive.",
        rating: 5
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-50" id="testimonios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Quote className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">{t('testimonios-titulo')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('testimonios-descripcion')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials[language].map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}