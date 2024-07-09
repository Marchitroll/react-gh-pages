import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BarraDeNavegacion from '../../BarraCompleta';
import Baja from '../../PieDePaginaTODOS';
import { Link } from 'react-router-dom';

const defaultTheme = createTheme();

function ContraseniaOlvidada() {
  const [correo, setCorreo] = useState('');
  const [correoError, setCorreoError] = useState(false);
  const [correoEnviado, setCorreoEnviado] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validarCorreo(correo)) {
      setCorreoError(true);
      return;
    }
    setCorreoError(false);

    try {
      const response = await fetch('https://backendgrupo4.azurewebsites.net/usuario');
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const usuarios = await response.json();

      const usuarioEncontrado = usuarios.find(usuario => usuario.correo === correo);

      if (usuarioEncontrado) {
        alert(`La contraseña para el correo ${correo} es: ${usuarioEncontrado.contrasenia}`);
        setCorreoEnviado(true);
      } else {
        alert('El correo no existe en la base de datos.');
        setCorreoEnviado(false);
      }
    } catch (error) {
      console.error('Error al recuperar la contraseña:', error);
    }
  };

  const handleChange = (event) => {
    setCorreo(event.target.value);
    setCorreoEnviado(false);
  };

  const validarCorreo = (correo) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(correo);
  };

  return (
    <>
      <BarraDeNavegacion />

      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />

        <Box
          sx={{
            backgroundColor: '#EFC4EB',
            minHeight: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                paddingTop: '100px',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '5px',
                marginTop: '50px',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon color="white" />
              </Avatar>

              <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mt: 2 }}>
                Ingrese su correo para enviar la contraseña
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="correo"
                  label="Dirección de correo"
                  name="correo"
                  autoComplete="correo"
                  autoFocus
                  error={correoError}
                  helperText={correoError ? 'Ingrese un correo válido' : ''}
                  value={correo}
                  onChange={handleChange}
                />
                {correoEnviado && (
                  <Typography variant="body2" sx={{ color: 'success.main', mt: 1 }}>
                    Correo enviado exitosamente
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Enviar
                </Button>

                <Grid container justifyContent="center" sx={{ mt: 2 }}>
                  <Grid item>
                    <Link to="/login" variant="body2">
                      Regresar a Iniciar Sesión
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>

      <Baja />
    </>
  );
}

export default ContraseniaOlvidada;
