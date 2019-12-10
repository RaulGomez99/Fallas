window.onload=init;
const url = "http://mapas.valencia.es/lanzadera/opendata/TRA_REGULADORES/JSON";

function init(){
    document.getElementById("botonBuscar").addEventListener("click", buscar);
}
var a;

function buscar(){
    const fetchBusc = fetch(url);

    fetchBusc.then(res =>{
        return res.json();
    }).then(respuesta =>  {
        
        let tabla = document.createElement("table");
        let th = document.createElement("tr");
        th.innerHTML=`<th>Descripción</th><th>Coordenadas</th>`;
        tabla.appendChild(th);
        respuesta.features.filter(filtro).forEach(element => {
            let tr = document.createElement("tr");
            tr.innerHTML=`<td>${element.properties.descripcion}</td><td>${element.geometry.coordinates[0]}--${element.geometry.coordinates[1]}</td>`;
            console.log(element);
           tabla.appendChild(tr);
        });
        document.querySelector("content").innerHTML="";
        document.querySelector("content").appendChild(tabla);
    })
}

function filtro(elemento){
    let letra=document.querySelector(`input[type="text"]`).value.toUpperCase();
    return elemento.properties.descripcion.startsWith(letra);
}