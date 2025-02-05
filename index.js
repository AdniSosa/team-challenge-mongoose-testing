// Añadiremos nuestro servidor, conexión a la base de datos y uniremos el resto de la aplicación
const express = require('express');
const app =  express();
const PORT = 3000;

const dbConnection = require('./config/config');
const routes = require('./routes/posts');

app.use(express.json());

app.use('/', routes);

dbConnection();

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})

module.exports = app;