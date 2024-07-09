import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BarraDeNavegacion from '../../BarraCompleta';
import Baja from '../../PieDePaginaTODOS';

const defaultTheme = createTheme();

function ContraseniaOlvidada() {
  const [correo, setCorreo] = React.useState('');
  const [correoError, setCorreoError] = React.useState(false);
  const [correoEnviado, setCorreoEnviado] = React.useState(false);

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

      const usuarioEncontrado = usuarios.find(usuario => usuario.email === correo);

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
                  <LockOutlinedIcon color="white" />
                </Avatar>
              </Box>

              <Typography component="h1" variant="h5" style={{ textAlign: 'center', margin: '10px auto' }}>
                Ingrese su correo para enviar la contraseña
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
                  error={correoError}
                  helperText={correoError ? 'Ingrese un correo válido' : ''}
                  value={correo}
                  onChange={handleChange}
                />
                {correoEnviado && (
                  <Typography variant="body2" sx={{ color: 'success.main', mt: 1, marginLeft: '10px' }}>
                    Correo enviado exitosamente
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Enviar
                </Button>

                <Grid container justifyContent={"center"}>
                  <Grid item>
                    <Link href="/login" variant="body2">
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
