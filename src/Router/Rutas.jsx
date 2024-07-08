import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ContraseniaOlvidada from '../Componentes/Usuario/Sofia/ContraseñaOlvidada.jsx';
import CrearCuenta from '../Componentes/Usuario/Sofia/CrearCuenta.jsx';
import DetalleProducto from '../Componentes/Administrador/Marcelo/DetalleProducto.jsx';
import IniciarSesion from '../Componentes/Usuario/Sofia/IniciarSesion.jsx';
import OrdenesRecientes from '../Componentes/Usuario/Sofia/OrdenesRecientes.jsx';
import OrderDetail from '../Componentes/Administrador/Cesar/OrderDetail.jsx';
import PaginaPrincipal from '../Componentes/Usuario/Alvaro/PaginaPrincipal.jsx';
import PaginaPrincipalAdmin from '../Componentes/Administrador/Marcelo/PaginaPrincipalAdmin.jsx';
import PaginaPrincipalUsuario from '../Componentes/Usuario/Sofia/PagPrincipalUsuario.jsx';
import PaginaSebas1 from '../Componentes/Usuario/Fabrizio/Cuerpo.js';
import PaginaSebas2 from '../Componentes/Usuario/Fabrizio/Cuerpo2.js';
import PaginaSebas3 from '../Componentes/Usuario/Fabrizio/Cuerpo3.js';
import UserDetail from '../Componentes/Administrador/Cesar/UserDetail.jsx';
import AgregarProducto from '../Componentes/Administrador/Marcelo/AgregarProducto.jsx';
import PaginaProducto from '../Componentes/Usuario/Alvaro/PaginaProducto.jsx';

const Rutas = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PaginaPrincipal />} />
        <Route path='/admin' element={<PaginaPrincipalAdmin />} />
        <Route path='/detalleUsuario/:id' element={<UserDetail />} />
        <Route path='/detalleOrden/:id' element={<OrderDetail />} />
        <Route path='/parte1' element={<PaginaSebas1 />} />
        <Route path='/parte2' element={<PaginaSebas2 />} />
        <Route path='/parte3' element={<PaginaSebas3 />} />
        <Route path='/login' element={<IniciarSesion />} />
        <Route path='/crearCuenta' element={<CrearCuenta />} />
        <Route path='/contraseñaOlvidada' element={<ContraseniaOlvidada />} />
        <Route path='/PaginaPrincipalUsuario/:id' element={<PaginaPrincipalUsuario />} />
        <Route path='/ordenesRecientes' element={<OrdenesRecientes />} />
        <Route path='/detalleProducto/:id' element={<DetalleProducto />} />
        <Route path='/agregarProducto' element={<AgregarProducto />} />
        <Route path="/detalle/:id" element={<PaginaProducto />} />
      </Routes>
    </Router>
  );
}

export default Rutas;
