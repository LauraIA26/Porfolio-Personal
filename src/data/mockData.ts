import {
  LauraProfile,
  WorkPreferences,
  DemoJobOffer,
  ApplicationDraft,
  CandidacyItem,
  RecentActivityItem
} from '../types';

export const INITIAL_LAURA_PROFILE: LauraProfile = {
  fullName: 'Laura Jiménez López',
  publicLocation: 'Illescas, Toledo, España',
  currentStatus: 'Búsqueda activa de empleo (desempleada)',
  hasDrivingLicenseB: true,
  hasOwnCar: true,
  itLevel: 'Informática a nivel de usuario',
  provisionalTitle: 'Técnica en Gestión Administrativa',
  provisionalRoleDescription: 'Gestión administrativa y operativa (descripción provisional pendiente de confirmación)',
  aboutText:
    'Soy una persona organizada, metódica y responsable, con experiencia práctica en el seguimiento diario de órdenes de trabajo, la atención y comunicación directa tanto con clientes como con proveedores, y las labores de control de stock y organización física y documental de almacén. Me caracterizo por el cuidado del detalle, la constancia en las tareas administrativas y la buena disposición para integrarme en equipos de trabajo locales.',
  
  experience: {
    company: 'Encuadernación Novo',
    confirmedDuties: [
      'Gestión y seguimiento de órdenes de trabajo',
      'Atención a clientes',
      'Atención a proveedores',
      'Control de stock',
      'Organización de almacén'
    ],
    pendingNote: 'Fechas y denominación exacta del puesto: información pendiente de completar',
    provisionalRoleNote: 'Gestión administrativa y operativa [descripción provisional a confirmar]'
  },

  education: [
    {
      id: 'edu-1',
      title: 'Título de Educación Secundaria Obligatoria, E.S.O.',
      level: 'Educación Secundaria Obligatoria',
      pendingNote: 'Fechas y centro educativo: información pendiente de completar',
      center: ''
    },
    {
      id: 'edu-2',
      title: 'Título de Técnico en Gestión Administrativa',
      level: 'Formación Profesional (Grado Medio)',
      pendingNote: 'Fechas y centro educativo: información pendiente de completar',
      center: ''
    }
  ],

  competencies: [
    'Gestión y seguimiento de órdenes de trabajo',
    'Atención a clientes',
    'Atención a proveedores',
    'Control de stock',
    'Organización de almacén',
    'Gestión administrativa',
    'Informática a nivel de usuario',
    'Permiso de conducir B',
    'Coche propio'
  ],

  // Campos para el área privada (vacíos / pendientes de completar por Laura)
  phone: '',
  email: '',
  experienceDates: '',
  exactRoleTitle: '',
  softwareTools: '',
  languages: '',
  additionalTraining: '',
  trainingCenters: '',
  desiredSalary: '',
  availabilityDate: '',
  availabilityNotes: ''
};

export const INITIAL_PREFERENCES: WorkPreferences = {
  targetRoles: [
    'Auxiliar administrativa',
    'Administrativa',
    'Gestión de pedidos',
    'Atención al cliente',
    'Recepción',
    'Control de stock',
    'Gestión de almacén'
  ],
  referenceLocation: 'Illescas',
  maxRadiusKm: 20,
  modalities: {
    presencial: true,
    hibrida: true,
    remota: false
  },
  schedules: {
    continua: true,
    parcial: true,
    completa: false,
    partida: false
  },
  minSalary: '',
  startDate: '',
  preferredContractType: ''
};

export const DEMO_JOB_OFFERS: DemoJobOffer[] = [
  {
    id: 'demo-offer-1',
    title: 'Auxiliar Administrativa / Control de Pedidos y Almacén',
    company: 'Empresa DEMO 01 (Logística La Sagra)',
    location: 'Illescas (Toledo)',
    distanceKm: 2,
    modality: 'Presencial',
    schedule: 'Jornada continua',
    contractType: 'Indefinido (demostración)',
    salary: 'No especificado en esta demostración',
    publishedDate: 'Publicada hace 2 días (consulta demo)',
    source: 'Fuente no conectada',
    description:
      'Empresa ficticia de suministros comarcales busca perfil para registro de albaranes, control de existencias en almacén, seguimiento de órdenes de trabajo y atención a clientes y proveedores locales.',
    mandatoryRequirements: [
      'Técnico en Gestión Administrativa o titulación equivalente',
      'Experiencia en seguimiento de órdenes y proveedores',
      'Permiso B y vehículo para acceso al polígono'
    ],
    desirableRequirements: [
      'Conocimientos en organización de almacén y control de stock',
      'Residencia en Illescas o cercanías (< 10 km)'
    ],
    affinity: {
      experienceScore: 26, // max 30
      educationScore: 20, // max 20
      locationScore: 20, // max 20
      modalityScheduleScore: 15, // max 15
      mandatoryReqScore: 15, // max 15
      totalScore: 82,
      cappedDueToMandatory: false,
      explanation:
        'Afinidad orientativa del 82%: Coincidencia alta con las funciones de Encuadernación Novo (órdenes de trabajo, proveedores y control de stock), titulación oficial exacta y ubicación inmediata en Illescas.'
    },
    detailedRequirements: [
      {
        text: 'Técnico en Gestión Administrativa',
        isMandatory: true,
        status: 'matched',
        explanation: 'Laura tiene confirmado el título oficial de Técnico en Gestión Administrativa.'
      },
      {
        text: 'Experiencia en órdenes de trabajo y atención a proveedores',
        isMandatory: true,
        status: 'matched',
        explanation: 'Funciones confirmadas de gestión de órdenes y trato con proveedores en Encuadernación Novo.'
      },
      {
        text: 'Permiso B y coche propio',
        isMandatory: true,
        status: 'matched',
        explanation: 'Laura dispone de permiso B y vehículo propio para desplazarse.'
      },
      {
        text: 'Control de stock y organización de almacén',
        isMandatory: false,
        status: 'matched',
        explanation: 'Ambas funciones están acreditadas en su trayectoria profesional.'
      },
      {
        text: 'Manejo de software ERP específico de almacén',
        isMandatory: false,
        status: 'unknown',
        explanation: 'Laura tiene informática nivel usuario; herramientas específicas pendientes de completar en perfil.'
      }
    ]
  },
  {
    id: 'demo-offer-2',
    title: 'Administrativa de Atención al Cliente y Proveedores',
    company: 'Empresa DEMO 02 (Packaging y Artes Gráficas)',
    location: 'Yuncos (Toledo)',
    distanceKm: 5,
    modality: 'Híbrida',
    schedule: 'Jornada continua',
    contractType: 'Temporal con opción a indefinido (demo)',
    salary: 'No especificado en esta demostración',
    publishedDate: 'Publicada hace 4 días (consulta demo)',
    source: 'Fuente no conectada',
    description:
      'Taller ficticio de artes gráficas y embalaje precisa persona para seguimiento de encargos, contacto continuo con proveedores y resolución de consultas de clientes.',
    mandatoryRequirements: [
      'Seguimiento de órdenes y atención al cliente',
      'Manejo de ofimática general a nivel de usuario',
      'Capacidad de organización'
    ],
    desirableRequirements: [
      'Experiencia previa en encuadernación o artes afines',
      'Preferencia por jornada intensiva matinal'
    ],
    affinity: {
      experienceScore: 28,
      educationScore: 18,
      locationScore: 18,
      modalityScheduleScore: 15,
      mandatoryReqScore: 15,
      totalScore: 78,
      cappedDueToMandatory: false,
      explanation:
        'Afinidad orientativa del 78%: Excelente ajuste con su trayectoria en encuadernación, a 5 km de Illescas y con modalidad híbrida y jornada continua.'
    },
    detailedRequirements: [
      {
        text: 'Trato con clientes y seguimiento de pedidos',
        isMandatory: true,
        status: 'matched',
        explanation: 'Funciones confirmadas en Encuadernación Novo.'
      },
      {
        text: 'Atención a proveedores del sector',
        isMandatory: true,
        status: 'matched',
        explanation: 'Experiencia confirmada en su puesto anterior.'
      },
      {
        text: 'Ofimática a nivel de usuario',
        isMandatory: true,
        status: 'matched',
        explanation: 'Nivel digital confirmado por Laura.'
      },
      {
        text: 'Conocimiento de materiales específicos de encuadernación',
        isMandatory: false,
        status: 'unknown',
        explanation: 'Dato no detallado en los datos iniciales confirmados.'
      }
    ]
  },
  {
    id: 'demo-offer-3',
    title: 'Auxiliar de Recepción y Control de Almacén',
    company: 'Empresa DEMO 03 (Suministros La Sagra Almacenes)',
    location: 'Numancia de la Sagra (Toledo)',
    distanceKm: 6,
    modality: 'Presencial',
    schedule: 'Jornada parcial',
    contractType: 'Media jornada 25h (demo)',
    salary: 'No especificado en esta demostración',
    publishedDate: 'Publicada hace 6 días (consulta demo)',
    source: 'Fuente no conectada',
    description:
      'Puesto ficticio a tiempo parcial en horario de mañana para control de albaranes de entrada, cotejo de stock físico, inventario periódico y archivo.',
    mandatoryRequirements: [
      'Control de stock y organización de almacén',
      'Disponibilidad para jornada parcial',
      'Vehículo propio para desplazamiento'
    ],
    desirableRequirements: [
      'Título de E.S.O. o Técnico Administrativo',
      'Residencia en radio comarcal (< 10 km)'
    ],
    affinity: {
      experienceScore: 25,
      educationScore: 20,
      locationScore: 18,
      modalityScheduleScore: 15,
      mandatoryReqScore: 15,
      totalScore: 76,
      cappedDueToMandatory: false,
      explanation:
        'Afinidad orientativa del 76%: Encaja con la preferencia por jornada parcial de Laura, funciones directas de stock y almacén a 6 km de Illescas.'
    },
    detailedRequirements: [
      {
        text: 'Control de stock y almacén',
        isMandatory: true,
        status: 'matched',
        explanation: 'Ambas funciones están formalmente acreditadas.'
      },
      {
        text: 'Jornada parcial de mañanas',
        isMandatory: true,
        status: 'matched',
        explanation: 'Coincide con una de las preferencias laborales marcadas.'
      },
      {
        text: 'Vehículo propio y carnet B',
        isMandatory: true,
        status: 'matched',
        explanation: 'Requisito confirmado de movilidad.'
      }
    ]
  },
  {
    id: 'demo-offer-4',
    title: 'Recepcionista y Gestión de Envíos Locales',
    company: 'Empresa DEMO 04 (Servicios Industriales Yeles)',
    location: 'Yeles (Toledo)',
    distanceKm: 6,
    modality: 'Presencial',
    schedule: 'Jornada continua',
    contractType: 'Indefinido inicial (demo)',
    salary: 'No especificado en esta demostración',
    publishedDate: 'Publicada hace 3 días (consulta demo)',
    source: 'Fuente no conectada',
    description:
      'Recepción ficticia de clientes y transportistas, gestión de llamadas, cotejo de albaranes con órdenes de trabajo y archivo documental.',
    mandatoryRequirements: [
      'Atención al cliente presencial y telefónica',
      'Título de E.S.O. o Grado Medio',
      'Responsabilidad y puntualidad'
    ],
    desirableRequirements: [
      'Experiencia en talleres o almacenes',
      'Carnet B y coche propio'
    ],
    affinity: {
      experienceScore: 22,
      educationScore: 20,
      locationScore: 18,
      modalityScheduleScore: 14,
      mandatoryReqScore: 15,
      totalScore: 73,
      cappedDueToMandatory: false,
      explanation:
        'Afinidad orientativa del 73%: Adecuación en funciones de atención y recepción, en localidad a 6 km y con jornada continua.'
    },
    detailedRequirements: [
      {
        text: 'Atención a clientes',
        isMandatory: true,
        status: 'matched',
        explanation: 'Función confirmada.'
      },
      {
        text: 'Titulación de E.S.O. o Grado Medio',
        isMandatory: true,
        status: 'matched',
        explanation: 'Laura cuenta con ambas titulaciones oficiales.'
      },
      {
        text: 'Experiencia en talleres mecánicos',
        isMandatory: false,
        status: 'unmatched',
        explanation: 'Experiencia confirmada en taller de encuadernación y artes gráficas.'
      }
    ]
  },
  {
    id: 'demo-offer-5',
    title: 'Técnico Administrativo / Facturación y Compras',
    company: 'Empresa DEMO 05 (Industrias Sagra Norte)',
    location: 'Esquivias (Toledo)',
    distanceKm: 9,
    modality: 'Híbrida',
    schedule: 'Jornada continua',
    contractType: 'Sustitución temporal (demo)',
    salary: 'No especificado en esta demostración',
    publishedDate: 'Publicada hace 5 días (consulta demo)',
    source: 'Fuente no conectada',
    description:
      'Soporte a compras y facturación de proveedores, resolución de discrepancias en pedidos y gestión documental de pedidos.',
    mandatoryRequirements: [
      'Técnico en Gestión Administrativa',
      'Inglés B2 acreditado',
      'Atención a proveedores'
    ],
    desirableRequirements: [
      'Manejo de ERP (SAP)',
      'Vehículo propio'
    ],
    affinity: {
      experienceScore: 22,
      educationScore: 20,
      locationScore: 16,
      modalityScheduleScore: 14,
      mandatoryReqScore: 0, // FALLA REQUISITO OBLIGATORIO: INGLÉS B2
      totalScore: 58, // Limitado a máx 60 por regla de requisito obligatorio
      cappedDueToMandatory: true,
      explanation:
        'Afinidad limitada al 58% (máximo 60 puntos): la oferta exige nivel de inglés B2 como requisito obligatorio, el cual consta como desconocido o no acreditado en el perfil de Laura.'
    },
    detailedRequirements: [
      {
        text: 'Técnico en Gestión Administrativa',
        isMandatory: true,
        status: 'matched',
        explanation: 'Titulación confirmada.'
      },
      {
        text: 'Inglés intermedio B2 acreditado',
        isMandatory: true,
        status: 'unknown',
        explanation: 'Requisito obligatorio desconocido: Laura no tiene idiomas confirmados en su perfil.'
      },
      {
        text: 'Atención a proveedores',
        isMandatory: true,
        status: 'matched',
        explanation: 'Función confirmada en Encuadernación Novo.'
      },
      {
        text: 'Manejo de SAP',
        isMandatory: false,
        status: 'unknown',
        explanation: 'Software específico no confirmado (informática a nivel de usuario).'
      }
    ]
  },
  {
    id: 'demo-offer-6',
    title: 'Operario/a de Almacén y Control de Existencias',
    company: 'Empresa DEMO 06 (Distribuciones de la Sagra)',
    location: 'Seseña (Toledo)',
    distanceKm: 17,
    modality: 'Presencial',
    schedule: 'Jornada continua',
    contractType: 'Temporal (demo)',
    salary: 'No especificado en esta demostración',
    publishedDate: 'Publicada hace 1 semana (consulta demo)',
    source: 'Fuente no conectada',
    description:
      'Descarga puntual, cotejo con albarán, etiquetado de mercancía, control de inventario periódico y ubicación en estanterías.',
    mandatoryRequirements: [
      'Control de stock y almacén',
      'Disponibilidad para desplazarse a Seseña'
    ],
    desirableRequirements: [
      'Carnet de carretillero',
      'Carnet B y coche propio'
    ],
    affinity: {
      experienceScore: 24,
      educationScore: 15,
      locationScore: 12,
      modalityScheduleScore: 14,
      mandatoryReqScore: 12,
      totalScore: 68,
      cappedDueToMandatory: false,
      explanation:
        'Afinidad orientativa del 68%: Se encuentra a 17 km (cerca del límite de 20 km). Coincide en stock y almacén, pero no está confirmado carnet de carretilla elevadora.'
    },
    detailedRequirements: [
      {
        text: 'Control de stock y almacén',
        isMandatory: true,
        status: 'matched',
        explanation: 'Funciones confirmadas de Laura.'
      },
      {
        text: 'Desplazamiento propio a Seseña',
        isMandatory: true,
        status: 'matched',
        explanation: 'Laura dispone de carnet B y coche propio.'
      },
      {
        text: 'Carnet de carretilla elevadora',
        isMandatory: false,
        status: 'unknown',
        explanation: 'No consta en sus competencias confirmadas.'
      }
    ]
  },
  {
    id: 'demo-offer-7',
    title: 'Administrativa Comercial y Facturación',
    company: 'Empresa DEMO 07 (Suministros Madrid Sur)',
    location: 'Parla (Madrid) — Fuera del radio preferente',
    distanceKm: 25,
    modality: 'Presencial',
    schedule: 'Jornada partida',
    contractType: 'Indefinido (demo)',
    salary: 'No especificado en esta demostración',
    publishedDate: 'Publicada hace 1 semana (consulta demo)',
    source: 'Fuente no conectada',
    description:
      'Puesto ficticio en polígono de Parla con horario de mañana y tarde (jornada partida 9:00 a 14:00 y 16:00 a 19:00).',
    mandatoryRequirements: [
      'Experiencia administrativa',
      'Jornada partida presencial'
    ],
    desirableRequirements: [
      'Residencia en Parla o cercanías'
    ],
    affinity: {
      experienceScore: 20,
      educationScore: 18,
      locationScore: 0, // Fuera del radio de 20 km
      modalityScheduleScore: 4, // Jornada partida no preferida
      mandatoryReqScore: 10,
      totalScore: 48,
      cappedDueToMandatory: false,
      explanation:
        'Afinidad orientativa del 48%: Se sitúa en Parla a 25 km (supera los 20 km de búsqueda) y exige jornada partida.'
    },
    detailedRequirements: [
      {
        text: 'Ubicación en radio máximo de 20 km',
        isMandatory: true,
        status: 'unmatched',
        explanation: 'Parla se sitúa a 25 km, fuera del radio establecido de 20 km desde Illescas.'
      },
      {
        text: 'Jornada continua o parcial preferente',
        isMandatory: false,
        status: 'unmatched',
        explanation: 'La oferta exige jornada partida.'
      }
    ]
  },
  {
    id: 'demo-offer-8',
    title: 'Secretaría de Dirección y Gestión Avanzada',
    company: 'Empresa DEMO 08 (Consultoría y Asesoría Central)',
    location: 'Toledo capital — Fuera del radio preferente',
    distanceKm: 36,
    modality: 'Presencial',
    schedule: 'Jornada completa',
    contractType: 'Indefinido (demo)',
    salary: 'No especificado en esta demostración',
    publishedDate: 'Publicada hace 8 días (consulta demo)',
    source: 'Fuente no conectada',
    description:
      'Puesto en Toledo capital para gestión de agenda de alta dirección y redacción de informes.',
    mandatoryRequirements: [
      'Grado Superior o Universitario',
      '5 años de experiencia demostrable en alta dirección',
      'Inglés C1'
    ],
    desirableRequirements: [
      'Residencia en Toledo'
    ],
    affinity: {
      experienceScore: 10,
      educationScore: 8,
      locationScore: 0,
      modalityScheduleScore: 8,
      mandatoryReqScore: 0,
      totalScore: 26,
      cappedDueToMandatory: true,
      explanation:
        'Afinidad orientativa del 26%: Supera ampliamente el radio de 20 km (36 km hasta Toledo capital) y exige Grado Superior o Universitario e inglés C1.'
    },
    detailedRequirements: [
      {
        text: 'Ubicación en radio <= 20 km',
        isMandatory: true,
        status: 'unmatched',
        explanation: 'Toledo capital se sitúa a 36 km de Illescas.'
      },
      {
        text: 'Grado Superior o Grado Universitario',
        isMandatory: true,
        status: 'unmatched',
        explanation: 'Laura tiene titulación oficial de Grado Medio (Técnico en Gestión Administrativa).'
      },
      {
        text: 'Inglés C1',
        isMandatory: true,
        status: 'unknown',
        explanation: 'Requisito desconocido en perfil.'
      }
    ]
  }
];

export const INITIAL_APPLICATION_DRAFT: ApplicationDraft = {
  offerId: 'demo-offer-1',
  offerTitle: 'Auxiliar Administrativa / Control de Pedidos y Almacén',
  companyName: 'Empresa DEMO 01 (Logística La Sagra)',
  tone: 'cercano',
  recipient: 'Responsable de Selección / Departamento de Recursos Humanos',
  date: '3 de noviembre de 2026',
  tailoredCvSummary:
    'Técnica en Gestión Administrativa con experiencia confirmada en Encuadernación Novo, enfocada en la gestión de órdenes de trabajo, seguimiento riguroso con proveedores, control de stock y organización de almacén. Residente en Illescas con permiso de conducir B y vehículo propio.',
  letterContent: `Estimada/o Responsable de Selección de Empresa DEMO 01,

Me dirijo a ustedes para presentar mi candidatura al puesto de Auxiliar Administrativa / Control de Pedidos y Almacén en Illescas.

Cuento con la titulación oficial de Técnico en Gestión Administrativa y experiencia práctica en Encuadernación Novo, donde he desempeñado funciones clave de gestión y seguimiento de órdenes de trabajo, atención directa a clientes y proveedores, así como control de stock y organización del almacén. 

Resido en Illescas y dispongo de permiso de conducir B y coche propio, lo que me permite incorporarme y desplazarme con total puntualidad y disponibilidad para una jornada continua. Aporto responsabilidad, método y especial cuidado en el registro y seguimiento de cada orden.

Agradezco de antemano el tiempo dedicado a revisar mi perfil y quedo a su disposición para cualquier aclaración o entrevista personal.

Atentamente,
Laura Jiménez López
Illescas (Toledo)`,
  lastUpdated: 'Guardado automático de demostración'
};

export const INITIAL_CANDIDACIES: CandidacyItem[] = [
  {
    id: 'cand-1',
    offerId: 'demo-offer-1',
    offerTitle: 'Auxiliar Administrativa / Control de Pedidos y Almacén',
    companyName: 'Empresa DEMO 01 (Logística La Sagra)',
    location: 'Illescas (Toledo)',
    status: 'Documentos preparados',
    notes: 'Carta de presentación y CV adaptado redactados en tono cercano. Pendiente de enviar en persona al polígono.',
    manualLink: 'https://ejemplo-demo.es/ofertas/logistica-la-sagra-01',
    lastUpdated: 'Hoy a las 10:15 (Anotación DEMO)'
  },
  {
    id: 'cand-2',
    offerId: 'demo-offer-2',
    offerTitle: 'Administrativa de Atención al Cliente y Proveedores',
    companyName: 'Empresa DEMO 02 (Packaging y Artes Gráficas)',
    location: 'Yuncos (Toledo)',
    status: 'Pendiente de revisar',
    notes: 'Revisar si solicitan disponibilidad para horario continuado de mañana.',
    manualLink: '',
    lastUpdated: 'Ayer (Anotación DEMO)'
  },
  {
    id: 'cand-3',
    offerId: 'demo-offer-3',
    offerTitle: 'Auxiliar de Recepción y Control de Almacén',
    companyName: 'Empresa DEMO 03 (Suministros La Sagra Almacenes)',
    location: 'Numancia de la Sagra (Toledo)',
    status: 'Candidatura enviada manualmente',
    notes: 'Entregado CV impreso en mano en recepción central el pasado lunes. Registrado como anotación de Laura.',
    manualLink: '',
    lastUpdated: 'Hace 3 días (Anotación DEMO)'
  }
];

export const RECENT_ACTIVITIES_DEMO: RecentActivityItem[] = [
  {
    id: 'act-1',
    title: 'Análisis de afinidad completado para Empresa DEMO 01 (82% de coincidencia)',
    timestamp: 'Hace 2 horas (Simulación DEMO)',
    type: 'analysis'
  },
  {
    id: 'act-2',
    title: 'Borrador de carta de presentación generado en tono «Profesional cercano»',
    timestamp: 'Hace 4 horas (Simulación DEMO)',
    type: 'draft'
  },
  {
    id: 'act-3',
    title: 'Oferta Empresa DEMO 03 marcada manualmente como «Candidatura enviada manualmente»',
    timestamp: 'Ayer (Simulación DEMO)',
    type: 'candidacy'
  },
  {
    id: 'act-4',
    title: 'Preferencias laborales actualizadas con radio comarcal de 20 km desde Illescas',
    timestamp: 'Hace 2 días (Simulación DEMO)',
    type: 'saved'
  }
];
