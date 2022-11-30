const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const bodyParser = require("body-parser");
let indexRoute = require('./routes/indexRoute');
let catalogoRoute = require('./routes/catalogoRoute');
let signInRoute = require('./routes/signInRoute');
let registerRoute = require('./routes/registerRoute');
let administrarRoute = require('./routes/administrarRoute');
let solicitarCotizacionRoute = require('./routes/solicitarCotizacionRoute');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + "/public"));

app.use('/', indexRoute);
app.use('/catalogo', catalogoRoute);
app.use('/signIn', signInRoute);
app.use('/register/', registerRoute);
app.use('/administrar/', administrarRoute);
app.use('/solicitarCotizacion/', solicitarCotizacionRoute);

app.listen(port, () => {
    console.log(`Escuchando en: http://localhost:${port}`);
});
