import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import ItemCard from '../Alvaro/itemcard';

export default function CuerpoAlva2() {
  const [items, setItems] = useState([]);
  const [nuevosItems, setNuevosItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://backendgrupo4.azurewebsites.net/anime');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items data:', error);
      }
    };

    const fetchNuevosItems = async () => {
      try {
        const response = await fetch('https://backendgrupo4.azurewebsites.net/anime');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNuevosItems(data);
      } catch (error) {
        console.error('Error fetching nuevos items data:', error);
      }
    };

    fetchItems();
    fetchNuevosItems();
  }, []);

  const handleLearnMore = (title) => {
    alert(`Learn more about: ${title}`);
  };

  return (
    <Container sx={{ py: 5 }} maxWidth="lg">
      <Box id="vendidos-section">
        <Typography variant="h5" component="div" gutterBottom>
          MÁS VENDIDOS
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {items.slice(20, 23).map((item, index) => (
          <Grid item key={`item-top-${index}`} xs={12} sm={6} md={4}>
            <ItemCard
              id={item.id} // Asumiendo que item tiene un campo id único
              title={item.nombre}
              description={item.genero}
              imageUrl={item.urlImagen}
              onLearnMore={() => handleLearnMore(item.title)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 5 }}>
        <Grid container spacing={2} justifyContent="center">
          {items.slice(3, 13).map((item, index) => (
            <Grid item key={`item-bottom-${index}`} xs={12} sm={6} md={2.4}>
              <ItemCard
                id={item.id} // Asumiendo que item tiene un campo id único
                title={item.nombre}
                description={item.genero}
                imageUrl={item.urlImagen}
                onLearnMore={() => handleLearnMore(item.title)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 5 }} id="nuevos-section">
        <Typography variant="h5" component="div" gutterBottom>
          NUEVOS
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {items.slice(116, 119).map((item, index) => (
            <Grid item key={`item-top-${index}`} xs={12} sm={6} md={4}>
              <ItemCard
                id={item.id} // Asumiendo que item tiene un campo id único
                title={item.nombre}
                description={item.genero}
                imageUrl={item.urlImagen}
                onLearnMore={() => handleLearnMore(item.title)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 5 }} id="ofertas-section">
        <Typography variant="h5" component="div" gutterBottom sx={{ paddingTop: "20px" }}>
          OFERTAS
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          {nuevosItems.slice(23, 28,).map((item, index) => (
            <Grid item key={`nuevo-item-bottom-${index}`} xs={12} sm={6} md={2.4}>
              <ItemCard
                id={item.id} // Asumiendo que nuevosItems tiene un campo id único
                title={item.nombre}
                description={item.genero}
                imageUrl={item.urlImagen}
                onLearnMore={() => handleLearnMore(item.title)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
