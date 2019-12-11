window.onload = init;
const url =
  "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";
var fallas;
function init() {
  document
    .querySelectorAll(".radio")
    .forEach(radio => radio.addEventListener("change", mostrar));
  document.getElementById("desde").addEventListener("blur", mostrar);
  document.getElementById("hasta").addEventListener("blur", mostrar);
  document.getElementById("seccion").addEventListener("blur", mostrar);
  const fetchBusc = fetch(url);
  fetchBusc
    .then(res => {
      return res.json();
    })
    .then(respuesta => {
      fallas = respuesta;
      mostrar();
    });
}

function mostrar() {
  let secciones = [];
  secciones.push("Todas");
  sections(secciones);
  const content = document.querySelector("content");
  content.innerHTML = "";
  fallas.features.filter(filtro).forEach(element => {
    if (document.getElementById("principal").checked) {
      if (!secciones.includes(element.properties.seccion))
        secciones.push(element.properties.seccion);
      let div = document.createElement("div");
      div.classList.add("falla");
      let img = document.createElement("img");
      img.src = element.properties.boceto;
      div.appendChild(img);
      let nombre = document.createElement("p");
      nombre.innerText = element.properties.nombre;
      div.appendChild(nombre);
      content.appendChild(div);
    } else {
      if (!secciones.includes(element.properties.seccion_i)) {
          secciones.push(element.properties.seccion_i);
      }
      let div = document.createElement("div");
      div.classList.add("falla");
      let img = document.createElement("img");
      img.src = element.properties.boceto_i;
      div.appendChild(img);
      let nombre = document.createElement("p");
      nombre.innerText = element.properties.nombre;
      div.appendChild(nombre);
      content.appendChild(div);
    }
  });
  secciones.sort();
  sections(secciones);
}

function filtro(falla) {
  if (isNaN(document.getElementById("desde").value)) return true;
  if (isNaN(document.getElementById("hasta").value)) return true;
  if (document.getElementById("principal").checked) {
    if (
      parseInt(document.getElementById("desde").value) >
      parseInt(falla.properties.anyo_fundacion)
    )
      return false;
    if (
      parseInt(document.getElementById("hasta").value) <
      falla.properties.anyo_fundacion
    )
      return false;
  } else {
    if (
      parseInt(document.getElementById("desde").value) >
      falla.properties.anyo_fundacion_i
    )
      return false;
    if (
      parseInt(document.getElementById("hasta").value) <
      falla.properties.anyo_fundacion_i
    )
      return false;
  }
  if (
    falla.properties.seccion != document.getElementById("seccion").value &&
    document.getElementById("seccion").value != "Todas"
  )
    return false;
  return true;
}

function sections(secciones) {
  let select = document.getElementById("seccion");
  select.innerText = "";
  secciones.forEach(seccion => {
    let opcion = document.createElement("option");
    opcion.value = seccion;
    let palabra;
    switch (seccion) {
      case "1A":
        palabra = "Primera A";
        break;
      case "1B":
        palabra = "Primera B";
        break;
      case "2A":
        palabra = "Segunda A";
        break;
      case "2B":
        palabra = "Segunda B";
        break;
      case "3A":
        palabra = "Tercera A";
        break;
      case "3B":
        palabra = "Tercera B";
        break;
      case "3C":
        palabra = "Tercera C";
        break;
      case "4A":
        palabra = "Cuarta A";
        break;
      case "4B":
        palabra = "Cuarta B";
        break;
      case "4C":
        palabra = "Cuarta C";
        break;
      case "5A":
        palabra = "Quinta A";
        break;
      case "5B":
        palabra = "Quinta B";
        break;
      case "5C":
        palabra = "Quinta C";
        break;
      case "6A":
        palabra = "Sexta A";
        break;
      case "6B":
        palabra = "Sexta B";
        break;
      case "6C":
        palabra = "Sexta C";
        break;
      case "7A":
        palabra = "Séptima A";
        break;
      case "7B":
        palabra = "Séptima B";
        break;
      case "7C":
        palabra = "Séptima C";
        break;
      case "8A":
        palabra = "Octaba A";
        break;
      case "8B":
        palabra = "Octaba B";
        break;
      case "8C":
        palabra = "Octaba C";
        break;
      case "E":
        palabra = "Especial";
        break;
      case "FC":
        palabra = "FC";
        break;
      default:
        palabra = seccion;
        break;
    }
    opcion.innerText = palabra;
    select.appendChild(opcion);
  });
}
