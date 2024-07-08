import React, { useEffect, useReducer, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, TableHead, TableRow, TableBody, Table, Button, TableCell, Link, Typography } from "@mui/material";
import Titulo from '../../Administrador/Marcelo/Titulo';
import { TransparentTableContainer, FirstRowTableCell, PaginationContainer, CustomPagination } from '../../Administrador/Marcelo/Estilos';

// Función para obtener el usuario en sesión desde localStorage
const getUsuarioEnSesion = () => JSON.parse(localStorage.getItem("usuarioEnSesion") || '{}').id || null;
// Función para obtener las órdenes asociadas a un usuario específico desde localStorage
const getOrdenes = (idUsuario) => JSON.parse(localStorage.getItem("ordenes") || '[]').filter(orden => orden.usuarioAsociado === idUsuario);
// Función para obtener la lista de productos desde localStorage
const getProductos = () => JSON.parse(localStorage.getItem("productos") || '[]');

// Estado inicial para el reducer
const initialState = {
    page: 1, // Página inicial
    orderByDate: null, // Criterio de ordenamiento inicial
    ordenesAsociadas: [], // Lista inicial de órdenes asociadas
    productos: [], // Lista inicial de productos
};

// Reducer para manejar las diferentes acciones y actualizar el estado
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ORDENES':
            return { ...state, ordenesAsociadas: action.payload }; // Actualiza la lista de órdenes
        case 'SET_PRODUCTOS':
            return { ...state, productos: action.payload }; // Actualiza la lista de productos
        case 'SET_PAGE':
            return { ...state, page: action.payload }; // Actualiza la página actual
        case 'ORDER_BY_DATE':
            return { ...state, orderByDate: action.payload }; // Actualiza el criterio de ordenamiento
        default:
            return state; // Retorna el estado sin cambios por defecto
    }
};

// Componente de tabla modularizado para mostrar las órdenes
const OrdenesTable = ({ ordenes, productos, handleProductList, navigate }) => (
    // Contenedor de tabla transparente estilizado como un componente Paper
    <TransparentTableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <FirstRowTableCell>ID orden</FirstRowTableCell>
                    <FirstRowTableCell>CantItems</FirstRowTableCell>
                    <FirstRowTableCell>Items</FirstRowTableCell>
                    <FirstRowTableCell>Fecha</FirstRowTableCell>
                    <FirstRowTableCell>Direccion</FirstRowTableCell>
                    <FirstRowTableCell>Ver Detalle</FirstRowTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {ordenes.length > 0 ? (
                    // Mapea cada orden a una fila de la tabla
                    ordenes.map(orden => (
                        <TableRow key={orden.id}>
                            <TableCell>{orden.id}</TableCell>
                            <TableCell>{orden.productoAsociado.length}</TableCell>
                            <TableCell>{handleProductList(productos, orden.productoAsociado)}</TableCell>
                            <TableCell>{orden.fecha}</TableCell>
                            <TableCell>{orden.direccionEnvio}</TableCell>
                            <TableCell>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => navigate(`/detalleOrden/${orden.id}`)}
                                >
                                    Ver Detalle
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    // Mensaje para mostrar si no hay órdenes
                    <TableRow>
                        <TableCell colSpan={6}>
                            <Typography variant="body1">No se encontraron órdenes asociadas.</Typography>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </TransparentTableContainer>
);

// Componente principal para mostrar las órdenes recientes
const OrdenesRecientes = () => {
    // Usa useReducer para manejar el estado del componente con el reducer y el estado inicial
    const [state, dispatch] = useReducer(reducer, initialState);
    // Usa useNavigate para la navegación
    const navigate = useNavigate();

    // Efecto para cargar las órdenes y productos cuando el componente se monta
    useEffect(() => {
        const idUsuarioEnSesion = getUsuarioEnSesion();
        if (idUsuarioEnSesion) {
            dispatch({ type: 'SET_ORDENES', payload: getOrdenes(idUsuarioEnSesion) });
        }
        dispatch({ type: 'SET_PRODUCTOS', payload: getProductos() });
    }, []);

    // Función para ordenar las órdenes por fecha
    const sortOrders = useCallback(() => {
        if (state.orderByDate) {
            const ordenesOrdenadas = [...state.ordenesAsociadas].sort((a, b) => {
                return state.orderByDate === 'asc'
                    ? new Date(a.fecha) - new Date(b.fecha)
                    : new Date(b.fecha) - new Date(a.fecha);
            });
            dispatch({ type: 'SET_ORDENES', payload: ordenesOrdenadas });
        }
    }, [state.orderByDate]);

    // Efecto para ordenar las órdenes cuando el criterio de ordenamiento cambia
    useEffect(() => {
        sortOrders();
    }, [sortOrders]);

    // Función para generar la lista de nombres de productos a partir de los IDs
    const handleProductList = (productos, productoAsociado) => {
        return productoAsociado.map(idProducto => {
            const producto = productos.find(producto => producto.producto.id === idProducto);
            return producto ? producto.producto.nombre : 'Nombre no disponible';
        }).join(' || ');
    };

    // Calcula el índice de inicio y fin para la paginación
    const startIndex = (state.page - 1) * 15;
    const endIndex = startIndex + 15;

    // Retorna el diseño del componente
    return (
        <Container maxWidth="auto">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Titulo titulo="Ordenes Recientes" />
                </Grid>

                <Grid item xs={6}>
                    <Button variant="outlined" onClick={() => dispatch({ type: 'ORDER_BY_DATE', payload: 'asc' })}>
                        Ordenar por fecha (más antigua primero)
                    </Button>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                    <Button variant="outlined" onClick={() => dispatch({ type: 'ORDER_BY_DATE', payload: 'desc' })}>
                        Ordenar por fecha (más reciente primero)
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <OrdenesTable
                        ordenes={state.ordenesAsociadas.slice(startIndex, endIndex)}
                        productos={state.productos}
                        handleProductList={handleProductList}
                        navigate={navigate}
                    />
                </Grid>

                <PaginationContainer item xs={12}>
                    <CustomPagination
                        count={Math.ceil(state.ordenesAsociadas.length / 15)}
                        page={state.page}
                        onChange={(event, newPage) => dispatch({ type: 'SET_PAGE', payload: newPage })}
                        variant="outlined"
                        shape="rounded"
                        previousButtonText="Anterior"
                    />
                </PaginationContainer>
            </Grid>
        </Container>
    );
};

// Exportamos el componente por defecto
export default OrdenesRecientes;
