import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Store as StoreIcon
} from '@mui/icons-material';
import Dashboard from './Dashboard.js';
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

const drawerWidth = 240;

const PaginaPrincipalAdmin = () => {
  const [componenteSeleccionado, setComponenteSeleccionado] = useState(<Dashboard />);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('isAdmin')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/');
  };

  const handleMenuClick = (componente) => {
    setComponenteSeleccionado(componente);
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" onClick={handleReturnHome} noWrap>
              <Button color="inherit">Administrador (Regresar a home)</Button>
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {itemsMenu.map(({ texto, icono, componente }) => (
                <ListItem key={texto} disablePadding>
                  <ListItemButton onClick={() => handleMenuClick(componente)}>
                    <ListItemIcon>{icono}</ListItemIcon>
                    <ListItemText primary={texto} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {componenteSeleccionado}
        </Box>
      </Box>
      <Baja />
    </>
  );
};

export default PaginaPrincipalAdmin;
