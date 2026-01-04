const CREDITOS_POR_RAMO = 6;

const materias = [
  // 1er semestre
  { id:"romano", nombre:"Derecho Romano", req:[] },
  { id:"intro", nombre:"Introducción al Derecho", req:[] },
  { id:"sociedad", nombre:"Sociedad y Estado", req:[] },
  { id:"contexto", nombre:"Contexto Mundial", req:[] },
  { id:"comunicacion", nombre:"Técnicas de Comunicación", req:[] },
  { id:"innovacion", nombre:"Innovación y Creatividad", req:[] },
  { id:"computacion", nombre:"Computación", req:[] },
  { id:"eng1", nombre:"English Beginners", req:[] },

  // 2do semestre
  { id:"personas", nombre:"Personas y Bienes", req:["romano","intro"] },
  { id:"proceso", nombre:"Teoría General del Proceso", req:[] },
  { id:"penal1", nombre:"Derecho Penal I", req:["intro"] },
  { id:"constitucional1", nombre:"Derecho Constitucional I", req:["intro","sociedad"] },
  { id:"sociologia", nombre:"Sociología del Derecho", req:[] },
  { id:"laboral", nombre:"Derecho Laboral", req:["intro"] },
  { id:"analisis", nombre:"Análisis del Entorno", req:[] },
  { id:"eng2", nombre:"English Intermediate", req:["eng1"] },

  // 3er semestre
  { id:"obligaciones", nombre:"Obligaciones", req:["personas"] },
  { id:"penal2", nombre:"Derecho Penal II", req:["penal1"] },
  { id:"constitucional2", nombre:"Derecho Constitucional II", req:["constitucional1"] },
  { id:"comercial1", nombre:"Derecho Comercial I", req:["personas","constitucional1"] },
  { id:"seguridad", nombre:"Seguridad Social", req:["laboral"] },
  { id:"metodos", nombre:"Métodos de Investigación", req:["comunicacion"] },
  { id:"internacional1", nombre:"Derecho Internacional Público I", req:["obligaciones"] },
  { id:"eng3", nombre:"English High Intermediate", req:["eng2"] },

  // 4to semestre
  { id:"contratos1", nombre:"Contratos I", req:["obligaciones"] },
  { id:"familia", nombre:"Derecho de Familia", req:["personas"] },
  { id:"admin1", nombre:"Derecho Administrativo I", req:["constitucional2"] },
  { id:"filosofia", nombre:"Filosofía y Deontología Jurídica", req:["intro","sociologia"] },
  { id:"comercial2", nombre:"Derecho Comercial II", req:["comercial1"] },
  { id:"liderazgo", nombre:"Liderazgo y Ética", req:[] },
  { id:"internacional2", nombre:"Derecho Internacional Privado I", req:["internacional1"] },
  { id:"eng4", nombre:"English Advanced", req:["eng3"] },

  // 5to semestre
  { id:"contratos2", nombre:"Contratos II", req:["contratos1"] },
  { id:"sucesiones", nombre:"Sucesiones", req:["familia"] },
  { id:"admin2", nombre:"Derecho Administrativo II", req:["admin1"] },
  { id:"comercial3", nombre:"Derecho Comercial III", req:["comercial2"] },
  { id:"procesal_lab", nombre:"Derecho Procesal Laboral", req:["seguridad"] },
  { id:"economia", nombre:"Economía General", req:[] },
  { id:"internacional3", nombre:"Derecho Internacional Privado II", req:["internacional2"] },
  { id:"practica1", nombre:"Práctica Profesional I", req:[] },

  // 6to semestre
  { id:"proc_civil1", nombre:"Procedimiento Civil I", req:["contratos2"] },
  { id:"proc_penal", nombre:"Derecho Procesal Penal", req:["penal2"] },
  { id:"aduanero", nombre:"Derecho Aduanero", req:["admin1"] },
  { id:"ambiental", nombre:"Derecho Ambiental", req:[] },
  { id:"tributario", nombre:"Derecho Tributario", req:["admin1"] },
  { id:"seguros", nombre:"Derecho y Gestión de Seguros", req:["contratos1"] },
  { id:"forense_lab", nombre:"Práctica Forense Laboral", req:["procesal_lab"] },
  { id:"integracion", nombre:"Derecho de Integración", req:["admin1","internacional1"] }
];

let aprobadas = new Set(JSON.parse(localStorage.getItem("aprobadas") || "[]"));

function puedeCursar(m) {
  return m.req.every(r => aprobadas.has(r));
}

function render() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  materias.forEach(m => {
    const div = document.createElement("div");
    div.className = "curso";

    if (aprobadas.has(m.id)) div.classList.add("aprobado");
    else if (!puedeCursar(m)) div.classList.add("bloqueado");

    div.textContent = m.nombre;
    div.onclick = () => aprobar(m);
    malla.appendChild(div);
  });

  actualizarCreditos();
}

function aprobar(m) {
  if (!puedeCursar(m) || aprobadas.has(m.id)) return;

  aprobadas.add(m.id);
  localStorage.setItem("aprobadas", JSON.stringify([...aprobadas]));

  const desbloqueadas = materias.filter(x =>
    x.req.includes(m.id) && puedeCursar(x)
  );

  const panel = document.getElementById("desbloqueadas");
  panel.innerHTML = desbloqueadas.length
    ? `<strong>🔓 Se desbloqueó:</strong><br>${desbloqueadas.map(d => d.nombre).join("<br>")}`
    : "No se desbloquearon nuevos ramos";

  render();
}

function actualizarCreditos() {
  document.getElementById("creditos").textContent =
    `Créditos aprobados: ${aprobadas.size * CREDITOS_POR_RAMO}`;
}

render();
