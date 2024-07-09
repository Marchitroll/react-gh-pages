import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
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
import { Link } from 'react-router-dom';

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
        throw new Error('Error al obtener usuarios');
      }
      const usuarios = await response.json();

      const usuarioValido = usuarios.find(
        usuario => usuario.correo === correo && usuario.contrasenia === contrasenia
      );

      if (usuarioValido) {
        if (usuarioValido.estadoUsuarioId === 0) {
          setError(true);
          setErrorMensaje('Usuario inactivo');
        } else {
          const usuarioEnSesion = { id: usuarioValido.id };
          localStorage.setItem('usuarioEnSesion', JSON.stringify(usuarioEnSesion));
          navigate(`/PaginaPrincipalUsuario/${usuarioValido.id}`);
        }
      } else {
        setError(true);
        setErrorMensaje('Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      setError(true);
      setErrorMensaje('Error al intentar iniciar sesión');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'correo') {
      setCorreo(value);
    } else if (name === 'contrasenia') {
      setContrasenia(value);
    }
    setError(false);
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

              <form onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                <Grid container>
                  <Grid item xs>
                    <Link to="/ContraseñaOlvidada" variant="body2">
                      Olvidé mi contraseña
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/crearCuenta" variant="body2">
                      Crear cuenta
                    </Link>
                  </Grid>
                </Grid>
              </form>

            </Box>
          </Container>
        </Box>
      </ThemeProvider>

      <Baja />
    </>
  );
}

export default IniciarSesion;
