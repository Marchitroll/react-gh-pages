import { Box, Container, Grid, Link, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import BarraDeNavegacion from "../../BarraCompleta";
import PieDePaginaTODOS from '../../../Componentes/PieDePaginaTODOS';
import { useNavigate } from 'react-router-dom';

function Cuerpo() {
    const navigate = useNavigate();

    // Navega a la página principal del usuario
    const handleCuenta = () => {
        const usuarioEnSesion = JSON.parse(localStorage.getItem("usuarioEnSesion")) || { id: 0 };
        if (usuarioEnSesion.id === 0) {
            navigate("/login");
        } else {
            navigate(`/PaginaPrincipalUsuario/${usuarioEnSesion.id}`);
        }
    };

    const [animes, setAnimes] = useState([]);
    const [selectedAnime, setSelectedAnime] = useState(null); // Estado para almacenar el anime seleccionado

    useEffect(() => {
        // Hacer una solicitud fetch al backend para obtener todos los animes
        fetch('https://backendgrupo4.azurewebsites.net/anime')
            .then(response => response.json())
            .then(data => {
                // Obtener solo 5 animes aleatorios
                const shuffledAnimes = data.sort(() => 0.5 - Math.random());
                const selectedAnimes = shuffledAnimes.slice(0, 5);
                setAnimes(selectedAnimes);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Función para manejar el clic en "Learn More"
    const handleLearnMore = (anime) => {
        setSelectedAnime(anime);
    };

    // Función para cerrar el diálogo
    const handleCloseDialog = () => {
        setSelectedAnime(null);
    };

    return (
        <>
            <Container sx={{ backgroundColor: "rgba(246,246,246,255)" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box sx={{ marginTop: 8, paddingLeft: 2, paddingTop: 2 }}>
                            <Typography sx={{ fontSize: "25px", textAlign: "center" }}>
                                ¡Muchas gracias por su pedido!
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ paddingLeft: 2, paddingTop: 2 }}>
                            <Typography sx={{ fontSize: "25px", textAlign: "center" }}>
                                Puedes ver el detalle y estado de tu pedido ingresando a <Link component="button" sx={{ color: "inherit" }} onClick={handleCuenta}> tu cuenta </Link>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ paddingLeft: 2, paddingTop: 2 }}>
                            <Typography sx={{ fontSize: "25px" }}>
                                También te podría interesar...
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        {animes.map((anime, index) => (
                            <Grid item xs={2} key={index}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    '& > :not(style)': {
                                        m: 1,
                                        width: 128,
                                        height: 160,
                                    }
                                }}>
                                    <Paper elevation={3} sx={{ width: 120, height: 120, marginRight: 2 }}>
                                        <img src={anime.urlImagen} alt={`Anime ${index + 1}`} style={{ width: '100%', height: '100%' }} />
                                    </Paper>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography>{anime.nombre}</Typography>
                                        <Link component="button" sx={{ color: "inherit", paddingBottom: 1 }} onClick={() => handleLearnMore(anime)}> Learn More </Link>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Container>

            {/* Diálogo para mostrar la sinopsis */}
            <Dialog open={selectedAnime !== null} onClose={handleCloseDialog}>
                {selectedAnime && (
                    <>
                        <DialogTitle>{selectedAnime.nombre}</DialogTitle>
                        <DialogContent dividers>
                            <Typography>{selectedAnime.sinopsis}</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cerrar</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    );
}

function PaginaSebas3() {
    return (
        <div>
            <BarraDeNavegacion />
            <Cuerpo />
            <PieDePaginaTODOS />
        </div>
    )
}

export default PaginaSebas3;
