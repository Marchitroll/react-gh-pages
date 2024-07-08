import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function Baja({
    className
}) {

    const navigate = useNavigate();
    const handleScrollToNuevos = () => {
        navigate('/');
        setTimeout(() => {
            const nuevosSection = document.getElementById('nuevos-section');
            nuevosSection.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Espera 100 milisegundos antes de hacer scroll
    };

    const handleScrollToOfertas = () => {
        navigate('/');
        setTimeout(() => {
            const nuevosSection = document.getElementById('ofertas-section');
            nuevosSection.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Espera 100 milisegundos antes de hacer scroll
    };

    const handleScrollToVendidos = () => {
        navigate('/');
        setTimeout(() => {
            const nuevosSection = document.getElementById('vendidos-section');
            nuevosSection.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Espera 100 milisegundos antes de hacer scroll
    };

    const handleYoutube = () => {
        window.location.href = "https://www.youtube.com/watch?v=Aj0DIgn88o4&t=333s";
    };

    const handleTwitter = () => {
        window.location.href = "https://x.com/honkaistarrail?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
    };

    const handleInstagram = () => {
        window.location.href = "https://www.instagram.com/genshinimpact/?hl=es"
    };

    const handleFacebook = () => {
        window.location.href = "https://www.facebook.com/eevazu/"
    };

    return (
        <footer>
            <Box
                sx={{
                    display: 'flex',
                    backgroundColor: "rgb(35, 47, 62)",
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    py: "5rem",
                    px: "5rem",
                }}
            >
                <Box>
                    <Typography sx={{ fontWeight: 'bold', color: "#FFFFFF" }}>LA TIENDITA DEL ABUELO</Typography>
                    <Typography sx={{ color: "#FFFFFF" }}>2010-2020</Typography>
                    <Typography sx={{ color: "#FFFFFF" }}>Privacy - Terms</Typography>
                </Box>

                <Box>
                    <Typography sx={{ fontWeight: 'bold', color: "#FFFFFF" }}>Cuenta</Typography>
                    <Typography sx={{ textDecoration: 'none', color: "#FFFFFF" }} component={Link} to="/Login">Login</Typography>
                    <br />
                    <Typography sx={{ textDecoration: 'none', color: "#FFFFFF" }} component={Link} to="/CrearCuenta">Registro</Typography>
                    <br />
                    <Typography sx={{ textDecoration: 'none', color: "#FFFFFF" }} component={Link} to="/parte1">Carrito</Typography>
                </Box>

                <Box>
                    <Typography sx={{ fontWeight: 'bold', color: "#FFFFFF" }}>Productos</Typography>
                    <Typography onClick={handleScrollToVendidos} sx={{ color: "#FFFFFF" }}>Más vendidos</Typography>

                    <Typography onClick={handleScrollToNuevos} sx={{ color: "#FFFFFF" }}>Nuevos</Typography>

                    <Typography onClick={handleScrollToOfertas} sx={{ color: "#FFFFFF" }}>Ofertas</Typography>
                </Box>

                <Box>
                    <Typography sx={{ fontWeight: 'bold', color: "#FFFFFF" }}>Ayuda</Typography>
                    <Typography sx={{ color: "#FFFFFF" }}>Acerca de Nosotros</Typography>
                    <Typography sx={{ color: "#FFFFFF" }}>Política de Envío</Typography>
                    <Typography sx={{ color: "#FFFFFF" }}> FAQ</Typography>
                </Box>

                <Box>
                    <IconButton onClick={handleFacebook} sx={{ color: "#FFFFFF" }}>
                        <FacebookIcon />
                    </IconButton>
                    <IconButton onClick={handleInstagram} sx={{ color: "#FFFFFF" }}>
                        <InstagramIcon />
                    </IconButton>
                    <IconButton onClick={handleTwitter} sx={{ color: "#FFFFFF" }}>
                        <TwitterIcon />
                    </IconButton>
                    <IconButton onClick={handleYoutube} sx={{ color: "#FFFFFF" }}>
                        <YouTubeIcon />
                    </IconButton>
                </Box>
            </Box>
        </footer>
    );
}

export default Baja;
