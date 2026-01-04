const CREDITOS = 6;

const materias = {
  romano: { nombre: "Derecho Romano", req: [] },
  intro: { nombre: "Introducción al Derecho", req: [] },
  sociedad: { nombre: "Sociedad y Estado", req: [] },
  contexto: { nombre: "Contexto Mundial", req: [] },
  comunicacion: { nombre: "Técnicas de Comunicación", req: [] },
  innovacion: { nombre: "Innovación y Creatividad", req: [] },
  computacion: { nombre: "Computación", req: [] },
  eng1: { nombre: "English Beginners", req: [] },

  personas: { nombre: "Personas y Bienes", req: ["romano","intro"] },
  proceso: { nombre: "Teoría General del Proceso", req: [] },
  penal1: { nombre: "Derecho Penal I", req: ["intro"] },
  constitucional1: { nombre: "Derecho Constitucional I", req: ["intro","sociedad"] },
  sociologia: { nombre: "Sociología del Derecho", req: [] },
  laboral: { nombre: "Derecho Laboral", req: ["intro"] },
  analisis: { nombre: "Análisis del Entorno", req: [] },
  eng2: { nombre: "English Intermediate", req: ["eng1"] },

  obligaciones: { nombre: "Obligaciones", req: ["personas"] },
  penal2: { nombre: "Derecho Penal II", req: ["penal1"] },
  constitucional2: { nombre: "Derecho Constitucional II", req: ["constitucional1"] },
  comercial1: { nombre: "Derecho Comercial I", req: ["personas","constitucional1"] },
  seguridad: { nombre: "Seguridad Social", req: ["laboral"] },
  metodos: { nombre: "Métodos de Investigación", req: ["comunicacion"] },
  internacional1: { nombre: "Derecho Internacional Público I", req: ["obligaciones"] },
  eng3: { nombre: "English High Intermediate", req: ["eng2"] },
};

const semestres = [
  {
    nombre: "1° Semestre",
    ramos: ["romano","intro","sociedad","contexto","comunicacion","innovacion","computacion","eng1"]
  },
  {
    nombre: "2° Semestre",
    ramos: ["personas","proceso","penal1","constitucional1","sociologia","laboral","analisis","eng2"]
  },
  {
    nombre: "3° Semestre",
    ramos: ["obligaciones","penal2","constitucional2","comercial1","seguridad","metodos","internacional1","eng3"]
  },
  {
    nombre: "4° Semestre",
    ramos: ["contratos1","familia","admin1","filosofia","comercial2","liderazgo","internacional2","eng4"]
  },
  {
    nombre: "5° Semestre",
    ramos: ["contratos2","sucesiones","admin2","comercial3","procesal_lab","presupuestos","economia","internacional3","practica1"]
  },
  {
    nombre: "6° Semestre",
    ramos: ["proc_civil1","proc_penal","aduanero","ambiental","tributario","seguros","forense_lab","integracion"]
  },
  {
    nombre: "7° Semestre",
    ramos: ["proc_civil2","forense_penal","financiero","industrial","electiva1","electiva2","emprendimiento","comercio","practica2"]
  },
  {
    nombre: "8° Semestre",
    ramos: ["forense_civil","marc","procedimientos_esp","bursatil","electiva3","electiva4","electiva5","contratacion","seminario","proyecto"]
  }
];
