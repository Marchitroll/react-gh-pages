// Importación de los componentes y hooks necesarios desde React y Material-UI
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import TvIcon from '@mui/icons-material/Tv';
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
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Dashboard from './Dashboard.js';

import Pag16 from '../Frank/Pag24.js'
import UserList from '../Cesar/UserList.jsx';
import OrderList from '../Cesar/OrderList.jsx';
import ListaProductos from './ListaProductos.jsx';
import Baja from '../../PieDePaginaTODOS.js';

// Datos del menú
const itemsMenu = [
  { texto: 'Tablero', icono: <DashboardIcon />, componente: <Dashboard /> },
  { texto: 'Usuarios registrados', icono: <PeopleIcon />, componente: <UserList /> },
  { texto: 'Productos', icono: <StoreIcon />, componente: <ListaProductos /> },
  { texto: 'Órdenes', icono: <AssignmentIcon />, componente: <OrderList /> },
];

const anchoDrawer = 240;

const PaginaPrincipalAdmin = () => {
  // Estado para almacenar el componente seleccionado del menú
  const [componenteSeleccionado, setComponenteSeleccionado] = useState(<Dashboard />);

  // Función para manejar el clic en los elementos del menú
  const manejarClicItem = (componente) => {
    setComponenteSeleccionado(componente);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* Barra de la aplicación en la parte superior de la página */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            {/* Título de la aplicación */}
            <Typography variant="h6" noWrap component="div">
              Administrador
            </Typography>
          </Toolbar>
        </AppBar>
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
      <Baja />
    </>
  );
};

export default PaginaPrincipalAdmin;
