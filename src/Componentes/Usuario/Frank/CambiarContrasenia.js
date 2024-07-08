import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, Typography, Button } from '@mui/material';

const getUsuarioEnSesion = () => {
    const usuarioEnSesion = JSON.parse(localStorage.getItem('usuarioEnSesion'));
    return usuarioEnSesion ? usuarioEnSesion.id : null;
};

const getUsuarioData = (id) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.find(usuario => usuario.id === id) || {};
};

const updateUsuarioPassword = (id, nuevaContrasenia) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === id);
    if (usuarioIndex !== -1) {
        usuarios[usuarioIndex].contrasenia = nuevaContrasenia;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
};

const CambiarContrasenia = () => {
    const [contraActual, setContAct] = useState('');
    const [contraNueva, setContNue] = useState('');
    const [contraRepetir, setContRep] = useState('');
    const [errores, setErrores] = useState({ contraActual: false, contraNueva: false, contraRepetir: false });

    const [usuarioActual, setUsuarioActual] = useState({});

    useEffect(() => {
        const usuarioId = getUsuarioEnSesion();
        if (usuarioId) {
            const usuario = getUsuarioData(usuarioId);
            setUsuarioActual(usuario);
        }
    }, []);

    const handleChange = (setter) => (event) => {
        setter(event.target.value);
        setErrores({ ...errores, [event.target.name]: false });
    };

    const handlePassword = (event) => {
        event.preventDefault();

        const esVacia = (str) => !str.trim();
        const nuevaErrores = {
            contraActual: esVacia(contraActual),
            contraNueva: esVacia(contraNueva),
            contraRepetir: esVacia(contraRepetir)
        };
        setErrores(nuevaErrores);

        if (Object.values(nuevaErrores).every(error => !error)) {
            const verif01 = usuarioActual.contrasenia === contraActual;
            const verif02 = contraNueva === contraRepetir;

            let msgAlert = "";

            if (verif01 && verif02) {
                msgAlert = "♦ Contraseña actualizada:\n- La contraseña actual ingresada es correcta\n- La contraseña nueva y la repetida coinciden";
                alert(msgAlert + ` \n\n• Nueva contraseña: ${contraNueva}`);

                // Actualizar la contraseña en el localStorage
                updateUsuarioPassword(usuarioActual.id, contraNueva);
            } else {
                if (!verif01) {
                    msgAlert += "\n- La contraseña actual ingresada no es correcta";
                }
                if (!verif02) {
                    msgAlert += "\n- La contraseña nueva y la repetida no coinciden";
                }
                alert(`♦ Contraseña no actualizada: ${msgAlert}`);
            }
        }

        // Limpiar los campos después de la actualización
        setContAct('');
        setContNue('');
        setContRep('');
    };

    return (
        <Container>
            <Typography variant="body1" fontWeight="bold" sx={{ px: 2, py: 1, m: 2, backgroundColor: 'lightgrey', border: '4px solid grey' }}>
                Cambiar contraseña
            </Typography>

            <Box component="form" onSubmit={handlePassword} noValidate sx={{ mt: 4, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <TextField 
                    type="password" 
                    required 
                    fullWidth 
                    id="cont_actual" 
                    label="Contraseña actual" 
                    name="contraActual"
                    autoFocus 
                    value={contraActual} 
                    error={errores.contraActual} 
                    helperText={errores.contraActual ? 'Este campo es requerido' : ''} 
                    onChange={handleChange(setContAct)} 
                    sx={{ my: 2, maxWidth: 400 }} 
                />

                <TextField 
                    type="password" 
                    required 
                    fullWidth 
                    id="cont_nueva" 
                    label="Contraseña nueva" 
                    name="contraNueva"
                    value={contraNueva} 
                    error={errores.contraNueva} 
                    helperText={errores.contraNueva ? 'Este campo es requerido' : ''} 
                    onChange={handleChange(setContNue)} 
                    sx={{ my: 2, maxWidth: 400 }} 
                />

                <TextField 
                    type="password" 
                    required 
                    fullWidth 
                    id="cont_repetir" 
                    label="Repetir contraseña nueva" 
                    name="contraRepetir"
                    value={contraRepetir} 
                    error={errores.contraRepetir} 
                    helperText={errores.contraRepetir ? 'Este campo es requerido' : ''} 
                    onChange={handleChange(setContRep)} 
                    sx={{ my: 2, maxWidth: 400 }} 
                />

                <Button 
                    type="submit" 
                    variant="contained" 
                    sx={{ px: 4, py: 2, m: 4, fontSize: '16px' }}
                >
                    Actualizar contraseña
                </Button>
            </Box>
        </Container>
    );
};

export default CambiarContrasenia;
