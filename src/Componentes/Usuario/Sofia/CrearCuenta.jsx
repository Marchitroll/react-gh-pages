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
import { HowToRegRounded as HowToRegRoundedIcon } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';
import BarraDeNavegacion from '../../BarraCompleta';
import Baja from '../../PieDePaginaTODOS';
import { Link } from 'react-router-dom';

const defaultTheme = createTheme();

const CrearCuenta = () => {
  const navigate = useNavigate();
  const [errorContrasenia, setErrorContrasenia] = useState(false);
  const [errorCorreo, setErrorCorreo] = useState(false);
  const [usuarioCreado, setUsuarioCreado] = useState(false);
  const [errorCorreoExistente, setErrorCorreoExistente] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const contrasenia = data.get('contrasenia');
    const confirmarContrasenia = data.get('confirmarContrasenia');
    const correo = data.get('correo');

    // Verificar si el correo tiene el formato correcto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const correoValido = emailRegex.test(correo);

    const contraseniaValida = contrasenia === confirmarContrasenia;

    setErrorContrasenia(!contraseniaValida);

    if (!contraseniaValida || !correoValido) {
      setErrorCorreo(!correoValido);
      return;
    }

    try {
      // Verificar si el correo ya existe en la base de datos
      const response = await fetch('https://backendgrupo4.azurewebsites.net/usuario');
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const usuarios = await response.json();

      const correoExistente = usuarios.some(usuario => usuario.correo === correo);
      if (correoExistente) {
        setErrorCorreoExistente(true);
        return;
      }

      const nuevoUsuario = {
        nombre: data.get('primerNombre'),
        apellido: data.get('apellido'),
        correo: correo,
        contrasenia: contrasenia,
        estadoUsuarioId: 1 // Estado activo por defecto
      };

      // Guardar el nuevo usuario en el backend
      const crearUsuarioResponse = await fetch('https://backendgrupo4.azurewebsites.net/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!crearUsuarioResponse.ok) {
        if (crearUsuarioResponse.status === 400) {
          const errorData = await crearUsuarioResponse.json();
          if (errorData.errors && errorData.errors.some(error => error.param === 'correo')) {
            setErrorCorreoExistente(true);
          }
        }
        throw new Error('Error al crear el usuario');
      }

      // Obtener el ID del nuevo usuario creado
      const usuarioCreadoData = await crearUsuarioResponse.json();
      const nuevoUsuarioId = usuarioCreadoData.id;

      // Mostrar mensaje de éxito y redirigir a la página principal del usuario
      setUsuarioCreado(true);
      localStorage.setItem('usuario', JSON.stringify({ correo }));
      setTimeout(() => {
        navigate(`/login`);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setUsuarioCreado(false);
      setErrorCorreoExistente(false);
    }
  };

  const handleConfirmarContraseniaChange = (event) => {
    const confirmarContrasenia = event.target.value;
    const contrasenia = document.getElementById('contrasenia').value;
    setErrorContrasenia(contrasenia !== confirmarContrasenia);
  };

  return (
    <>
      <BarraDeNavegacion />
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: '#BBFFCE',
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
                  <HowToRegRoundedIcon color="white" />
                </Avatar>
              </Box>
              <Typography component="h1" variant="h5">
                Registra una nueva cuenta
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="primerNombre"
                      required
                      fullWidth
                      id="primerNombre"
                      label="Primer Nombre"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="apellido"
                      label="Apellido"
                      name="apellido"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="correo"
                      label="Dirección de correo"
                      name="correo"
                      autoComplete="email"
                      error={errorCorreo || errorCorreoExistente}
                      helperText={
                        errorCorreoExistente
                          ? 'Ya existe un correo registrado'
                          : errorCorreo
                            ? 'Ingrese un correo válido'
                            : ''
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="contrasenia"
                      label="Contraseña"
                      type="password"
                      id="contrasenia"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmarContrasenia"
                      label="Confirmar Contraseña"
                      type="password"
                      id="confirmarContrasenia"
                      error={errorContrasenia}
                      helperText={errorContrasenia ? 'Las contraseñas no coinciden' : ''}
                      onChange={handleConfirmarContraseniaChange}
                    />
                  </Grid>
                </Grid>
                {usuarioCreado && (
                  <Typography variant="body2" sx={{ color: 'success.main', mt: 2 }}>
                    Usuario creado exitosamente... Redirigiendo
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Crear Nueva cuenta
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/" variant="body2">
                      ¿Ya tienes una cuenta? Regresa al inicio
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

export default CrearCuenta;
