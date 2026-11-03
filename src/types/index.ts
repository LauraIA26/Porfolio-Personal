/**
 * Tipos principales para el Portfolio y el Espacio Laboral de Laura Jiménez López.
 * Diseñado conforme a los requerimientos de demostración y accesibilidad.
 */

export interface ConfirmedExperience {
  company: string;
  confirmedDuties: string[];
  pendingNote: string;
  provisionalRoleNote?: string;
}

export interface EducationItem {
  id: string;
  title: string;
  level: string;
  pendingNote: string;
  center?: string;
}

export interface LauraProfile {
  // Datos confirmados
  fullName: string;
  publicLocation: string;
  currentStatus: string;
  hasDrivingLicenseB: boolean;
  hasOwnCar: boolean;
  itLevel: string; // "Nivel de usuario"
  provisionalTitle: string; // "Técnica en Gestión Administrativa"
  provisionalRoleDescription: string; // "Gestión administrativa y operativa [descripción provisional a confirmar]"
  aboutText: string;

  // Experiencia confirmada
  experience: ConfirmedExperience;

  // Formación confirmada
  education: EducationItem[];

  // Competencias confirmadas
  competencies: string[];

  // Campos editables del área privada (pendientes de completar por Laura)
  phone: string; // Inicialmente vacía "[añadir información]"
  email: string; // Inicialmente vacía "[añadir información]"
  experienceDates: string; // "[añadir información]"
  exactRoleTitle: string; // "[añadir información]"
  softwareTools: string; // "[añadir información]"
  languages: string; // "[añadir información]"
  additionalTraining: string; // "[añadir información]"
  trainingCenters: string; // "[añadir información]"
  desiredSalary: string; // "[añadir información]"
  availabilityDate: string; // "[añadir información]"
  availabilityNotes: string; // "[añadir información]"
}

export interface WorkPreferences {
  targetRoles: string[];
  referenceLocation: string; // "Illescas"
  maxRadiusKm: number; // 20 km
  modalities: {
    presencial: boolean;
    hibrida: boolean;
    remota: boolean;
  };
  schedules: {
    continua: boolean;
    parcial: boolean;
    completa: boolean;
    partida: boolean;
  };
  minSalary?: string; // Opcional vacío
  startDate?: string; // Opcional vacío
  preferredContractType?: string; // Opcional vacío
}

export interface RequirementItem {
  text: string;
  isMandatory: boolean;
  status: 'matched' | 'unknown' | 'unmatched';
  explanation: string;
}

export interface AffinityBreakdown {
  experienceScore: number; // Max 30
  educationScore: number; // Max 20
  locationScore: number; // Max 20
  modalityScheduleScore: number; // Max 15
  mandatoryReqScore: number; // Max 15
  totalScore: number; // 0 to 100
  cappedDueToMandatory: boolean;
  explanation: string;
}

export interface DemoJobOffer {
  id: string;
  title: string;
  company: string; // Ficticia e.g. Empresa DEMO 01
  location: string;
  distanceKm: number;
  modality: 'Presencial' | 'Híbrida' | 'Remota';
  schedule: 'Jornada continua' | 'Jornada parcial' | 'Jornada completa' | 'Jornada partida';
  contractType: string;
  salary: string; // "No especificado en esta demostración"
  publishedDate: string; // Fecha de consulta de demostración
  source: string; // "Fuente no conectada"
  description: string;
  mandatoryRequirements: string[];
  desirableRequirements: string[];
  affinity: AffinityBreakdown;
  detailedRequirements: RequirementItem[];
}

export type CoverLetterTone = 'formal' | 'cercano' | 'directo';

export interface ApplicationDraft {
  offerId: string;
  offerTitle: string;
  companyName: string;
  tone: CoverLetterTone;
  recipient: string;
  date: string;
  letterContent: string;
  tailoredCvSummary: string;
  lastUpdated: string;
}

export type CandidacyStatus =
  | 'Guardada'
  | 'Pendiente de revisar'
  | 'Documentos preparados'
  | 'Candidatura enviada manualmente'
  | 'En proceso'
  | 'Entrevista'
  | 'Finalizada';

export interface CandidacyItem {
  id: string;
  offerId: string;
  offerTitle: string;
  companyName: string;
  location: string;
  status: CandidacyStatus;
  notes: string;
  manualLink: string;
  lastUpdated: string;
}

export interface RecentActivityItem {
  id: string;
  title: string;
  timestamp: string;
  type: 'analysis' | 'draft' | 'saved' | 'candidacy';
}
