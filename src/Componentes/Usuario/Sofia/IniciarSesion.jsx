import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  ThemeProvider,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';
import BarraDeNavegacion from '../../BarraCompleta';
import Baja from '../../PieDePaginaTODOS';

const defaultTheme = createTheme();

const IniciarSesion = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://backendgrupo4.azurewebsites.net/usuario');
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const usuarios = await response.json();

      const usuarioValido = usuarios.find(
        usuario => usuario.correo === correo && usuario.contrasenia === contrasenia
      );

      if (usuarioValido) {
        if (usuarioValido.estadoUsuarioId === 2) {
          setError(true);
          setErrorMensaje('Usuario inactivo');
        } else {
          const usuarioEnSesion = { id: usuarioValido.id };
          localStorage.setItem("usuarioEnSesion", JSON.stringify(usuarioEnSesion));
          navigate(`/PaginaPrincipalUsuario/${usuarioValido.id}`);
        }
      } else {
        setError(true);
        setErrorMensaje('Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(true);
      setErrorMensaje('Error al intentar iniciar sesión');
    }
  };

  const handleCorreoChange = (event) => {
    setCorreo(event.target.value);
    setError(false);
  };

  const handleContraseniaChange = (event) => {
    setContrasenia(event.target.value);
    setError(false);
  };

  const handleRegistro = () => {
    // Implementa la lógica para registrar nuevos usuarios
    navigate('/CrearCuenta'); // Redirige al formulario de registro
  };

  return (
    <>
      <BarraDeNavegacion />

      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />

        <Box
          sx={{
            backgroundColor: '#FFD7C4',
            minHeight: '80vh',
            width: '100%',
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '5px',
                marginTop: '50px',
              }}
            >

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                  <PersonIcon color="white" />
                </Avatar>
              </Box>

              <Typography component="h1" variant="h5" style={{ textAlign: 'center', margin: '10px auto' }}>
                Ingreso para nuevos usuarios
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="correo"
                  label="Dirección de correo"
                  name="correo"
                  autoComplete="correo"
                  autoFocus
                  value={correo}
                  onChange={handleCorreoChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="contrasenia"
                  label="Contraseña"
                  type="password"
                  id="contrasenia"
                  autoComplete="current-password"
                  value={contrasenia}
                  onChange={handleContraseniaChange}
                />
                {error && <Typography variant="body2" color="error" align="center">{errorMensaje}</Typography>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Ingresar
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link component="button" variant="body2" onClick={handleRegistro}>
                      Crear nueva cuenta
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

export default IniciarSesion;
