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
  sale_status: string;
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
  sale_status: string;
}

interface FilterState {
  search: string;
  bedrooms: number | null;
  bathrooms: number | null;
  parking: number | null;
  minConstruction: number | null;
  maxConstruction: number | null;
  minLand: number | null;
  maxLand: number | null;
  hasGarden: boolean;
  hasStudy: boolean;
  hasServiceRoom: boolean;
  hasCondominium: boolean;
}

export function PropertiesList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    bedrooms: null,
    bathrooms: null,
    parking: null,
    minConstruction: null,
    maxConstruction: null,
    minLand: null,
    maxLand: null,
    hasGarden: false,
    hasStudy: false,
    hasServiceRoom: false,
    hasCondominium: false,
  });
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    axios.get(`${API_URL}?page=${page}&limit=9`)
      .then(res => {
        const availableProperties = res.data.data.filter((item: ApiPropertyData) => 
          item.sale_status === "disponible"
        );

        const mappedProperties = availableProperties.map((item: ApiPropertyData): Property => ({
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
          sale_status: item.sale_status
        }));
        setProperties(mappedProperties);
        setFilteredProperties(mappedProperties);
        
        const totalAvailableProperties = res.data.pagination.total;
        const propertiesPerPage = 9;
        setTotalPages(Math.ceil(totalAvailableProperties / propertiesPerPage));
      });
  }, [page]);

  const applyFilters = () => {
    const filtered = properties.filter(p => {
      const matchesSearch = !filters.search || 
        p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.id.toString().includes(filters.search);
      
      const matchesBedrooms = !filters.bedrooms || p.beds >= filters.bedrooms;
      const matchesBathrooms = !filters.bathrooms || p.baths >= filters.bathrooms;
      
      const matchesConstruction = (!filters.minConstruction || p.constructionSize >= filters.minConstruction) &&
        (!filters.maxConstruction || p.constructionSize <= filters.maxConstruction);
      
      const matchesLand = (!filters.minLand || p.landSize >= filters.minLand) &&
        (!filters.maxLand || p.landSize <= filters.maxLand);
      
      const matchesFeatures = (!filters.hasGarden || p.hasGarden) &&
        (!filters.hasStudy || p.hasStudy) &&
        (!filters.hasServiceRoom || p.hasServiceRoom) &&
        (!filters.hasCondominium || p.hasCondominium);

      return matchesSearch && matchesBedrooms && matchesBathrooms && 
        matchesConstruction && matchesLand && matchesFeatures;
    });

    setFilteredProperties(filtered);
    setIsFilterModalOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      bedrooms: null,
      bathrooms: null,
      parking: null,
      minConstruction: null,
      maxConstruction: null,
      minLand: null,
      maxLand: null,
      hasGarden: false,
      hasStudy: false,
      hasServiceRoom: false,
      hasCondominium: false,
    });
    setFilteredProperties(properties);
  };

  const FilterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">{t('filtros-avanzados')}</h3>
        
        <div className="space-y-4">
          {/* Búsqueda general */}
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('buscar')}</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder={t('buscar-por-id-o-titulo')}
            />
          </div>

          {/* Recámaras */}
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('recamaras')}</label>
            <select
              value={filters.bedrooms || ''}
              onChange={(e) => setFilters({...filters, bedrooms: e.target.value ? Number(e.target.value) : null})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">{t('cualquier')}</option>
              {[1, 2, 3, 4, '5+'].map((value) => (
                <option key={value} value={value === '5+' ? 5 : value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {/* Baños */}
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('banos')}</label>
            <select
              value={filters.bathrooms || ''}
              onChange={(e) => setFilters({...filters, bathrooms: e.target.value ? Number(e.target.value) : null})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">{t('cualquier')}</option>
              {[1, 2, 3, 4, '5+'].map((value) => (
                <option key={value} value={value === '5+' ? 5 : value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {/* Construcción */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('construccion-min')}</label>
              <input
                type="number"
                value={filters.minConstruction || ''}
                onChange={(e) => setFilters({...filters, minConstruction: e.target.value ? Number(e.target.value) : null})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="m²"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('construccion-max')}</label>
              <input
                type="number"
                value={filters.maxConstruction || ''}
                onChange={(e) => setFilters({...filters, maxConstruction: e.target.value ? Number(e.target.value) : null})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="m²"
              />
            </div>
          </div>

          {/* Terreno */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('terreno-min')}</label>
              <input
                type="number"
                value={filters.minLand || ''}
                onChange={(e) => setFilters({...filters, minLand: e.target.value ? Number(e.target.value) : null})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="m²"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('terreno-max')}</label>
              <input
                type="number"
                value={filters.maxLand || ''}
                onChange={(e) => setFilters({...filters, maxLand: e.target.value ? Number(e.target.value) : null})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="m²"
              />
            </div>
          </div>

          {/* Características */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{t('caracteristicas')}</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.hasGarden}
                  onChange={(e) => setFilters({...filters, hasGarden: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">{t('jardin')}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.hasStudy}
                  onChange={(e) => setFilters({...filters, hasStudy: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">{t('estudio')}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.hasServiceRoom}
                  onChange={(e) => setFilters({...filters, hasServiceRoom: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">{t('cuarto-servicio')}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.hasCondominium}
                  onChange={(e) => setFilters({...filters, hasCondominium: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">{t('condominio')}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={clearFilters}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            {t('limpiar')}
          </button>
          <button
            onClick={applyFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {t('aplicar-filtros')}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center md:flex-col md:items-start">
        <h2 className="text-2xl font-bold md:mb-4">{t('propiedades-disponibles')}</h2>
        <div className="w-full flex justify-end md:w-auto md:justify-center">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            {t('filtros')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {filteredProperties.map(property => (
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

      {isFilterModalOpen && <FilterModal />}
    </div>
  );
}