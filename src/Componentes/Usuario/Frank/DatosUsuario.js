import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, Typography, Button } from '@mui/material';

function DatosUsuario() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [idUsuario, setIdUsuario] = useState(null);

    useEffect(() => {
        // Obtener el ID de usuario en sesión
        const usuarioEnSesion = JSON.parse(localStorage.getItem("usuarioEnSesion") || '{}');
        setIdUsuario(usuarioEnSesion.id || null);

        if (usuarioEnSesion.id) {
            // Obtener todos los usuarios del localStorage
            const usuarios = JSON.parse(localStorage.getItem("usuarios") || '[]');
            const usuarioActual = usuarios.find(usuario => usuario.id === usuarioEnSesion.id);

            if (usuarioActual) {
                setNombre(usuarioActual.nombre);
                setApellido(usuarioActual.apellido);
                setCorreo(usuarioActual.correo);
            }
        }
    }, []);

    const handleUpdateDatos = () => {
        if (!idUsuario) {
            alert('No se encontró un usuario en sesión.');
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios") || '[]');
        const usuarioIndex = usuarios.findIndex(usuario => usuario.id === idUsuario);

        if (usuarioIndex === -1) {
            alert('Usuario no encontrado.');
            return;
        }

        let msg_alert = "";
        let hasUpdates = false;

        // Obtener el usuario actual
        const usuarioActual = usuarios[usuarioIndex];

        // Actualizar los campos si no están vacíos
        if (nombre.trim() !== "") {
            usuarioActual.nombre = nombre;
            msg_alert += "\n- Nombre actualizado: " + nombre;
            hasUpdates = true;
        }
        if (apellido.trim() !== "") {
            usuarioActual.apellido = apellido;
            msg_alert += "\n- Apellido actualizado: " + apellido;
            hasUpdates = true;
        }
        if (correo.trim() !== "") {
            if (!/\S+@\S+\.\S+/.test(correo)) {
                alert('Correo no válido');
                return;
            }
            usuarioActual.correo = correo;
            msg_alert += "\n- Correo actualizado: " + correo;
            hasUpdates = true;
        }

        if (hasUpdates) {
            usuarios[usuarioIndex] = usuarioActual;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert(`♦ Valores actualizados:` + msg_alert);
            
            // Borrar los campos
            setNombre('');
            setApellido('');
            setCorreo('');
        } else {
            alert('No se ha actualizado ningún campo');
        }
    };

    return (
        <Container>
            <Typography variant="body1" fontWeight="bold" sx={{ px: 2, py: 1, m: 2, backgroundColor: 'lightgrey', border: '4px solid grey' }}>
                Datos de registro
            </Typography>

            <Box component="form" noValidate sx={{ mt: 4, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <TextField 
                    fullWidth 
                    id="nombre" 
                    label="Nombre" 
                    name="nombre" 
                    autoComplete="name" 
                    autoFocus 
                    value={nombre} 
                    onChange={e => setNombre(e.target.value)} 
                    sx={{ my: 2, maxWidth: 400 }} 
                />

                <TextField 
                    fullWidth 
                    id="apellido" 
                    label="Apellido" 
                    name="apellido" 
                    autoComplete="family-name" 
                    value={apellido} 
                    onChange={e => setApellido(e.target.value)} 
                    sx={{ my: 2, maxWidth: 400 }} 
                />

                <TextField 
                    required 
                    type="email" 
                    fullWidth 
                    id="correo" 
                    label="Correo" 
                    name="correo" 
                    autoComplete="email" 
                    value={correo} 
                    onChange={e => setCorreo(e.target.value)} 
                    sx={{ my: 2, maxWidth: 400 }} 
                />

                <Button 
                    type="button" 
                    variant="contained" 
                    sx={{ px: 8, py: 2, m: 4, fontSize: '16px' }} 
                    onClick={handleUpdateDatos}
                >
                    Actualizar datos
                </Button>
            </Box>
        </Container>
    );
}

export default DatosUsuario;
