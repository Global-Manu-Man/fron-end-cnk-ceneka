import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const API_URL = 'https://cnk-ceneka.onrender.com/api/properties';

export interface Property {
  id: number;
  title: string;
  price: string;
  image: string;
  images: string[];
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  features: string[];
  location: string;
  propertyType: number | string;
  saleType: number | string;
  legalStatus: number | string;
  commercialValue: string;
  state: string;
  municipality: string;
  colony: string;
  street: string;
  landSize: number;
  constructionSize: number;
  hasGarden: boolean;
  hasStudy: boolean;
  hasServiceRoom: boolean;
  hasCondominium: boolean;
}

export interface ApiPropertyData {
  id: number;
  title: string;
  sale_value: string;
  images?: { url: string }[];
  bedrooms: number;
  bathrooms: number;
  construction_size: number;
  description: string;
  features?: string[];
  street: string;
  postal_code: string;
  property_type_id: number;
  sale_type_id: number;
  legal_status_id: number;
  commercial_value: string;
  state: string;
  municipality: string;
  colony: string;
  land_size: number;
  has_garden?: boolean;
  has_study?: boolean;
  has_service_room?: boolean;
  is_condominium?: boolean;
}

export function PropertiesList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    axios.get(`${API_URL}?page=${page}&limit=9`)
      .then(res => {
        const mappedProperties = res.data.data.map((item: ApiPropertyData): Property => ({
          id: item.id,
          title: item.title,
          price: `$${parseInt(item.sale_value).toLocaleString()}`,
          image: item.images?.[0]?.url || '',
          images: item.images?.map((img) => img.url) || [],
          beds: item.bedrooms,
          baths: item.bathrooms,
          sqft: item.construction_size,
          description: item.description,
          features: item.features || [],
          location: `${item.colony}, ${item.municipality}, ${item.state}`,
          propertyType: item.property_type_id,
          saleType: item.sale_type_id,
          legalStatus: item.legal_status_id,
          commercialValue: `$${parseInt(item.commercial_value).toLocaleString()}`,
          state: item.state,
          municipality: item.municipality,
          colony: item.colony,
          street: item.street,
          landSize: item.land_size,
          constructionSize: item.construction_size,
          hasGarden: !!item.has_garden,
          hasStudy: !!item.has_study,
          hasServiceRoom: !!item.has_service_room,
          hasCondominium: !!item.is_condominium,
        }));
        setProperties(mappedProperties);
        setTotalPages(res.data.pagination.pages);
      });
  }, [page]);

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{t('propiedades-disponibles')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {properties.map(property => (
          <div
            key={property.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
            onClick={() => navigate(`/property/${property.id}`)}
          >
            <img src={property.image} alt={property.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{property.title}</h3>
              <p className="text-blue-600 font-semibold">{property.price}</p>
              <p className="text-sm text-gray-600">{property.location}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          {t('anterior')}
        </button>
        <span className="px-4 py-2 text-gray-700">{t('pagina')} {page} {t('de')} {totalPages}</span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          {t('siguiente')}
        </button>
      </div>
    </div>
  );
}