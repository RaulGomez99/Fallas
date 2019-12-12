const urlAjax = "localhost:3000/puntuaciones";
function estrellitasPorEncima(ev){
    let puntuacion = Math.floor((ev.layerX*10)/this.clientWidth)+1;
    this.children[0].style.width=puntuacion*10+"%";
    console.log("B");
    const fetchBusc = fetch(url,{
        method: 'POST', 
        body: {
            idFalla:this.idFalla,
            puntuacion:puntuacion
        }, 
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