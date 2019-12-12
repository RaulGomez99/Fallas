const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


// Nos conectaremos a la base de datos
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


// Conectando en si mismo
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log(" * Cargada y preparada");
}).catch(err => {
    console.log(" Algo ha pasado...saliendo : ", err);
    process.exit();
});



// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, 'public')));

// Escuchemos en un puerto
app.listen(port, () => {
    console.log("Estoy en http://localhost:" + port);
});

//Routes export
require('./app/routes/puntuacion.routes.js')(app);