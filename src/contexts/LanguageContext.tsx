import React, { createContext, useContext, useState } from 'react';

type Language = 'es' | 'en';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  es: {
    // Navbar
    'inicio': 'Inicio',
    'quienes-somos': 'Quiénes Somos',
    'mision': 'Misión',
    'valores': 'Valores',
    'servicios': 'Servicios',
    'propiedades': 'Propiedades',
    'galeria': 'Galería',
    'contacto': 'Contacto',
    
    // Hero
    'encuentra-hogar': 'Encuentra tu hogar ideal',
    'expertos-inmobiliarios': 'Expertos inmobiliarios a tu servicio',
    'ver-propiedades': 'Ver Propiedades',
    
    // About Us
    'quienes-somos-titulo': 'Quiénes Somos',
    'quienes-somos-descripcion': 'Somos una empresa integrada por profesionales con una destacada trayectoria de más de 30 años en los ramos Inmobiliario, de Banca Privada, Asesoría Legal Corporativa y de Litigio, Intermediación y Asesoría en la Administración de Activos de bajo rendimiento.',
    'anos-experiencia': '30+ Años',
    'experiencia-mercado': 'De experiencia en el mercado',
    'equipo-profesional': 'Profesionales',
    'equipo-calificado': 'Equipo altamente calificado',
    
    // Mission
    'nuestra-mision': 'Nuestra Misión',
    'mision-descripcion': 'Consolidarnos como Empresa líder en el ramo, destacando nuestra calidad y garantía en el servicio, proporcionando permanentemente el crecimiento de nuestra organización, de nuestros clientes, de nuestros asociados y de nuestros proveedores.',
    'liderazgo': 'Liderazgo',
    'liderazgo-desc': 'Empresa líder en el sector inmobiliario, marcando la pauta en innovación y servicio',
    'crecimiento': 'Crecimiento',
    'crecimiento-desc': 'Desarrollo continuo de nuestra organización y expansión constante en el mercado',
    'excelencia': 'Excelencia',
    'excelencia-desc': 'Compromiso inquebrantable con la calidad y satisfacción del cliente',
    
    // Values
    'nuestros-valores': 'Nuestros Valores',
    'valores-descripcion': 'Los hechos hablan por nosotros y nuestros valores son parte de la práctica constante que se reflejan en los resultados.',
    'compromiso': 'Compromiso',
    'compromiso-desc': 'Proporcionar un trato personal en todo momento a nuestros clientes, garantizándoles la trasparencia y seguridad.',
    'honestidad': 'Honestidad',
    'honestidad-desc': 'Actuamos de manera íntegra y respetuosa en cada proyecto, siempre basados en la verdad y la justicia.',
    'innovacion': 'Innovación',
    'innovacion-desc': 'Estamos constantemente creando nuevos métodos y procedimientos para lograr la satisfacción total.',
    
    // Services
    'nuestros-servicios': 'Nuestros Servicios',
    'servicios-descripcion': 'Ofrecemos servicios profesionales y personalizados para satisfacer todas sus necesidades inmobiliarias',
    'asesoria-inmobiliaria': 'Asesoría Inmobiliaria',
    'asesoria-desc': 'Asesoría profesional en la compra-venta de inmuebles',
    'proyectos-inversion': 'Proyectos de Inversión',
    'proyectos-desc': 'Asesoramos y elaboramos proyectos de inversión inmobiliarios',
    
    // Properties
    'propiedades-destacadas': 'Propiedades Destacadas',
    'recamaras': 'Recámaras',
    'banos': 'Baños',
    'metros': 'm²',
    'ver-detalles': 'Ver Detalles',
    'volver-propiedades': 'Volver a propiedades',
    'caracteristicas': 'Características',
    'descripcion': 'Descripción',
    'ubicacion': 'Ubicación',
    
    // Contact Form
    'contactanos': 'Contáctanos',
    'estamos-ayudarte': 'Estamos aquí para ayudarte. Déjanos tus datos y nos pondremos en contacto contigo.',
    'nombre': 'Nombre',
    'email': 'Correo electrónico',
    'mensaje': 'Mensaje',
    'escribir-mensaje': 'Escribe aquí tu mensaje',
    'politicas': 'Al enviar estos datos aceptas las políticas de privacidad y las condiciones de uso.',
    'quiero-contacto': '¡Quiero que me contacten!',
    'enviando': 'Enviando...',
    'gracias-contacto': '¡Gracias por contactarnos!',
    'recibido-mensaje': 'Hemos recibido tu mensaje. Nos pondremos en contacto contigo pronto.',
    'enviar-otro': 'Enviar otro mensaje',
    
    // Footer
    'derechos-reservados': 'Todos los derechos reservados',
    'enlaces-rapidos': 'Enlaces Rápidos',
    'siguenos': 'Síguenos',
    
    // WhatsApp
    'contactar': 'Contactar',
    'mensaje-whatsapp': 'Hola, me interesa obtener más información sobre sus servicios inmobiliarios.',

    // Testimonials
    'testimonios-titulo': 'Lo que dicen nuestros clientes',
    'testimonios-descripcion': 'La satisfacción de nuestros clientes es nuestro mayor logro. Conoce sus experiencias trabajando con nosotros.',

    // Properties List
    'propiedades-disponibles': 'Propiedades disponibles',
    'anterior': 'Anterior',
    'siguiente': 'Siguiente',
    'pagina': 'Página',
    'de': 'de',

    // Property Detail
    'cargando': 'Cargando',
    'volver': 'Volver',
    'informacion-general': 'Información General',
    'tipo-propiedad': 'Tipo de Propiedad',
    'tipo-venta': 'Tipo de Venta',
    'estatus-legal': 'Estatus Legal',
    'valor-comercial': 'Valor Comercial',
    'ubicacion-detalle': 'Ubicación',
    'estado': 'Estado',
    'municipio': 'Municipio',
    'colonia': 'Colonia',
    'calle': 'Calle',
    'caracteristicas-adicionales': 'Características Adicionales',
    'jardin': 'Jardín',
    'estudio': 'Estudio',
    'cuarto-servicio': 'Cuarto de Servicio',
    'condominio': 'Condominio',
    'metros-construccion': 'm² construcción',
    'metros-terreno': 'm² terreno',

    // Why Choose Us
    'por-que-elegirnos': '¿Por qué elegirnos?',
    'experiencia': 'Amplia Experiencia',
    'experiencia-desc': 'Más de 15 años en el mercado inmobiliario',
    'confianza': 'Confianza',
    'confianza-desc': 'Garantizamos transparencia en cada operación',
    'calidad': 'Calidad',
    'calidad-desc': 'Servicio personalizado y profesional',
    'resultados': 'Resultados',
    'resultados-desc': 'Miles de clientes satisfechos',
    
    // NotFoundPage
    'pagina-no-encontrada': '404 - Página no encontrada',
    'ruta-no-existe': 'La ruta que buscas no existe o fue movida.',
    'volver-inicio': 'Volver al Inicio'
  },
  en: {
    // Navbar
    'inicio': 'Home',
    'quienes-somos': 'About Us',
    'mision': 'Mission',
    'valores': 'Values',
    'servicios': 'Services',
    'propiedades': 'Properties',
    'galeria': 'Gallery',
    'contacto': 'Contact',
    
    // Hero
    'encuentra-hogar': 'Find your ideal home',
    'expertos-inmobiliarios': 'Real estate experts at your service',
    'ver-propiedades': 'View Properties',
    
    // About Us
    'quienes-somos-titulo': 'About Us',
    'quienes-somos-descripcion': 'We are a company made up of professionals with an outstanding track record of more than 30 years in Real Estate, Private Banking, Corporate Legal Advisory and Litigation, Intermediation and Advisory in Low Performance Asset Management.',
    'anos-experiencia': '30+ Years',
    'experiencia-mercado': 'Of market experience',
    'equipo-profesional': 'Professionals',
    'equipo-calificado': 'Highly qualified team',
    
    // Mission
    'nuestra-mision': 'Our Mission',
    'mision-descripcion': 'To consolidate ourselves as a leading company in the field, highlighting our quality and service guarantee, permanently providing growth for our organization, our clients, our associates and our suppliers.',
    'liderazgo': 'Leadership',
    'liderazgo-desc': 'Leading company in the real estate sector, setting the standard in innovation and service',
    'crecimiento': 'Growth',
    'crecimiento-desc': 'Continuous development of our organization and constant market expansion',
    'excelencia': 'Excellence',
    'excelencia-desc': 'Unwavering commitment to quality and customer satisfaction',
    
    // Values
    'nuestros-valores': 'Our Values',
    'valores-descripcion': 'Actions speak for us and our values are part of the constant practice that is reflected in the results.',
    'compromiso': 'Commitment',
    'compromiso-desc': 'Provide personal treatment to our clients at all times, guaranteeing transparency and security.',
    'honestidad': 'Honesty',
    'honestidad-desc': 'We act with integrity and respect in each project, always based on truth and justice.',
    'innovacion': 'Innovation',
    'innovacion-desc': 'We are constantly creating new methods and procedures to achieve total satisfaction.',
    
    // Services
    'nuestros-servicios': 'Our Services',
    'servicios-descripcion': 'We offer professional and personalized services to meet all your real estate needs',
    'asesoria-inmobiliaria': 'Real Estate Advisory',
    'asesoria-desc': 'Professional advice on buying and selling properties',
    'proyectos-inversion': 'Investment Projects',
    'proyectos-desc': 'We advise and develop real estate investment projects',
    
    // Properties
    'propiedades-destacadas': 'Featured Properties',
    'recamaras': 'Bedrooms',
    'banos': 'Bathrooms',
    'metros': 'sqft',
    'ver-detalles': 'View Details',
    'volver-propiedades': 'Back to properties',
    'caracteristicas': 'Features',
    'descripcion': 'Description',
    'ubicacion': 'Location',
    
    // Contact Form
    'contactanos': 'Contact Us',
    'estamos-ayudarte': 'We are here to help. Leave us your information and we will contact you.',
    'nombre': 'Name',
    'email': 'Email',
    'mensaje': 'Message',
    'escribir-mensaje': 'Write your message here',
    'politicas': 'By submitting this data you accept the privacy policies and terms of use.',
    'quiero-contacto': 'I want to be contacted!',
    'enviando': 'Sending...',
    'gracias-contacto': 'Thank you for contacting us!',
    'recibido-mensaje': 'We have received your message. We will contact you soon.',
    'enviar-otro': 'Send another message',
    
    // Footer
    'derechos-reservados': 'All rights reserved',
    'enlaces-rapidos': 'Quick Links',
    'siguenos': 'Follow Us',
    
    // WhatsApp
    'contactar': 'Contact',
    'mensaje-whatsapp': 'Hello, I would like to get more information about your real estate services.',

    // Testimonials
    'testimonios-titulo': 'What Our Clients Say',
    'testimonios-descripcion': 'Our clients\' satisfaction is our greatest achievement. Learn about their experiences working with us.',

    // Properties List
    'propiedades-disponibles': 'Available Properties',
    'anterior': 'Previous',
    'siguiente': 'Next',
    'pagina': 'Page',
    'de': 'of',

    // Property Detail
    'cargando': 'Loading',
    'volver': 'Back',
    'informacion-general': 'General Information',
    'tipo-propiedad': 'Property Type',
    'tipo-venta': 'Sale Type',
    'estatus-legal': 'Legal Status',
    'valor-comercial': 'Commercial Value',
    'ubicacion-detalle': 'Location',
    'estado': 'State',
    'municipio': 'Municipality',
    'colonia': 'Neighborhood',
    'calle': 'Street',
    'caracteristicas-adicionales': 'Additional Features',
    'jardin': 'Garden',
    'estudio': 'Study',
    'cuarto-servicio': 'Service Room',
    'condominio': 'Condominium',
    'metros-construccion': 'sqft construction',
    'metros-terreno': 'sqft land',

    // Why Choose Us
    'por-que-elegirnos': 'Why Choose Us',
    'experiencia': 'Extensive Experience',
    'experiencia-desc': 'More than 15 years in the real estate market',
    'confianza': 'Trust',
    'confianza-desc': 'We guarantee transparency in every operation',
    'calidad': 'Quality',
    'calidad-desc': 'Personalized and professional service',
    'resultados': 'Results',
    'resultados-desc': 'Thousands of satisfied clients',
    
    // NotFoundPage
    'pagina-no-encontrada': '404 - Page Not Found',
    'ruta-no-existe': 'The path you are looking for does not exist or has been moved.',
    'volver-inicio': 'Back to Home'
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
