function estrellitasPorEncima(ev){
    const valorado = this.idPuntuacion!=undefined;
    console.log(this.idPuntuacion);
    let puntuacion = Math.floor((ev.layerX*10)/this.clientWidth)+1;
    this.children[0].style.width=puntuacion*10+"%";
    let datos= {};
    datos.idFalla=this.idFalla;
    datos.puntuacion=puntuacion/2;
    datos.idPuntuacion=this.idPuntuacion;
    if(!valorado)valolar(datos);
    else editatValoracion(datos,this);
}

function valolar(datos){
    console.log(datos);
    const fetchBusc = fetch("/puntuaciones",{
        method: 'POST', 
        body: JSON.stringify(datos), 
        headers:{
            'Content-Type': 'application/json'
        }
    });
    fetchBusc
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(respuesta => {
            console.log(respuesta);
        });
}

function editatValoracion(datos, estrellas){
    const fetchBusc = fetch("/puntuaciones/"+datos.idPuntuacion,{
        method: 'PUT', 
        body: JSON.stringify(datos), 
        headers:{
            'Content-Type': 'application/json'
        }
    });
    fetchBusc
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(respuesta => {
            console.log(respuesta);
        });
}

