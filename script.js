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
  eng3: { nombre: "English High Intermediate", req: ["eng2"] }
};

const semestres = [
  { nombre: "1° Semestre", ramos: ["romano","intro","sociedad","contexto","comunicacion","innovacion","computacion","eng1"] },
  { nombre: "2° Semestre", ramos: ["personas","proceso","penal1","constitucional1","sociologia","laboral","analisis","eng2"] },
  { nombre: "3° Semestre", ramos: ["obligaciones","penal2","constitucional2","comercial1","seguridad","metodos","internacional1","eng3"] }
];

let aprobadas = new Set(JSON.parse(localStorage.getItem("aprobadas") || "[]"));

function puedeCursar(id) {
  return materias[id].req.every(r => aprobadas.has(r));
}

function render() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  semestres.forEach(sem => {
    const col = document.createElement("div");
    col.className = "semestre";

    const h2 = document.createElement("h2");
    h2.textContent = sem.nombre;
    col.appendChild(h2);

    sem.ramos.forEach(id => {
      const div = document.createElement("div");
      div.className = "curso";
      div.textContent = materias[id].nombre;

      if (aprobadas.has(id)) div.classList.add("aprobado");
      else if (!puedeCursar(id)) div.classList.add("bloqueado");

      div.onclick = () => aprobar(id);
      col.appendChild(div);
    });

    malla.appendChild(col);
  });

  document.getElementById("creditos").textContent =
    `Créditos aprobados: ${aprobadas.size * CREDITOS}`;
}

function aprobar(id) {
  if (!puedeCursar(id) || aprobadas.has(id)) return;

  aprobadas.add(id);
  localStorage.setItem("aprobadas", JSON.stringify([...aprobadas]));

  const desbloqueadas = Object.entries(materias)
    .filter(([k,v]) => v.req.includes(id) && puedeCursar(k))
    .map(([_,v]) => v.nombre);

  document.getElementById("desbloqueadas").innerHTML =
    desbloqueadas.length
      ? `✨ <strong>Se desbloquearon:</strong><br>${desbloqueadas.join("<br>")}`
      : "No se desbloquearon nuevos ramos";

  render();
}

render();
