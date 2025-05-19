import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';

export function PropertyGallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  // Imágenes de respaldo en caso de error
  const fallbackImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        
        // Usar las variables de entorno para Cloudinary con el prefijo VITE_
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dolznek84';
        const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY || '785352511659736';
        const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET || 'FfCU7CHmTlCF9t126NKcT-Yedxw';
        
        // Agregar logs para verificar las variables
        console.log('Variables de Cloudinary:');
        console.log('Cloud Name:', cloudName);
        console.log('API Key:', apiKey);
        console.log('API Secret:', apiSecret);
        console.log('¿Variables obtenidas de .env?', {
          cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ? 'Sí' : 'No (usando valor por defecto)',
          apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY ? 'Sí' : 'No (usando valor por defecto)',
          apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET ? 'Sí' : 'No (usando valor por defecto)'
        });
        
        // Determinar si estamos en desarrollo o producción
        const isDevelopment = import.meta.env.DEV;
        let apiUrl;
        
        if (isDevelopment) {
          // En desarrollo, usar el proxy configurado en vite.config.ts
          apiUrl = `/cloudinary-api/${cloudName}/resources/image?max_results=100`;
        } else {
          // En producción, usar la URL completa de la API de Cloudinary
          apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?max_results=100`;
        }
        
        console.log('URL de la API:', apiUrl);
        
        // Configurar la autenticación para la API de Cloudinary
        const response = await axios.get(
          apiUrl,
          {
            headers: {
              // Agregar autenticación básica para la API de Cloudinary
              'Authorization': `Basic ${btoa(`${apiKey}:${apiSecret}`)}`
            }
          }
        );
        
        if (response.data && response.data.resources) {
          // Extraer URLs de las imágenes
          const images = response.data.resources.map((resource: { secure_url: string }) => resource.secure_url);
          setGalleryImages(images.length > 0 ? images : fallbackImages);
        } else {
          throw new Error('No se encontraron imágenes en la respuesta');
        }
      } catch (err) {
        console.error('Error al cargar imágenes de Cloudinary:', err);
        setError('No se pudieron cargar las imágenes. Usando imágenes de respaldo.');
        setGalleryImages(fallbackImages);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (galleryImages.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [galleryImages]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + galleryImages.length) % galleryImages.length);
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t('galeria')}</h2>
          <div className="flex justify-center items-center h-[500px]">
            <p className="text-xl text-gray-600">Cargando imágenes...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">{t('galeria')}</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}
        <div className="relative">
          <div className="overflow-hidden rounded-lg shadow-xl">
            <div 
              className="relative h-[500px] transition-transform duration-500 ease-in-out"
              style={{
                backgroundImage: `url(${galleryImages[currentSlide]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
          </div>
          
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}