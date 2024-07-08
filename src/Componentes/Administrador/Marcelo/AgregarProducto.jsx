import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Snackbar,
  Select,
  MenuItem,
} from '@mui/material';

const InsertarAnime = () => {
  const [animeNuevo, setAnimeNuevo] = useState({
    nombre: '',
    sinopsis: '',
    genero: '',
    numeroEpisodios: '',
    precio: '',
    stock: '',
    urlImagen: '',
    vendedorId: '',
    estadoAnimeId: '',
    casaAnimadoraId: '',
    casaProductoraId: '',
  });

  const [casasAnimadoras, setCasasAnimadoras] = useState([]);
  const [casasProductoras, setCasasProductoras] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [urlImagenPreview, setUrlImagenPreview] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const obtenerCasasAnimadoras = async () => {
      try {
        const respuesta = await fetch('https://backendgrupo4.azurewebsites.net/casaAnimadora');
        const datos = await respuesta.json();
        setCasasAnimadoras(datos);
      } catch (error) {
        console.error('Error al obtener las casas animadoras:', error);
      }
    };

    const obtenerCasasProductoras = async () => {
      try {
        const respuesta = await fetch('https://backendgrupo4.azurewebsites.net/casaProductora');
        const datos = await respuesta.json();
        setCasasProductoras(datos);
      } catch (error) {
        console.error('Error al obtener las casas productoras:', error);
      }
    };

    const obtenerVendedores = async () => {
      try {
        const respuesta = await fetch('https://backendgrupo4.azurewebsites.net/vendedor');
        const datos = await respuesta.json();
        setVendedores(datos);
      } catch (error) {
        console.error('Error al obtener los vendedores:', error);
      }
    };

    obtenerCasasAnimadoras();
    obtenerCasasProductoras();
    obtenerVendedores();
  }, []);

  const handleChange = (prop) => (event) => {
    if (prop === 'urlImagen') {
      setUrlImagenPreview(event.target.value);
    }
    setAnimeNuevo({ ...animeNuevo, [prop]: event.target.value });
  };

  const handleGuardarAnime = async () => {
    if (
      !animeNuevo.nombre ||
      !animeNuevo.sinopsis ||
      !animeNuevo.genero ||
      !animeNuevo.numeroEpisodios ||
      !animeNuevo.precio ||
      !animeNuevo.stock ||
      !animeNuevo.urlImagen ||
      !animeNuevo.casaAnimadoraId ||
      !animeNuevo.casaProductoraId ||
      !animeNuevo.vendedorId ||
      isNaN(parseFloat(animeNuevo.vendedorId)) || // Validación de vendedorId como número
      isNaN(parseInt(animeNuevo.estadoAnimeId)) || // Validación de estadoAnimeId como número entero
      !(animeNuevo.estadoAnimeId === '1' || animeNuevo.estadoAnimeId === '2')
    ) {
      mostrarSnackbar('Por favor, complete todos los campos correctamente.');
      return;
    }

    if (
      isNaN(parseFloat(animeNuevo.precio)) ||
      isNaN(parseFloat(animeNuevo.stock)) ||
      isNaN(parseInt(animeNuevo.numeroEpisodios))
    ) {
      mostrarSnackbar(
        'Precio, Stock y Número de episodios deben ser números válidos.'
      );
      return;
    }

    try {
      // Insertar el anime primero
      const respuestaAnime = await fetch(
        'https://backendgrupo4.azurewebsites.net/anime',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(animeNuevo),
        }
      );
      if (!respuestaAnime.ok) {
        throw new Error('Error al insertar el anime.');
      }

      // Obtener el ID del anime insertado
      const animeInsertado = await respuestaAnime.json();
      const { id: animeId } = animeInsertado;

      // Crear relación con la Casa Animadora
      const respuestaAnimadora = await fetch(
        'https://backendgrupo4.azurewebsites.net/AnimeCasaAnimadora',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            animeId,
            casaAnimadoraId: animeNuevo.casaAnimadoraId,
          }),
        }
      );
      if (!respuestaAnimadora.ok) {
        throw new Error('Error al crear la relación con la Casa Animadora.');
      }

      // Crear relación con la Casa Productora
      const respuestaProductora = await fetch(
        'https://backendgrupo4.azurewebsites.net/AnimeCasaProductora',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            animeId,
            casaProductoraId: animeNuevo.casaProductoraId,
          }),
        }
      );
      if (!respuestaProductora.ok) {
        throw new Error('Error al crear la relación con la Casa Productora.');
      }

      // Si todo se ejecuta correctamente, mostrar mensaje y limpiar formulario
      mostrarSnackbar('Anime insertado correctamente.');
      setAnimeNuevo({
        nombre: '',
        sinopsis: '',
        genero: '',
        numeroEpisodios: '',
        precio: '',
        stock: '',
        urlImagen: '',
        vendedorId: '',
        estadoAnimeId: '',
        casaAnimadoraId: '',
        casaProductoraId: '',
      });
      setUrlImagenPreview('');
    } catch (error) {
      console.error('Error al insertar el anime:', error.message);
      mostrarSnackbar(
        'Error al insertar el anime. Por favor, inténtelo de nuevo.'
      );
    }
  };

  const mostrarSnackbar = (mensaje) => {
    setSnackbarMessage(mensaje);
    setSnackbarOpen(true);
  };

  const cerrarSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card style={{ maxWidth: 600, margin: 'auto', marginTop: 20, padding: 20 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Insertar Nuevo Anime
        </Typography>
        <TextField
          variant="outlined"
          label="Nombre del Anime"
          value={animeNuevo.nombre}
          onChange={handleChange('nombre')}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <TextField
          variant="outlined"
          label="Sinopsis"
          value={animeNuevo.sinopsis}
          onChange={handleChange('sinopsis')}
          fullWidth
          multiline
          rows={4}
          style={{ marginBottom: 10 }}
        />
        <TextField
          variant="outlined"
          label="Género"
          value={animeNuevo.genero}
          onChange={handleChange('genero')}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <TextField
          variant="outlined"
          label="Número de episodios"
          value={animeNuevo.numeroEpisodios}
          onChange={handleChange('numeroEpisodios')}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <TextField
          variant="outlined"
          label="Precio"
          value={animeNuevo.precio}
          onChange={handleChange('precio')}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <TextField
          variant="outlined"
          label="Stock"
          value={animeNuevo.stock}
          onChange={handleChange('stock')}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        <TextField
          variant="outlined"
          label="URL de la imagen"
          value={animeNuevo.urlImagen}
          onChange={handleChange('urlImagen')}
          fullWidth
          style={{ marginBottom: 10 }}
        />
        {urlImagenPreview && (
          <img
            src={urlImagenPreview}
            alt="Preview"
            style={{ display: 'block', margin: 'auto', maxWidth: '100%', marginTop: 10 }}
          />
        )}
        <Grid container spacing={2} style={{ marginTop: 10 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
              Casa Animadora
            </Typography>
            <Select
              value={animeNuevo.casaAnimadoraId}
              onChange={handleChange('casaAnimadoraId')}
              fullWidth
              variant="outlined"
              style={{ marginBottom: 10 }}
            >
              {casasAnimadoras.map((casa) => (
                <MenuItem key={casa.id} value={casa.id}>
                  {casa.nombre}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
              Casa Productora
            </Typography>
            <Select
              value={animeNuevo.casaProductoraId}
              onChange={handleChange('casaProductoraId')}
              fullWidth
              variant="outlined"
              style={{ marginBottom: 10 }}
            >
              {casasProductoras.map((casa) => (
                <MenuItem key={casa.id} value={casa.id}>
                  {casa.nombre}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
              Vendedor
            </Typography>
            <Select
              value={animeNuevo.vendedorId}
              onChange={handleChange('vendedorId')}
              fullWidth
              variant="outlined"
              style={{ marginBottom: 10 }}
            >
              {vendedores.map((vendedor) => (
                <MenuItem key={vendedor.id} value={vendedor.id}>
                  {vendedor.nombre}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
              Estado del Anime
            </Typography>
            <Select
              value={animeNuevo.estadoAnimeId}
              onChange={handleChange('estadoAnimeId')}
              fullWidth
              variant="outlined"
              style={{ marginBottom: 10 }}
            >
              <MenuItem value={'1'}>Activo</MenuItem>
              <MenuItem value={'2'}>Inactivo</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGuardarAnime}
          style={{ marginTop: 20 }}
        >
          Guardar Anime
        </Button>
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

export default InsertarAnime;
