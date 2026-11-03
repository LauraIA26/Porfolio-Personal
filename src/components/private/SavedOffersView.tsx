import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bookmark, MapPin, Clock, Briefcase, Trash2, ArrowRight } from 'lucide-react';

export const SavedOffersView: React.FC = () => {
  const {
    offers,
    savedOfferIds,
    toggleSaveOffer,
    setAnalyzingOffer,
    setPreparingOffer,
    navigateTo
  } = useApp();

  const savedOffers = offers.filter((o) => savedOfferIds.includes(o.id));

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Ofertas guardadas ({savedOffers.length})
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Candidaturas de demostración guardadas para seguimiento o preparación de documentación.
        </p>
      </div>

      {savedOffers.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-[#E2DFD8] shadow-xs">
          <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">
            No tienes ofertas guardadas en la demostración
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Puedes explorar el listado de ofertas DEMO y pulsar en «Guardar» en aquellas que te interesen.
          </p>
          <button
            onClick={() => navigateTo('/app/ofertas')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3A4B] rounded-lg hover:bg-[#152B38]"
          >
            Buscar ofertas DEMO
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {savedOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl border border-[#E2DFD8] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                    DEMO
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    {offer.company}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {offer.location} ({offer.distanceKm} km)
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {offer.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>{offer.schedule}</span>
                  <span>·</span>
                  <span>Modalidad {offer.modality}</span>
                  <span>·</span>
                  <span>Afinidad: <strong className="text-[#1E3A4B]">{offer.affinity.totalScore}%</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigateTo(`/app/ofertas/${offer.id}`)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-[#FAF9F5] hover:bg-[#F0EEE8] border border-slate-300 rounded-lg"
                >
                  Ver análisis
                </button>
                <button
                  onClick={() => setPreparingOffer(offer)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1E3A4B] hover:bg-[#152B38] rounded-lg"
                >
                  Candidatura
                </button>
                <button
                  onClick={() => toggleSaveOffer(offer.id)}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg"
                  title="Eliminar de guardadas"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
