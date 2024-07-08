const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3006;

app.use(bodyParser.json());
app.use(cors());

// Ruta para agregar datos en Datos.json
app.post('/add', (req, res) => {
    const { nombre, apellido, correo } = req.body;

    // Ruta al archivo JSON
    const filePath = path.join(__dirname, 'Datos.json');

    // Leer el archivo JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error leyendo el archivo JSON');
        }

        let jsonData = JSON.parse(data);

        // Obtener el último ID y generar un nuevo ID
        const ultimoID = jsonData.length > 0 ? jsonData[jsonData.length - 1].id : 0;
        const nuevoID = ultimoID + 1;

        // Crear un nuevo objeto con el ID generado
        const nuevoUsuario = { id: nuevoID, nombre, apellido, correo };
        
        // Agregar el nuevo usuario al arreglo
        jsonData.push(nuevoUsuario);

        // Escribir los datos actualizados en el archivo JSON
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Error escribiendo el archivo JSON');
            }
            res.send('Nuevo usuario agregado correctamente');
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
