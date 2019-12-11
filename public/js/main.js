window.onload = init;
var secciones, seccionesI, primera, traductor;
const url =
    "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";
var fallas;

function init() {
    traductor();
    primera = true;
    primeraI = true;
    document.querySelectorAll(".radio").forEach(radio => radio.addEventListener("change", cambiaCategoria));
    document.getElementById("desde").addEventListener("blur", mostrar);
    document.getElementById("hasta").addEventListener("blur", mostrar);
    document.getElementById("seccion").addEventListener("change", mostrar);
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
        if (!seccionesI.includes(element.properties.seccion_i) && primeraI) {
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

function traductor() {
    traductor = [];
    traductor["1A"] = "Primera A";
    traductor["1B"] = "Primera B";
    traductor["2A"] = "Segunda A";
    traductor["2B"] = "Segunda B";
    traductor["3A"] = "Tercera A";
    traductor["3B"] = "Tercera B";
    traductor["3C"] = "Tercera C";
    traductor["4A"] = "Cuarta A";
    traductor["4B"] = "Cuarta B";
    traductor["4C"] = "Cuarta C";
    traductor["5A"] = "Quinta A";
    traductor["5B"] = "Quinta B";
    traductor["5C"] = "Quinta C";
    traductor["6A"] = "Sexta A";
    traductor["6B"] = "Sexta B";
    traductor["6C"] = "Sexta C";
    traductor["7A"] = "Septima A";
    traductor["7B"] = "Septima B";
    traductor["7C"] = "Septima C";
    traductor["8A"] = "Octava A";
    traductor["8B"] = "Octava B";
    traductor["8C"] = "Octava C";
    traductor["E"] = "Especial";
    traductor["FC"] = "Fuera de Concurso";
    traductor["Todas"] = "Todas";
    traductor["1"] = "1 Primera";
    traductor["2"] = "2 Segunda";
    traductor["3"] = "3 Tercera";
    traductor["4"] = "4 Cuarta";
    traductor["5"] = "5 Quinta";
    traductor["6"] = "6 Sexta";
    traductor["7"] = "7 Séptima";
    traductor["8"] = "8 Octava";
    traductor["9"] = "9 Novena";
    traductor["10"] = "10 Décima";
    traductor["11"] = "11 Onceava";
    traductor["12"] = "12 Doceava";
    traductor["13"] = "13 Treceava";
    traductor["14"] = "14 Catorceava";
    traductor["15"] = "15 Quinceava";
    traductor["16"] = "16 Décimo Sexta";
    traductor["17"] = "17 Décimo Séptima";
    traductor["18"] = "18 Décimo Octava";
    traductor["19"] = "19 Décimo Novena";
    traductor["20"] = "20 Vigésima";
    traductor["21"] = "21 Vigésima Primera";
    traductor["22"] = "22 Vigésima Segunda";
}