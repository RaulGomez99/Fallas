window.onload=init;
const url = "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";

function init(){
    document.getElementById("botonBuscar").addEventListener("click", buscar);
}
var a;

function buscar(){
    const fetchBusc = fetch(url);

    fetchBusc.then(res =>{
        return res.json();
    }).then(respuesta =>  {
        //respuesta.features.filter(filtro).forEach(element => {
            respuesta.features.forEach(element => {
            console.log(element);
        });
    })
}

function filtro(elemento){
    /*let letra=document.querySelector(`input[type="text"]`).value.toUpperCase();
    return elemento.properties.descripcion.startsWith(letra);*/
}