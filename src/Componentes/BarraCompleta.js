import React, { useState } from 'react';
import { AppBar, Box, Button, Container, IconButton, MenuItem, Toolbar, Typography } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import TemaButton from "../theme/TemaButton";
import MasterPassword from '../Componentes/Administrador/Marcelo/reto.jsx'; // Ajusta la ruta según sea necesario

const sections = [
    { label: 'Más vendidos', id: 'vendidos-section' },
    { label: 'Nuevos', id: 'nuevos-section' },
    { label: 'Ofertas', id: 'ofertas-section' },
];

function BarraCompleta() {
    const [showMasterPassword, setShowMasterPassword] = useState(false);
    const navigate = useNavigate();
    const [, setTema] = useLocalStorage('tema_preferido');

    const handleThemeChange = () => setTema(prev => prev === "light" ? "dark" : "light");
    const handleCheckout = () => navigate('/parte1');
    const handleCuenta = () => {
        const { id } = JSON.parse(localStorage.getItem("usuarioEnSesion")) || { id: 0 };
        navigate(id === 0 ? "/login" : `/PaginaPrincipalUsuario/${id}`);
    };

    const handleScroll = (id) => {
        navigate('/');
        setTimeout(() => document.getElementById(id).scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const handleLogout = () => {
        localStorage.setItem("usuarioEnSesion", JSON.stringify({ id: 0 }));
        navigate('/');
    };

    const handleSuccess = () => {
        setShowMasterPassword(false);
    };

    if (showMasterPassword) {
        return <MasterPassword onSuccess={handleSuccess} />;
    }

    return (
        <AppBar position='fixed' sx={{ backgroundColor: "rgb(19, 25, 33)" }}>
            <Container>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MenuItem component={Link} to="/" sx={{ color: "white", fontWeight: "bold" }}>
                            <Typography variant='h6'>TIENDA</Typography>
                        </MenuItem>
                        {sections.map(({ label, id }) => (
                            <MenuItem key={id} onClick={() => handleScroll(id)} sx={{ color: "white" }}>
                                <Typography variant='h6'>{label}</Typography>
                            </MenuItem>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <MenuItem onClick={handleCheckout}>
                            <IconButton sx={{ color: "white" }}>
                                <ShoppingCartIcon />
                            </IconButton>
                        </MenuItem>
                        <MenuItem onClick={handleThemeChange}>
                            <IconButton sx={{ color: "white" }}>
                                <TemaButton />
                            </IconButton>
                        </MenuItem>
                        <Button sx={{ backgroundColor: "#000", color: "white", ml: 2 }} onClick={handleLogout}>
                            Cerrar sesión
                        </Button>
                        <Button sx={{ backgroundColor: "#000", color: "white", ml: 2 }} onClick={handleCuenta}>
                            Mi cuenta
                        </Button>
                        <Button sx={{ backgroundColor: "#000", color: "white", ml: 2 }} onClick={() => setShowMasterPassword(true)}>
                            Admin reto
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default BarraCompleta;
