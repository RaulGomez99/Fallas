window.onload = init;
var secciones, seccionesI, primera, traductor;
const url = "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";
var fallas;


function init() {
    crearMapa();
    traductor();
    document.querySelectorAll(".radio").forEach(radio => radio.addEventListener("change", cambiaCategoria));
    document.getElementById("desde").addEventListener("blur", mostrar);
    document.getElementById("hasta").addEventListener("blur", mostrar);
    document.getElementById("seccion").addEventListener("change", mostrar);
    document.getElementById("taparTodo").addEventListener("click",salirMapa);
    const fetchBusc = fetch(url);
    fetchBusc
        .then(res => {
            return res.json();
        })
        .then(respuesta => {
            fallas = respuesta;

            primerMostrar();
        });
}

function primerMostrar() {
    secciones = [];
    seccionesI = [];
    secciones.push("Todas");
    seccionesI.push("Todas");
    const content = document.querySelector("content");
    fallas.features.forEach(element => {
        if (!secciones.includes(element.properties.seccion))
            secciones.push(element.properties.seccion);
        if (!seccionesI.includes(element.properties.seccion_i)) {
            seccionesI.push(element.properties.seccion_i);
        }
    });
    seccionesI.sort(function(a,b){
      //return false;
      if(a=="Todas") return -1;
      if(b=="Todas") return 1;
      if(a=="E") return -1;
      if(b=="E") return 1;
      if(a=="FC") return 1;
      if(b=="FC") return -1;
      return a-b;
    });
    secciones.sort(function(a,b){
      //return false;
      if(a=="Todas") return -1;
      if(b=="Todas") return 1;
      if(a=="E") return -1;
      if(b=="E") return 1;
      if(a=="FC") return 1;
      if(b=="FC") return -1;
      return a[0]-b[0];
    });
    cambiaCategoria();
    mostrar();
}

function cambiaCategoria() {
    if (document.getElementById("principal").checked) {
        sections(secciones);
    } else {
        sections(seccionesI);
    }
    mostrar();
}

function mostrar() {
    const content = document.querySelector("content");
    content.innerHTML = "";
    fallas.features.filter(filtro).forEach(element => {
        if (document.getElementById("principal").checked) {
            let div = document.createElement("div");
            div.classList.add("falla");
            let img = document.createElement("img");
            img.src = element.properties.boceto;
            div.appendChild(img);
            let nombre = document.createElement("p");
            nombre.innerText = element.properties.nombre;
            let boton = document.createElement("button");
            boton.coordenadas= element.geometry.coordinates;
            boton.addEventListener("click", crearCoordenadas);
            boton.innerText="Mostrar Ubicación";
            boton.classList.add("botones");
            div.appendChild(boton);
            div.appendChild(nombre);
            content.appendChild(div);
        } else {
            let div = document.createElement("div");
            div.classList.add("falla");
            let img = document.createElement("img");
            img.src = element.properties.boceto_i;
            div.appendChild(img);
            let nombre = document.createElement("p");
            nombre.innerText = element.properties.nombre;
            let boton = document.createElement("button");
            boton.coordenadas= element.geometry.coordinates;
            boton.addEventListener("click", crearCoordenadas);
            boton.innerText="Mostrar Ubicación";
            boton.classList.add("botones");
            div.appendChild(boton);
            div.appendChild(nombre);
            content.appendChild(div);
        }
    });
}

function filtro(falla) {
    // return true;
    if (isNaN(document.getElementById("desde").value)) return true;
    if (isNaN(document.getElementById("hasta").value)) return true;
    if (document.getElementById("principal").checked) {
        if (parseInt(document.getElementById("desde").value) > parseInt(falla.properties.anyo_fundacion))
            return false;
        if (parseInt(document.getElementById("hasta").value) < falla.properties.anyo_fundacion)
            return false;
    } else {
        if (parseInt(document.getElementById("desde").value) > falla.properties.anyo_fundacion_i)
            return false;
        if (parseInt(document.getElementById("hasta").value) < falla.properties.anyo_fundacion_i)
            return false;
    }
    if(document.getElementById("principal").checked){
      if (falla.properties.seccion != document.getElementById("seccion").value
       && document.getElementById("seccion").value != "Todas") return false;
    }else{
      if (falla.properties.seccion_i != document.getElementById("seccion").value
       && document.getElementById("seccion").value != "Todas") return false;
    }
    
        
    return true;
}

function sections(secciones) {
    let select = document.getElementById("seccion");
    select.innerText = "";
    secciones.forEach(seccion => {
        let opcion = document.createElement("option");
        opcion.value = seccion;
        opcion.innerText = traductor[seccion];
        select.appendChild(opcion);
    });
}