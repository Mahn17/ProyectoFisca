// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors()); // Permite que React haga peticiones al backend

// Configuración de conexión
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "HolaMundo22",
    database: "fiscalia"
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) throw err;
    console.log("Conectado a MySQL");
});

// Endpoint para obtener datos
app.get('/api/datos', (req, res) => {
    const sql = "SELECT municipio, noMuertos FROM tu_tabla";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results); // Devuelve los resultados en formato JSON
    });
});

// Inicia el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
