import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ResumenPeriodo = ({ setFechaInicio, setFechaFin, style }) => {
    const today = new Date().toISOString().split('T')[0];

    const [inicio, setInicio] = useState(today);
    const [fin, setFin] = useState(today);

    const handleBuscarClick = () => {
        const fechaInicio = new Date(inicio);
        const fechaFin = new Date(fin);

        if (fechaInicio > fechaFin) {
            alert('La fecha de inicio no puede ser posterior a la fecha de fin.');
            return;
        }

        sessionStorage.setItem('fechaInicio', inicio);
        sessionStorage.setItem('fechaFin', fin);

        setFechaInicio(inicio);
        setFechaFin(fin);
    };

    return (
        <Box style={style}>
            <Typography variant="h6">Seleccionar Período</Typography>
            <TextField
                id="fecha-inicio"
                label="Fecha de Inicio"
                type="date"
                value={inicio}
                onChange={({ target }) => setInicio(target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
            />
            <TextField
                id="fecha-fin"
                label="Fecha Fin"
                type="date"
                value={fin}
                onChange={({ target }) => setFin(target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
            />
            <Button onClick={handleBuscarClick} variant="contained" color="primary">
                Buscar
            </Button>
        </Box>
    );
};

export default ResumenPeriodo;
