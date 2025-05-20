import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
];

export function PropertyGallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const fetchImagesWithRetry = useCallback(async (retryCount = 0, maxRetries = 3) => {
    try {
      setLoading(true);
      console.log(`Intento ${retryCount + 1} de ${maxRetries + 1}: Obteniendo imágenes desde el backend...`);
      const apiUrl = 'https://cnk-ceneka.onrender.com/api/properties/cloudinary/images';
      const response = await axios.get(apiUrl);
      console.log('Respuesta de la API:', response.data);

      if (response.data?.success && Array.isArray(response.data.data)) {
        const images = response.data.data.map((resource: { secure_url: string }) =>
          resource.secure_url.trim()
        );
        console.log(`Se encontraron ${images.length} imágenes`);
        setGalleryImages(images.length > 0 ? images : FALLBACK_IMAGES);
      } else {
        throw new Error('No se encontraron imágenes en la respuesta');
      }
    } catch (err: unknown) {
      console.error('Error al cargar imágenes:', err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 429) {
          const retryAt = err.response.data?.retryAt || 'más tarde';
          setError(`Límite alcanzado. Intenta ${retryAt}.`);
          setGalleryImages(FALLBACK_IMAGES);
        } else if (retryCount < maxRetries) {
          const delay = Math.pow(2, retryCount) * 1000;
          console.log(`Reintentando en ${delay / 1000} segundos...`);
          setTimeout(() => {
            fetchImagesWithRetry(retryCount + 1, maxRetries);
          }, delay);
          return;
        } else {
          setError('No se pudieron cargar las imágenes. Usando respaldo.');
          setGalleryImages(FALLBACK_IMAGES);
        }
      }
    } finally {
      setLoading(false); // ✅ Siempre apagamos loading
    }
  }, []);

  useEffect(() => {
    fetchImagesWithRetry();
  }, [fetchImagesWithRetry]);

  useEffect(() => {
    if (galleryImages.length <= 1) return;
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

          {galleryImages.length > 1 && (
            <>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}
