function estrellitasPorEncima(ev){
    const valorado = this.idPuntuacion!=undefined;
    let puntuacion = Math.floor((ev.layerX*10)/this.clientWidth)+1;
    this.children[0].style.width=puntuacion*10+"%";
    let datos= {};
    datos.idFalla=this.idFalla;
    datos.puntuacion=puntuacion/2;
    datos.idPuntuacion=this.idPuntuacion;
    datos.ip=ip;
    if(!valorado)valolar(datos,this);
    else editatValoracion(datos,this);
}

function valolar(datos, estrellas){
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
            estrellas.idPuntuacion=respuesta._id;
            console.log(estrellas);
            datos.idPuntuacion=respuesta._id;
            actualizarFalla(datos);
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
            return res.json();
        })
        .then(respuesta => {
            console.log(respuesta);
            estrellas.idPuntuacion=respuesta._id;
            console.log(estrellas);
            datos.idPuntuacion=respuesta._id;
            actualizarFalla(datos);
        });
}

function actualizarFalla(datos){
    let falla = fallas.features.filter(falla=> {return datos.idFalla==falla.properties.id})[0]
    falla.idPuntuacion=datos.idPuntuacion;
    falla.puntuacion=datos.puntuacion;
}