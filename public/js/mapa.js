var mapa, marker;

function crearMapa() {
    mapa = L.map('mapa').setView([0, 0], 1);
    marker = L.marker([0, 0]).addTo(mapa);

    L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=NVlvBbTlvbFWP7KKrFmF', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    }).addTo(mapa);


}

function coordenadas(coordenadas) {
    let primero = "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs";
    let segundo = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

    coordenadas = proj4(primero, segundo, coordenadas);
    coordenadas = [coordenadas[1], coordenadas[0]];
    mapa.setView(coordenadas, 16);

    if (marker) {
        mapa.removeLayer(marker);
    }
    marker = L.marker(coordenadas).addTo(mapa);
}

function crearCoordenadas() {
    coordenadas(this.coordenadas);
    document.getElementById("taparTodo").style.display = "block";
    //   document.getElementById("mapa").style.display="block";
    document.getElementById("mapa").style.opacity = 1;
    document.getElementById("mapa").style.zIndex = 2;
    document.querySelector("body").style.overflow = "hidden";
}

function salirMapa() {
    document.getElementById("taparTodo").style.display = "none";
    // document.getElementById("mapa").style.display="none";
    document.getElementById("mapa").style.zIndex = -2;
    document.getElementById("mapa").style.opacity = 0;
    document.querySelector("body").style.overflow = "scroll";
}