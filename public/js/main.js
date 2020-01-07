window.onload = init;
var secciones, seccionesI, minimo, minimoI, maximo, maximoI, traductor, sectores;
const url = "https://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";
var fallas,ip;


function init() {
    fetch("https://api.ipify.org/?format=json").then(res=> {return res.json()}).then(resp=>{ip=resp.ip});
    crearMapa();
    traductor();
    window.addEventListener("resize", function () { waterfall(document.querySelector("content")); }); 
    document.querySelectorAll(".radio").forEach(radio => radio.addEventListener("change", cambiaCategoria));
    document.getElementById("desde").addEventListener("change", mostrar);
    document.getElementById("hasta").addEventListener("change", mostrar);
    document.getElementById("sector").addEventListener("change", mostrar);
    document.getElementById("seccion").addEventListener("change", mostrar);
    document.getElementById("nombre").addEventListener("change", mostrar);
    document.getElementById("anyoBoceto").addEventListener("change",mostrar);
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
    minimo=2019;
    minimoI=2019;
    maximo=0;
    maximoI=0;
    secciones = [];
    seccionesI = [];
    sectores=[];
    secciones.push("Todas");
    seccionesI.push("Todas");
    const content = document.querySelector("content");
    fallas.features.forEach(element => {
        // console.log(element.properties.id+" "+ip)
        fetch("/puntuaciones/"+element.properties.id+"/"+ip).then(res=> {return res.json()}).then(
            resp=>{
                // console.log(resp);
                element.puntuacion=resp.puntuacion;
                element.idPuntuacion=resp._id;
        });
        if (!secciones.includes(element.properties.seccion)){
            secciones.push(element.properties.seccion);
        }
        if (!seccionesI.includes(element.properties.seccion_i)) {
            seccionesI.push(element.properties.seccion_i);
        }

        if(!sectores.includes(element.properties.sector) && element.properties.sector!=""){
            sectores.push(element.properties.sector);
        }
        
        if(element.properties.anyo_fundacion < minimo && element.properties.anyo_fundacion!=""){
            minimo = element.properties.anyo_fundacion;
        }
        if(element.properties.anyo_fundacion > maximo && element.properties.anyo_fundacion!=""){
            maximo = element.properties.anyo_fundacion;
        }
        if(element.properties.anyo_fundacion_i < minimoI && element.properties.anyo_fundacion!=""){
            minimoI = element.properties.anyo_fundacion_i;
        }
        if(element.properties.anyo_fundacion_i > maximoI && element.properties.anyo_fundacion!=""){
            maximoI = element.properties.anyo_fundacion_i;
        }
    });

    
    seccionesI.sort(function(a,b){
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
      if(a[0]-b[0]!=0)return a[0]-b[0];
      if(a[1]=="A") return -1;
      if(b[1]=="A") return 1;
      if(a[1]=="B") return -1;
      if(b[1]=="B") return 1;
      if(a[1]=="C") return 1;
      if(b[1]=="C") return -1;
    });
    sectores.sort();
    sectores.splice(0,0,"Todos");
    sectors(sectores);
    cambiaCategoria();
}

function cambiaCategoria() {
    if (document.getElementById("principal").checked) {
        sections(secciones);
        document.getElementById("desde").min=minimo;
        document.getElementById("desde").max=maximo;
        document.getElementById("hasta").min=minimo;
        document.getElementById("hasta").max=maximo;
        document.getElementById("desde").value=minimo;
        document.getElementById("hasta").value=maximo;
    } else {
        sections(seccionesI);
        document.getElementById("desde").min=minimoI;
        document.getElementById("desde").max=maximoI;
        document.getElementById("hasta").min=minimoI;
        document.getElementById("hasta").max=maximoI;
        document.getElementById("desde").value=minimoI;
        document.getElementById("hasta").value=maximoI;
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
            let src = element.properties.boceto;
            //Cambia el año del boceto
            img.src = src.substring(0,src.indexOf("2019"))+document.getElementById("anyoBoceto").value+src.substring(src.indexOf("2019")+4);
            div.appendChild(img);
            let nombre = document.createElement("p");
            nombre.innerText = element.properties.nombre;
            let artista = document.createElement("p");
            if(element.properties.artista!="")artista.innerText = element.properties.artista;
            else artista.innerText = "Anonimo";
            let boton = document.createElement("button");
            boton.coordenadas= element.geometry.coordinates;
            boton.addEventListener("click", crearCoordenadas);
            boton.innerText="Mostrar Ubicación";
            boton.classList.add("botones");
            let estrellas = document.createElement("div");
            estrellas.classList.add("stars-outer");
            estrellas.idFalla=element.properties.id;
            estrellas.idPuntuacion=element.idPuntuacion;
            let estrellasDentro = document.createElement("div");
            estrellasDentro.classList.add("stars-inner");
            if(element.puntuacion!=-1){estrellasDentro.style.width=element.puntuacion*20+"%";};
            estrellas.appendChild(estrellasDentro);
            estrellas.addEventListener("click", estrellitasPorEncima);
            div.style.gridRowEnd=(Math.round(img.height*0.8/100))+" span";
            div.appendChild(boton);
            div.appendChild(artista);
            div.appendChild(nombre);
            div.appendChild(document.createElement("br"));
            div.appendChild(estrellas);
            content.appendChild(div);
        } else {
            let div = document.createElement("div");
            div.classList.add("falla");
            let img = document.createElement("img");
            let src = element.properties.boceto_i;
            //Cambia el año del boceto
            img.src = src.substring(0,src.indexOf("2019"))+document.getElementById("anyoBoceto").value+src.substring(src.indexOf("2019")+4);
            if(img.height>=550) div.classList.add("imgAlta");
            if(img.height>=450 && img.height<550) div.classList.add("imgMedia");
            div.appendChild(img);
            let nombre = document.createElement("p");
            nombre.innerText = element.properties.nombre;
            let artista = document.createElement("p");
            if(element.properties.artista_i!="")artista.innerText = element.properties.artista_i;
            else artista.innerText = "Anonimo";
            let boton = document.createElement("button");
            boton.coordenadas= element.geometry.coordinates;
            boton.addEventListener("click", crearCoordenadas);
            boton.innerText="Mostrar Ubicación";
            boton.classList.add("botones");

            let estrellas = document.createElement("div");
            estrellas.classList.add("stars-outer");
            estrellas.idFalla=element.properties.id;
            estrellas.idPuntuacion=element.idPuntuacion;
            let estrellasDentro = document.createElement("div");
            estrellasDentro.classList.add("stars-inner");
            if(element.puntuacion!=-1){estrellasDentro.style.width=element.puntuacion*20+"%";};
            estrellas.appendChild(estrellasDentro);
            estrellas.addEventListener("click", estrellitasPorEncima);

            div.appendChild(boton);
            div.appendChild(artista);
            div.appendChild(nombre);
            div.appendChild(document.createElement("br"));
            div.appendChild(estrellas);
            content.appendChild(div);
        }
        
    });
    var actualizarGrid = setInterval(()=>waterfall(content), 100);
    setTimeout(()=>window.clearInterval(actualizarGrid),15000);
}

function filtro(falla) {
    // return true;
  /*  if (isNaN(document.getElementById("desde").value)) return true;
    if (isNaN(document.getElementById("hasta").value)) return true;*/
    if(falla.properties.nombre.toUpperCase().
        indexOf(document.getElementById("nombre").value.toUpperCase())==-1 && 
        document.getElementById("nombre").value!="") 
            return false;
    if (document.getElementById("principal").checked) {
        if (parseInt(document.getElementById("desde").value) > parseInt(falla.properties.anyo_fundacion))
            return false;
        if (parseInt(document.getElementById("hasta").value) < falla.properties.anyo_fundacion)
            return false;
        if(document.getElementById("anyoBoceto").value < falla.properties.anyo_fundacion)
            return false;
    } else {
        if (parseInt(document.getElementById("desde").value) > falla.properties.anyo_fundacion_i)
            return false;
        if (parseInt(document.getElementById("hasta").value) < falla.properties.anyo_fundacion_i)
            return false;
        if(document.getElementById("anyoBoceto").value < falla.properties.anyo_fundacion_i)
            return false;
    }
    if(document.getElementById("principal").checked){
      if (falla.properties.seccion != document.getElementById("seccion").value
       && document.getElementById("seccion").value != "Todas") return false;
    }else{
      if (falla.properties.seccion_i != document.getElementById("seccion").value
       && document.getElementById("seccion").value != "Todas") return false;
    }
    if(falla.properties.sector != document.getElementById("sector").value
    && document.getElementById("sector").value != "Todos") return false;
    
        
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

function sectors(secciones) {
    let select = document.getElementById("sector");
    select.innerText = "";
    secciones.forEach(seccion => {
        let opcion = document.createElement("option");
        opcion.value = seccion;
        opcion.innerText = seccion;
        select.appendChild(opcion);
    });
}