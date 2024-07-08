import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import BarraCompleta from '../../BarraCompleta'; 
import PieDePaginaTODOS from '../../PieDePaginaTODOS'; 

function PaginaProducto() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch(`https://backendgrupo4.azurewebsites.net/anime/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAnime(data);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };

    fetchAnime();
  }, [id]);

  const incrementarCantidad = () => {
    setCantidad(prevCantidad => prevCantidad + 1);
  };

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(prevCantidad => prevCantidad - 1);
    }
  };

  const addToCart = () => {
    // Aquí podrías implementar la lógica para añadir el anime al carrito
    // Por ejemplo, podrías enviar los datos al backend o almacenarlos localmente
    console.log(`Añadiendo ${cantidad} unidad(es) de ${anime.nombre} al carrito`);
  };

  if (!anime) {
    return <div>Loading...</div>; // Puedes mostrar un spinner o mensaje de carga mientras se obtiene la información
  }

  return (
    <>
      <br />
      <br />
      <BarraCompleta /> {/* Agrega el Header */}
      <Container sx={{ py: 5 }} maxWidth="lg">
        <Typography variant="h4" component="div" gutterBottom>
          {anime.nombre}
        </Typography>
        <Typography variant="subtitle1" component="div" gutterBottom>
          Por: {anime.vendedor} - Serie: {anime.serie}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ width: '100%', height: '400px', backgroundColor: '#e0e0e0' }}>
              <img src={anime.urlImagen} alt={anime.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h5" component="div" gutterBottom>
                DISPONIBLE
              </Typography>
              <Typography variant="h4" component="div" gutterBottom>
                $ {anime.precio}
              </Typography>
              <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={addToCart}>
                AÑADIR AL CARRITO
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={decrementarCantidad}>-</Button>
                <Typography variant="h6" component="div" sx={{ mx: 2 }}>
                  {cantidad}
                </Typography>
                <Button onClick={incrementarCantidad}>+</Button>
              </Box>
              <Button sx={{ mt: 2 }}>Ver métodos de envío disponibles</Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" component="div" gutterBottom>
            Descripción
          </Typography>
          <Typography variant="body1" component="div">
            {anime.sinopsis}
          </Typography>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" component="div" gutterBottom>
            Características del Producto:
          </Typography>
          <Typography variant="body1" component="div">
            <ul>
              <li>Número de episodios: {anime.numeroEpisodios}</li>
              <li>Géneros: {anime.genero}</li>
              {/* Agrega las demás características según la estructura de tu objeto anime */}
            </ul>
          </Typography>
        </Box>
      </Container>
      <PieDePaginaTODOS /> {/* Agrega el Footer */}
    </>
  );
}

export default PaginaProducto;
