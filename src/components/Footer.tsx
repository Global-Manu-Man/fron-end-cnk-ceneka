import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation, useNavigate } from 'react-router-dom';

export function Footer() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-white">CNK</span>
              <span className="text-blue-400"> ceneka</span>
            </h3>
            <p className="text-gray-400">
              {t('expertos-inmobiliarios')}
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contacto')}</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Av. Principal #123, Ciudad</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+52 (123) 456-7890</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>contacto@cnkceneka.com</span>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t('enlaces-rapidos')}</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('inicio')} 
                  className="hover:text-blue-400 cursor-pointer"
                >
                  {t('inicio')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('quienes-somos')} 
                  className="hover:text-blue-400 cursor-pointer"
                >
                  {t('quienes-somos')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('servicios')} 
                  className="hover:text-blue-400 cursor-pointer"
                >
                  {t('servicios')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('contacto')} 
                  className="hover:text-blue-400 cursor-pointer"
                >
                  {t('contacto')}
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{t('siguenos')}</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CNK ceneka. {t('derechos-reservados')}.</p>
        </div>
      </div>
    </footer>
  );
}