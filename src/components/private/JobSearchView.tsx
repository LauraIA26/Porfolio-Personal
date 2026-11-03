import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Briefcase,
  Bookmark,
  Sparkles,
  ChevronRight,
  RotateCcw,
  AlertCircle
} from 'lucide-react';

export const JobSearchView: React.FC = () => {
  const {
    offers,
    savedOfferIds,
    toggleSaveOffer,
    setPreparingOffer,
    navigateTo
  } = useApp();

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedDistance, setSelectedDistance] = useState<number>(20); // Default 20 km
  const [selectedModality, setSelectedModality] = useState('all');
  const [selectedSchedule, setSelectedSchedule] = useState('all');
  const [selectedContract, setSelectedContract] = useState('all');
  const [selectedPublished, setSelectedPublished] = useState('all');

  // Applied filter state (triggered on "Buscar ofertas")
  const [appliedFilters, setAppliedFilters] = useState({
    search: '',
    location: 'all',
    distance: 20,
    modality: 'all',
    schedule: 'all',
    contract: 'all',
    published: 'all'
  });

  const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchTerm,
      location: selectedLocation,
      distance: selectedDistance,
      modality: selectedModality,
      schedule: selectedSchedule,
      contract: selectedContract,
      published: selectedPublished
    });
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('all');
    setSelectedDistance(20);
    setSelectedModality('all');
    setSelectedSchedule('all');
    setSelectedContract('all');
    setSelectedPublished('all');
    setAppliedFilters({
      search: '',
      location: 'all',
      distance: 20,
      modality: 'all',
      schedule: 'all',
      contract: 'all',
      published: 'all'
    });
  };

  // Filter execution
  const filteredOffers = offers.filter((offer) => {
    // Search keyword
    if (appliedFilters.search.trim()) {
      const q = appliedFilters.search.toLowerCase();
      const matchText =
        offer.title.toLowerCase().includes(q) ||
        offer.description.toLowerCase().includes(q) ||
        offer.company.toLowerCase().includes(q);
      if (!matchText) return false;
    }

    // Distance filter (<= selected distance)
    if (appliedFilters.distance > 0 && offer.distanceKm > appliedFilters.distance) {
      return false;
    }

    // Location
    if (appliedFilters.location !== 'all') {
      if (!offer.location.toLowerCase().includes(appliedFilters.location.toLowerCase())) {
        return false;
      }
    }

    // Modality
    if (appliedFilters.modality !== 'all') {
      if (offer.modality.toLowerCase() !== appliedFilters.modality.toLowerCase()) {
        return false;
      }
    }

    // Schedule
    if (appliedFilters.schedule !== 'all') {
      if (!offer.schedule.toLowerCase().includes(appliedFilters.schedule.toLowerCase())) {
        return false;
      }
    }

    // Contract
    if (appliedFilters.contract !== 'all') {
      if (!offer.contractType.toLowerCase().includes(appliedFilters.contract.toLowerCase())) {
        return false;
      }
    }

    // Published date filter
    if (appliedFilters.published !== 'all') {
      if (appliedFilters.published === 'recent' && !offer.publishedDate.includes('días')) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Buscar empleo
          </h1>
          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded">
            OFERTAS DEMO
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Catálogo ficticio de ofertas comarcales para evaluar la afinidad del perfil de Laura. Fuente no conectada a portales reales.
        </p>
      </div>

      {/* Filter Box */}
      <div className="bg-white p-5 rounded-xl border border-[#E2DFD8] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0EEE8]">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-[#1E3A4B]" />
            <span>Filtros funcionales de demostración</span>
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#1E3A4B] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer filtros</span>
          </button>
        </div>

        {/* Search input + selects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Puesto */}
          <div className="lg:col-span-2">
            <label className="block text-slate-600 font-medium mb-1">
              Puesto o palabra clave
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ej. Almacén, pedidos, compras, recepción..."
                className="w-full pl-9 pr-3 py-2 bg-[#FAF9F5] border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyFilters();
                }}
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Distancia */}
          <div>
            <label className="block text-slate-600 font-medium mb-1">
              Distancia desde Illescas
            </label>
            <select
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 bg-[#FAF9F5] border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
            >
              <option value={5}>Hasta 5 km</option>
              <option value={10}>Hasta 10 km</option>
              <option value={20}>Hasta 20 km (Radio preferente)</option>
              <option value={50}>Hasta 50 km (Ver fuera de radio)</option>
            </select>
          </div>

          {/* Localidad */}
          <div>
            <label className="block text-slate-600 font-medium mb-1">
              Localidad
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF9F5] border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
            >
              <option value="all">Todas las localidades</option>
              <option value="Illescas">Illescas</option>
              <option value="Yuncos">Yuncos</option>
              <option value="Numancia">Numancia de la Sagra</option>
              <option value="Yeles">Yeles</option>
              <option value="Esquivias">Esquivias</option>
              <option value="Seseña">Seseña</option>
              <option value="Parla">Parla (Fuera de radio)</option>
              <option value="Toledo">Toledo (Fuera de radio)</option>
            </select>
          </div>

          {/* Modalidad */}
          <div>
            <label className="block text-slate-600 font-medium mb-1">
              Modalidad
            </label>
            <select
              value={selectedModality}
              onChange={(e) => setSelectedModality(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF9F5] border border-slate-300 rounded-lg"
            >
              <option value="all">Todas las modalidades</option>
              <option value="Presencial">Presencial</option>
              <option value="Híbrida">Híbrida</option>
              <option value="Remota">Remota</option>
            </select>
          </div>

          {/* Jornada */}
          <div>
            <label className="block text-slate-600 font-medium mb-1">
              Jornada
            </label>
            <select
              value={selectedSchedule}
              onChange={(e) => setSelectedSchedule(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF9F5] border border-slate-300 rounded-lg"
            >
              <option value="all">Todas las jornadas</option>
              <option value="continua">Jornada continua</option>
              <option value="parcial">Jornada parcial</option>
              <option value="completa">Jornada completa</option>
              <option value="partida">Jornada partida</option>
            </select>
          </div>

          {/* Tipo de contrato */}
          <div>
            <label className="block text-slate-600 font-medium mb-1">
              Tipo de contrato
            </label>
            <select
              value={selectedContract}
              onChange={(e) => setSelectedContract(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF9F5] border border-slate-300 rounded-lg"
            >
              <option value="all">Cualquier contrato</option>
              <option value="indefinido">Indefinido</option>
              <option value="temporal">Temporal / Sustitución</option>
              <option value="parcial">Media jornada</option>
            </select>
          </div>

          {/* Fecha de publicación */}
          <div>
            <label className="block text-slate-600 font-medium mb-1">
              Fecha de publicación
            </label>
            <select
              value={selectedPublished}
              onChange={(e) => setSelectedPublished(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF9F5] border border-slate-300 rounded-lg"
            >
              <option value="all">Cualquier fecha</option>
              <option value="recent">Últimos días</option>
            </select>
          </div>

          {/* Botón Buscar ofertas */}
          <div className="lg:col-span-4 flex justify-end pt-1">
            <button
              type="button"
              onClick={handleApplyFilters}
              className="py-2.5 px-6 text-xs font-semibold text-white bg-[#1E3A4B] hover:bg-[#152B38] active:scale-[0.99] rounded-lg transition-all shadow-xs flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Buscar ofertas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Mostrando <strong>{filteredOffers.length}</strong> {filteredOffers.length === 1 ? 'oferta de demostración' : 'ofertas de demostración'}
        </span>
        <span className="text-[11px] text-slate-400">
          Resultados locales calculados sobre datos de demostración
        </span>
      </div>

      {/* Empty State */}
      {filteredOffers.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-[#E2DFD8] shadow-xs animate-in fade-in duration-150">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            No hay ofertas DEMO con los filtros seleccionados
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4 leading-relaxed">
            Ninguna oferta ficticia coincide con la combinación de filtros aplicada. Puedes ajustar la distancia o restablecer los filtros para volver a ver el catálogo completo.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold text-[#1E3A4B] bg-[#FAF9F5] border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOffers.map((offer) => {
            const isSaved = savedOfferIds.includes(offer.id);
            const isOutOfPreferredRadius = offer.distanceKm > 20;

            return (
              <div
                key={offer.id}
                className="bg-white rounded-xl border border-[#E2DFD8] shadow-xs hover:border-[#1E3A4B]/40 transition-all p-5 sm:p-6"
              >
                {/* Mandatory Stamped Label */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-[#F0EEE8]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300/60">
                      OFERTA DEMO · DATOS FICTICIOS · FUENTE NO CONECTADA
                    </span>
                    {isOutOfPreferredRadius && (
                      <span className="text-[10px] font-semibold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                        Fuera de radio preferente (&gt;20 km)
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Fuente: <span className="font-medium text-slate-500">{offer.source}</span>
                  </div>
                </div>

                {/* Offer Title & Distance */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {offer.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-1">
                      <span className="font-semibold text-slate-800">{offer.company}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {offer.location} ({offer.distanceKm} km aprox.)
                      </span>
                      <span>·</span>
                      <span>{offer.publishedDate}</span>
                    </div>
                  </div>

                  {/* Affinity Badge */}
                  <div className="flex items-center gap-2 self-start bg-[#FAF9F5] p-2 sm:px-3 sm:py-2 rounded-lg border border-[#EDE9E1] shrink-0">
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-extrabold text-[#1E3A4B] tabular-nums leading-none">
                        {offer.affinity.totalScore}%
                      </div>
                      <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                        Afinidad
                      </div>
                    </div>
                    {offer.affinity.cappedDueToMandatory && (
                      <span
                        className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-medium max-w-[100px] leading-tight"
                        title="Limitada al 60% por requisito obligatorio no acreditado"
                      >
                        Cap. máx 60%
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                  {offer.description}
                </p>

                {/* Unboxed Metadata Row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 mb-5 pb-4 border-b border-[#F0EEE8]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{offer.schedule}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>Modalidad {offer.modality}</span>
                  </div>
                  <span>·</span>
                  <span>Contrato: <strong className="font-medium text-slate-800">{offer.contractType}</strong></span>
                  <span>·</span>
                  <span>Salario: <strong className="font-medium text-slate-600">{offer.salary}</strong></span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigateTo(`/app/ofertas/${offer.id}`)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-[#FAF9F5] hover:bg-[#F0EEE8] border border-slate-300 rounded-lg transition-colors"
                    >
                      Ver análisis
                    </button>
                    <button
                      onClick={() => setPreparingOffer(offer)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1E3A4B] hover:bg-[#152B38] rounded-lg transition-colors"
                    >
                      Preparar candidatura
                    </button>
                  </div>

                  <button
                    onClick={() => toggleSaveOffer(offer.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#1E3A4B] px-2 py-1 rounded"
                    aria-label={isSaved ? 'Quitar de guardadas' : 'Guardar oferta'}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isSaved ? 'fill-[#1E3A4B] text-[#1E3A4B]' : ''}`}
                    />
                    <span>{isSaved ? 'Guardada' : 'Guardar oferta'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
