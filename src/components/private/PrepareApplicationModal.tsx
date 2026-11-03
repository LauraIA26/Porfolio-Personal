import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CoverLetterTone, ApplicationDraft } from '../../types';
import {
  X,
  FileText,
  Mail,
  AlertTriangle,
  Save,
  RotateCcw,
  Download,
  Eye,
  CheckCircle2,
  Edit2
} from 'lucide-react';

export const PrepareApplicationModal: React.FC = () => {
  const {
    preparingOffer,
    setPreparingOffer,
    profile,
    drafts,
    saveDraft,
    showToast
  } = useApp();

  if (!preparingOffer) return null;

  const existingDraft = drafts[preparingOffer.id];

  const [activeTab, setActiveTab] = useState<'cv' | 'letter'>('letter');
  const [selectedTone, setSelectedTone] = useState<CoverLetterTone>(
    existingDraft ? existingDraft.tone : 'cercano'
  );
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Editable fields
  const [companyName, setCompanyName] = useState(
    existingDraft ? existingDraft.companyName : preparingOffer.company.replace(' (Empresa ficticia)', '')
  );
  const [jobTitle, setJobTitle] = useState(
    existingDraft ? existingDraft.offerTitle : preparingOffer.title
  );
  const [recipient, setRecipient] = useState(
    existingDraft ? existingDraft.recipient : 'Responsable de Selección / Departamento de Recursos Humanos'
  );
  const [currentDate, setCurrentDate] = useState(
    existingDraft ? existingDraft.date : '3 de noviembre de 2026'
  );

  // Dynamic template generator by tone
  const generateToneContent = (tone: CoverLetterTone) => {
    if (tone === 'formal') {
      return `A la atención de ${recipient || '[Persona destinataria]'}
${companyName || '[Empresa]'}
Fecha: ${currentDate || '[Fecha]'}

Muy señores míos:

Por medio de la presente, deseo presentar formalmente mi candidatura al puesto de ${jobTitle || '[Puesto]'} convocado por su entidad.

Acreditada con el título oficial de Técnico en Gestión Administrativa y Educación Secundaria Obligatoria, he desempeñado en Encuadernación Novo responsabilidades directas en la gestión y seguimiento riguroso de órdenes de trabajo, control periódico de existencias y stock, así como la atención institucional a clientes y proveedores.

Cuento con residencia en Illescas, permiso de conducir clase B y vehículo particular, lo que garantiza mi plena disponibilidad y puntualidad para integrarme en su centro de trabajo. Mi trayectoria se fundamenta en la minuciosidad operativa, la discreción y el cumplimiento ordenado de los procedimientos asignados.

Agradeciendo de antemano su atención a este escrito, quedo a su disposición para cualquier aclaración o entrevista.

Le saluda atentamente,
${profile.fullName}
Illescas (Toledo)`;
    }

    if (tone === 'directo') {
      return `Estimada/o ${recipient || '[Persona destinataria]'},

Le escribo para solicitar el puesto de ${jobTitle || '[Puesto]'} en ${companyName || '[Empresa]'}.

Resumen de mis competencias contrastadas:
· Titulación oficial: Técnico en Gestión Administrativa.
· Experiencia en Encuadernación Novo: seguimiento de órdenes de trabajo, trato con clientes y proveedores, y control de stock en almacén.
· Movilidad: Residencia en Illescas, carnet B y coche propio.
· Informática: Nivel usuario.

Ofrezco incorporación responsable y método riguroso en la gestión diaria. Quedo disponible para concertar una entrevista cuando estimen oportuno.

Un cordial saludo,
${profile.fullName}
${profile.publicLocation}`;
    }

    // Default 'cercano'
    return `Estimada/o ${recipient || '[Persona destinataria]'},

Me pongo en contacto con ustedes para presentar mi candidatura a la posición de ${jobTitle || '[Puesto]'} en ${companyName || '[Empresa]'}.

Cuento con la titulación de Técnico en Gestión Administrativa y experiencia práctica en Encuadernación Novo, donde me he responsabilizado de la gestión y seguimiento diario de órdenes de trabajo, la atención y resolución de consultas con clientes y proveedores, y el control de stock y organización del almacén.

Resido en Illescas y dispongo de permiso de conducir B y coche propio, lo que me aporta total flexibilidad y puntualidad en los desplazamientos dentro de la comarca. Me considero una persona ordenada, responsable y con vocación por el trabajo bien hecho.

Agradezco de antemano su tiempo e interés en mi perfil y quedo a su disposición para mantener una conversación personal.

Atentamente,
${profile.fullName}
Illescas (Toledo)`;
  };

  const [letterBody, setLetterBody] = useState<string>(() => {
    return existingDraft ? existingDraft.letterContent : generateToneContent('cercano');
  });

  const handleToneChange = (newTone: CoverLetterTone) => {
    setSelectedTone(newTone);
    setLetterBody(generateToneContent(newTone));
    showToast(`Tono de la carta: ${newTone}`, 'info');
  };

  const handleResetTemplate = () => {
    setLetterBody(generateToneContent(selectedTone));
    showToast('Plantilla restablecida según el tono seleccionado', 'info');
  };

  const handleSaveDraft = () => {
    const draft: ApplicationDraft = {
      offerId: preparingOffer.id,
      offerTitle: jobTitle,
      companyName,
      tone: selectedTone,
      recipient,
      date: currentDate,
      letterContent: letterBody,
      tailoredCvSummary: `Técnica en Gestión Administrativa con experiencia confirmada en Encuadernación Novo adaptada a ${jobTitle}.`,
      lastUpdated: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
    saveDraft(draft);
  };

  const handleExport = () => {
    showToast('Exportación pendiente de conexión', 'info');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="prepare-application-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
    >
      <div className="relative bg-white w-full max-w-3xl rounded-xl shadow-2xl border border-slate-300 flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#FAF9F5]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                PREPARACIÓN DE CANDIDATURA (DEMO)
              </span>
              <span className="text-xs text-slate-500 truncate max-w-xs">
                {preparingOffer.title}
              </span>
            </div>
            <h2 id="prepare-application-title" className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              Preparar candidatura para {companyName}
            </h2>
          </div>

          <button
            onClick={() => setPreparingOffer(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
            aria-label="Cerrar preparación de candidatura"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning banner mandated by prompt */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 text-xs text-amber-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="font-semibold">
            Revisa el documento antes de utilizarlo. Esta maqueta no envía candidaturas automáticamente.
          </span>
        </div>

        {/* Navigation tabs */}
        <div className="flex items-center justify-between px-6 pt-3 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('cv')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'cv'
                  ? 'border-[#1E3A4B] text-[#1E3A4B]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>CV adaptado</span>
            </button>

            <button
              onClick={() => setActiveTab('letter')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === 'letter'
                  ? 'border-[#1E3A4B] text-[#1E3A4B]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Carta de presentación</span>
            </button>
          </div>

          {activeTab === 'letter' && (
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 rounded-md transition-colors"
            >
              {isPreviewMode ? <Edit2 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{isPreviewMode ? 'Editar' : 'Vista previa'}</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'cv' ? (
            /* Tab 1: CV adaptado */
            <div className="space-y-5 text-xs text-slate-800">
              <div className="bg-[#FAF9F5] p-3 rounded-lg border border-[#EDE9E1] text-[11px] text-slate-600">
                Este CV adaptado utiliza exclusivamente la información contrastada de Laura (Encuadernación Novo, funciones confirmadas, titulación oficial y movilidad propia). Los datos pendientes se mantienen como campos por confirmar.
              </div>

              <div className="p-6 bg-white border border-slate-300 rounded-xl shadow-xs space-y-4 font-sans">
                {/* Header */}
                <div className="border-b border-slate-300 pb-3">
                  <h3 className="text-xl font-bold uppercase text-slate-900">
                    {profile.fullName}
                  </h3>
                  <p className="text-xs font-semibold text-[#1E3A4B]">
                    {profile.provisionalTitle} <span className="font-normal text-slate-500">(titular provisional a confirmar)</span>
                  </p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    {profile.publicLocation} · <span className="italic text-slate-400">[Teléfono: campo pendiente]</span> · <span className="italic text-slate-400">[Correo: campo pendiente]</span>
                  </p>
                </div>

                {/* Perfil Profesional */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Perfil Profesional
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Profesional organizada y responsable con experiencia en el seguimiento metódico de órdenes de trabajo, interlocución con clientes y proveedores y gestión de almacén y control de existencias. Residente en Illescas (Toledo) con disponibilidad de incorporación inmediata.
                  </p>
                </div>

                {/* Formación confirmada */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Formación Confirmada
                  </h4>
                  <div className="space-y-1">
                    {profile.education.map((e) => (
                      <div key={e.id} className="flex justify-between">
                        <span className="font-semibold text-slate-900">{e.title}</span>
                        <span className="text-slate-400 italic">[Centro pendiente]</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experiencia en Encuadernación Novo */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Experiencia Laboral
                  </h4>
                  <div className="mb-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-900">{profile.experience.company}</span>
                      <span className="text-slate-400 font-normal italic">[Fechas pendientes]</span>
                    </div>
                    <p className="text-[11px] text-slate-500 italic mb-1.5">
                      Puesto oficial: [Denominación exacta pendiente] — {profile.experience.provisionalRoleNote}
                    </p>
                    <p className="text-[11px] font-semibold text-slate-700 mb-1">Funciones contrastadas:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                      {profile.experience.confirmedDuties.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Competencias confirmadas y movilidad */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Competencias y Recursos Confirmados
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-700">
                    <div>· Permiso de conducir B y coche propio</div>
                    <div>· Informática a nivel de usuario</div>
                    <div>· Gestión y seguimiento de órdenes de trabajo</div>
                    <div>· Atención a clientes y proveedores</div>
                    <div>· Control de stock y organización de almacén</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: Carta de presentación */
            <div className="space-y-5">
              {/* Tone Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF9F5] p-3 rounded-lg border border-[#EDE9E1]">
                <div className="text-xs">
                  <span className="font-semibold text-slate-800 block">Tono de la carta:</span>
                  <span className="text-[11px] text-slate-500">Selecciona entre los tres registros de demostración</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToneChange('formal')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      selectedTone === 'formal'
                        ? 'bg-[#1E3A4B] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    Formal
                  </button>
                  <button
                    onClick={() => handleToneChange('cercano')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      selectedTone === 'cercano'
                        ? 'bg-[#1E3A4B] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    Profesional cercano
                  </button>
                  <button
                    onClick={() => handleToneChange('directo')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      selectedTone === 'directo'
                        ? 'bg-[#1E3A4B] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    Directo y breve
                  </button>
                </div>
              </div>

              {/* Editable Placeholders Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#FAF9F5] border border-slate-300 rounded-md font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-semibold mb-1">
                    Puesto
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#FAF9F5] border border-slate-300 rounded-md font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-semibold mb-1">
                    Persona destinataria
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#FAF9F5] border border-slate-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-semibold mb-1">
                    Fecha
                  </label>
                  <input
                    type="text"
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#FAF9F5] border border-slate-300 rounded-md"
                  />
                </div>
              </div>

              {/* Letter Editor / Preview */}
              {isPreviewMode ? (
                <div className="p-6 bg-[#FAF9F5] border border-slate-300 rounded-xl font-serif text-sm text-slate-800 whitespace-pre-line leading-relaxed shadow-inner">
                  {letterBody}
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cuerpo editable de la carta:
                  </label>
                  <textarea
                    rows={12}
                    value={letterBody}
                    onChange={(e) => setLetterBody(e.target.value)}
                    className="w-full p-4 text-xs font-mono bg-white border border-slate-300 rounded-xl leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A4B]"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 border-t border-slate-200 bg-[#FAF9F5]">
          <div className="flex items-center gap-2">
            {activeTab === 'letter' && (
              <button
                onClick={handleResetTemplate}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer plantilla</span>
              </button>
            )}

            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-md transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'letter' && (
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {isPreviewMode ? 'Editar' : 'Vista previa'}
              </button>
            )}

            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1E3A4B] hover:bg-[#152B38] rounded-lg transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar borrador</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
