import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Button,
  Snackbar,
} from '@mui/material';

const AnimeDetalle = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [originalAnime, setOriginalAnime] = useState(null);
  const [cargandoAnime, setCargandoAnime] = useState(true);
  const [cargandoCasasProductoras, setCargandoCasasProductoras] = useState(true);
  const [cargandoCasasAnimadoras, setCargandoCasasAnimadoras] = useState(true);
  const [casasProductoras, setCasasProductoras] = useState([]);
  const [casasAnimadoras, setCasasAnimadoras] = useState([]);
  const [editando, setEditando] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const obtenerDetallesAnime = async () => {
      try {
        const respuestaAnime = await fetch(
          `https://backendgrupo4.azurewebsites.net/anime/${id}`
        );
        if (!respuestaAnime.ok) {
          throw new Error('Error al obtener los detalles del anime');
        }
        const datosAnime = await respuestaAnime.json();
        setAnime(datosAnime);
        setOriginalAnime(datosAnime);
        setCargandoAnime(false);
      } catch (error) {
        console.error('Error al obtener los detalles del anime:', error);
        mostrarSnackbar('Error al obtener los detalles del anime. Por favor, inténtelo de nuevo.');
        setCargandoAnime(false);
      }
    };

    const obtenerCasasProductoras = async () => {
      try {
        const respuestaProductoras = await fetch(
          `https://backendgrupo4.azurewebsites.net/anime/${id}/casas-productoras`
        );
        if (!respuestaProductoras.ok) {
          throw new Error('Error al obtener las casas productoras');
        }
        const datosProductoras = await respuestaProductoras.json();
        setCasasProductoras(datosProductoras);
        setCargandoCasasProductoras(false);
      } catch (error) {
        console.error('Error al obtener las casas productoras:', error);
        mostrarSnackbar('Error al obtener las casas productoras. Por favor, inténtelo de nuevo.');
        setCargandoCasasProductoras(false);
      }
    };

    const obtenerCasasAnimadoras = async () => {
      try {
        const respuestaAnimadoras = await fetch(
          `https://backendgrupo4.azurewebsites.net/anime/${id}/casas-animadoras`
        );
        if (!respuestaAnimadoras.ok) {
          throw new Error('Error al obtener las casas animadoras');
        }
        const datosAnimadoras = await respuestaAnimadoras.json();
        setCasasAnimadoras(datosAnimadoras);
        setCargandoCasasAnimadoras(false);
      } catch (error) {
        console.error('Error al obtener las casas animadoras:', error);
        mostrarSnackbar('Error al obtener las casas animadoras. Por favor, inténtelo de nuevo.');
        setCargandoCasasAnimadoras(false);
      }
    };

    obtenerDetallesAnime();
    obtenerCasasProductoras();
    obtenerCasasAnimadoras();
  }, [id]);

  const handleGuardarCambios = async () => {
    if (
      !anime.nombre ||
      !anime.sinopsis ||
      !anime.genero ||
      !anime.numeroEpisodios ||
      !anime.precio ||
      !anime.stock
    ) {
      mostrarSnackbar('Todos los campos son obligatorios.');
      return;
    }

    if (
      isNaN(parseFloat(anime.precio)) ||
      isNaN(parseFloat(anime.stock)) ||
      isNaN(parseInt(anime.numeroEpisodios))
    ) {
      mostrarSnackbar(
        'Precio, Stock y Número de episodios deben ser números válidos.'
      );
      return;
    }

    try {
      const respuesta = await fetch(
        `https://backendgrupo4.azurewebsites.net/anime/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(anime),
        }
      );
      if (respuesta.ok) {
        setEditando(false);
        mostrarSnackbar('Anime actualizado correctamente.');
      } else {
        const error = await respuesta.json();
        console.error('Error al actualizar el anime:', error.message);
        mostrarSnackbar(
          'Error al actualizar el anime. Por favor, inténtelo de nuevo.'
        );
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      mostrarSnackbar(
        'Error al conectar con el servidor. Por favor, inténtelo de nuevo.'
      );
    }
  };

  const handleCancelarEdicion = () => {
    setAnime(originalAnime);
    setEditando(false);
  };

  const handleChange = (prop) => (event) => {
    setAnime({ ...anime, [prop]: event.target.value });
  };

  const mostrarSnackbar = (mensaje) => {
    setSnackbarMessage(mensaje);
    setSnackbarOpen(true);
  };

  const cerrarSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (cargandoAnime || !anime) {
    return <CircularProgress />;
  }

  const nombresCasasProductoras = casasProductoras.map(casa => casa.nombre).join(', ');
  const nombresCasasAnimadoras = casasAnimadoras.map(casa => casa.nombre).join(', ');

  return (
    <Card style={{ maxWidth: 600, margin: 'auto', marginTop: 20, padding: 20 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {editando ? (
            <TextField
              variant="outlined"
              label="Nombre del Anime"
              value={anime.nombre}
              onChange={handleChange('nombre')}
              fullWidth
              style={{ marginBottom: 10 }}
            />
          ) : (
            anime.nombre
          )}
        </Typography>
        <img
          src={anime.urlImagen}
          alt={anime.nombre}
          style={{ display: 'block', margin: 'auto', maxWidth: '100%', marginTop: 10 }}
        />
        <Typography variant="subtitle1" style={{ marginTop: 10 }}>
          {editando ? (
            <TextField
              variant="outlined"
              label="Sinopsis"
              value={anime.sinopsis}
              onChange={handleChange('sinopsis')}
              fullWidth
              multiline
              rows={4}
              style={{ marginBottom: 10 }}
            />
          ) : (
            anime.sinopsis
          )}
        </Typography>

        <Grid container spacing={2} style={{ marginTop: 10 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
              Detalles:
            </Typography>
            <TextField
              variant="outlined"
              label="Género"
              value={anime.genero}
              onChange={handleChange('genero')}
              fullWidth
              disabled={!editando}
              style={{ marginBottom: 10 }}
            />
            <TextField
              variant="outlined"
              label="Número de episodios"
              value={anime.numeroEpisodios}
              onChange={handleChange('numeroEpisodios')}
              fullWidth
              disabled={!editando}
              style={{ marginBottom: 10 }}
            />
            <TextField
              variant="outlined"
              label="Precio"
              value={anime.precio}
              onChange={handleChange('precio')}
              fullWidth
              disabled={!editando}
              style={{ marginBottom: 10 }}
            />
            <TextField
              variant="outlined"
              label="Stock"
              value={anime.stock}
              onChange={handleChange('stock')}
              fullWidth
              disabled={!editando}
              style={{ marginBottom: 10 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
              Otros detalles:
            </Typography>
            <TextField
              variant="outlined"
              label="ID del vendedor"
              value={anime.vendedorId}
              fullWidth
              disabled
              style={{ marginBottom: 10 }}
            />
            <TextField
              variant="outlined"
              label="ID del estado del anime"
              value={anime.estadoAnimeId}
              fullWidth
              disabled
              style={{ marginBottom: 10 }}
            />
            <TextField
              variant="outlined"
              label="Casa Productora"
              value={nombresCasasProductoras}
              fullWidth
              disabled
              style={{ marginBottom: 10 }}
            />
            <TextField
              variant="outlined"
              label="Casa Animadora"
              value={nombresCasasAnimadoras}
              fullWidth
              disabled
              style={{ marginBottom: 10 }}
            />
          </Grid>
        </Grid>

        {editando ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGuardarCambios}
              style={{ marginTop: 20, marginRight: 10 }}
            >
              Guardar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancelarEdicion}
              style={{ marginTop: 20 }}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEditando(true)}
            style={{ marginTop: 20 }}
          >
            Editar
          </Button>
        )}
      </CardContent>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={cerrarSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Card>
  );
};

export default AnimeDetalle;
