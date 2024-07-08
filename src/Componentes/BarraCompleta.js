import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import TemaButton from "../theme/TemaButton";
import { useNavigate } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import { Link } from 'react-router-dom';

function BarraCompleta() {
    const navigate = useNavigate();
    const [, setTema] = useLocalStorage('tema_preferido');

    // Cambia el tema entre "light" y "dark"
    const handleThemeChange = () => {
        setTema(prev => prev === "light" ? "dark" : "light");
    };

    // Navega a la página de checkout
    const handleCheckout = () => {
        navigate('/parte1');
    };

    // Navega a la página principal del usuario
    const handleCuenta = () => {
        const usuarioEnSesion = JSON.parse(localStorage.getItem("usuarioEnSesion")) || { id: 0 };
        if (usuarioEnSesion.id === 0) {
            navigate("/login");
        } else {
            navigate(`/PaginaPrincipalUsuario/${usuarioEnSesion.id}`);
        }
    };

    // Navega a la página principal y desplaza la vista a la sección "Nuevos"
    const handleScrollToNuevos = () => {
        navigate('/');
        setTimeout(() => {
            const nuevosSection = document.getElementById('nuevos-section');
            nuevosSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // Navega a la página principal y desplaza la vista a la sección "Ofertas"
    const handleScrollToOfertas = () => {
        navigate('/');
        setTimeout(() => {
            const nuevosSection = document.getElementById('ofertas-section');
            nuevosSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // Navega a la página principal y desplaza la vista a la sección "Más Vendidos"
    const handleScrollToVendidos = () => {
        navigate('/');
        setTimeout(() => {
            const nuevosSection = document.getElementById('vendidos-section');
            nuevosSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // Redirige a una URL externa para la ayuda
    const handleAyuda = () => {
        window.location.href = "https://i.pinimg.com/originals/44/b6/7d/44b67d5e479d46f672031fb9ee0229cf.gif";
    };

    // Maneja el cierre de sesión
    const handleLogout = () => {
        localStorage.setItem("usuarioEnSesion", JSON.stringify({ id: 0 }));
        navigate('/');
    };

    return (
        <AppBar position='fixed' sx={{ backgroundColor: "rgb(19, 25, 33)" }}>
            <Container>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MenuItem>
                            <Typography variant='h6' sx={{ color: "white", fontWeight: "bold", textDecoration: 'none', '&:hover': { textDecoration: 'none' } }} component={Link} to="/">
                                TIENDA
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <Typography variant='h6' sx={{ color: "white" }} onClick={handleScrollToVendidos}>
                                Más vendidos
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <Typography variant='h6' sx={{ color: "white", cursor: 'pointer' }} onClick={handleScrollToNuevos}>
                                Nuevos
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <Typography variant='h6' sx={{ color: "white" }} onClick={handleScrollToOfertas}>
                                Ofertas
                            </Typography>
                        </MenuItem>
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
                        <MenuItem>
                            <Typography variant='h6' sx={{ color: "white" }} onClick={handleAyuda}>
                                Ayuda
                            </Typography>
                        </MenuItem>
                        <Button sx={{ backgroundColor: "#000000", borderColor: "#000000", color: "white", marginLeft: 2 }} onClick={handleLogout}>
                            Cerrar sesión
                        </Button>
                        <Button sx={{ backgroundColor: "#000000", borderColor: "#000000", color: "white", marginLeft: 2 }} onClick={handleCuenta}>
                            Mi cuenta
                        </Button>
                        
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default BarraCompleta;
