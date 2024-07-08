import PeopleIcon from '@mui/icons-material/People';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from 'react';
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import OrdenesRecientes from './OrdenesRecientes';
import DatosUsuario from '../Frank/DatosUsuario';
import CambiarContrasenia from '../Frank/CambiarContrasenia';
import BarraDeNavegacion from "../../BarraCompleta"

// Datos del menú
const itemsMenu = [
  { texto: 'Ordenes Recientes', icono: <PlaylistAddCheckRoundedIcon />, componente: <OrdenesRecientes /> },
  { texto: 'Datos de Registro', icono: <PeopleIcon />, componente: <DatosUsuario /> },
  { texto: 'Cambiar Contraseña', icono: <LockRoundedIcon />, componente: <CambiarContrasenia /> },
];

const anchoDrawer = 240;

const PaginaPrincipalUsuario = () => {
  // Estado para almacenar el componente seleccionado del menú
  const [componenteSeleccionado, setComponenteSeleccionado] = useState(<OrdenesRecientes />);

  // Función para manejar el clic en los elementos del menú
  const manejarClicItem = (componente) => {
    setComponenteSeleccionado(componente);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Barra de la aplicación en la parte superior de la página */}
      <BarraDeNavegacion />
      {/* Panel lateral (drawer) que contiene la lista de opciones */}
      <Drawer
        variant="permanent"
        sx={{
          width: anchoDrawer,
          flexShrink: 0,
          zIndex: 0,
          [`& .MuiDrawer-paper`]: { width: anchoDrawer, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          {/* Lista de opciones del menú */}
          <List>
            {/* Mapeo de las opciones del menú y sus iconos */}
            {itemsMenu.map((item) => (
              <ListItem key={item.texto} disablePadding>
                {/* Botón de cada opción del menú que cambia el contenido principal al hacer clic */}
                <ListItemButton onClick={() => manejarClicItem(item.componente)}>
                  <ListItemIcon>
                    {item.icono}
                  </ListItemIcon>
                  <ListItemText primary={item.texto} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {/* Contenedor principal que muestra el contenido seleccionado */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {/* Renderización del componente seleccionado */}
        {componenteSeleccionado}
      </Box>
    </Box>
  );
};

export default PaginaPrincipalUsuario;
