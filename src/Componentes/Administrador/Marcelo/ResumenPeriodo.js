import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ResumenPeriodo = () => {
    const today = new Date().toISOString().split('T')[0];

    // Estado para las fechas y el periodo seleccionado
    const [fechaInicio, setFechaInicio] = useState(today);
    const [fechaFin, setFechaFin] = useState(today);

    // Manejador de clic en el botón de búsqueda
    const handleBuscarClick = () => {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);

        // Verificar si la fecha de inicio es posterior a la fecha de fin
        if (inicio > fin) {
            alert('La fecha de inicio no puede ser posterior a la fecha de fin.');
            return;
        }

        console.log('Fecha de inicio:', fechaInicio);
        console.log('Fecha fin:', fechaFin);
    };

    return (
        <Box>
            {/* Título */}
            <Typography variant="h6">Seleccionar Período</Typography>
            {/* Selector de fecha de inicio */}
            <TextField
                id="fecha-inicio"
                label="Fecha de Inicio"
                type="date"
                value={fechaInicio}
                onChange={({ target }) => setFechaInicio(target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
            />
            {/* Selector de fecha de fin */}
            <TextField
                id="fecha-fin"
                label="Fecha Fin"
                type="date"
                value={fechaFin}
                onChange={({ target }) => setFechaFin(target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
            />
            {/* Botón de búsqueda */}
            <Button onClick={handleBuscarClick} variant="contained" color="primary">
                Buscar
            </Button>
        </Box>
    );
};

export default ResumenPeriodo;
