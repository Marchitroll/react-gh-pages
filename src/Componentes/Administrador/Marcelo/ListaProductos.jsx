import React, { useState, useEffect } from "react";
import { Container, Grid, Paper, TableHead, TableRow, TableBody, Table, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Titulo from './Titulo';
import { Search, SearchIconWrapper, StyledInputBase, TransparentTableContainer, TransparentTable, TransparentTableCell, FirstRowTableCell, PaginationContainer, CustomPagination } from './Estilos';

const ListaProductos = () => {
    const [pagina, setPagina] = useState(1);
    const [elementoBuscado, setElementoBuscado] = useState('');
    const [productos, setProductos] = useState([]);
    const [estadosAnime, setEstadosAnime] = useState({});

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('https://backendgrupo4.azurewebsites.net/anime');
                const data = await response.json();
                setProductos(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchEstadosAnime = async () => {
            try {
                const response = await fetch('https://backendgrupo4.azurewebsites.net/estadoAnime');
                const data = await response.json();
                const estadosMap = data.reduce((acc, estado) => {
                    acc[estado.id] = estado.nombre;
                    return acc;
                }, {});
                setEstadosAnime(estadosMap);
            } catch (error) {
                console.error('Error fetching estadosAnime:', error);
            }
        };

        fetchProductos();
        fetchEstadosAnime();
    }, []);

    const cambiarPagina = (evento, nuevaPagina) => {
        setPagina(nuevaPagina);
    };

    const buscarElemento = (evento) => {
        const valor = evento.target.value.toLowerCase();
        setElementoBuscado(valor);
        setPagina(1); // Reiniciar la página a 1 cuando se realiza una nueva búsqueda
    };

    const productosFiltrados = productos.filter(producto =>
        producto.id.toString().toLowerCase().includes(elementoBuscado) ||
        producto.nombre.toLowerCase().includes(elementoBuscado) ||
        producto.genero.toLowerCase().includes(elementoBuscado)
    );

    const indiceInicio = (pagina - 1) * 15;
    const indiceFin = indiceInicio + 15;

    const verDetalleProducto = (id) => {
        window.open(`/detalleProducto/${id}`, '_blank');
    };

    const alternarEstadoProducto = async (id) => {
        const producto = productos.find(producto => producto.id === id);
        if (producto) {
            const nuevoEstadoAnimeId = producto.estadoAnimeId === 1 ? 2 : 1;
            const productoActualizado = { ...producto, estadoAnimeId: nuevoEstadoAnimeId };

            try {
                const response = await fetch(`https://backendgrupo4.azurewebsites.net/anime/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productoActualizado)
                });

                if (response.ok) {
                    setProductos(prevProductos => prevProductos.map(prod => prod.id === id ? productoActualizado : prod));
                } else {
                    console.error('Error updating product:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating product:', error);
            }
        }
    };

    const agregarProducto = () => {
        window.open('/agregarProducto', '_blank');
    };

    return (
        <Container maxWidth="auto">
            <Grid container spacing={1.5}>
                <Grid item xs={12}>
                    <Titulo titulo="Productos"/>
                </Grid>

                <Grid item xs={12}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Buscar por ID, nombre o género..."
                            inputProps={{ "aria-label": "search" }}
                            value={elementoBuscado}
                            onChange={buscarElemento}
                        />
                    </Search>
                </Grid>

                <Grid item xs={12}>
                    <TransparentTableContainer component={Paper}>
                        <TransparentTable>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <FirstRowTableCell>ID</FirstRowTableCell>
                                        <FirstRowTableCell>Nombre</FirstRowTableCell>
                                        <FirstRowTableCell>Género</FirstRowTableCell>
                                        <FirstRowTableCell>Precio</FirstRowTableCell>
                                        <FirstRowTableCell>Fecha de Registro</FirstRowTableCell>
                                        <FirstRowTableCell>Stock</FirstRowTableCell>
                                        <FirstRowTableCell>Estado</FirstRowTableCell>
                                        <FirstRowTableCell>Acciones</FirstRowTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productosFiltrados.slice(indiceInicio, indiceFin).map(producto => (
                                        <TableRow key={producto.id}>
                                            <TransparentTableCell>{producto.id}</TransparentTableCell>
                                            <TransparentTableCell>{producto.nombre}</TransparentTableCell>
                                            <TransparentTableCell>{producto.genero}</TransparentTableCell>
                                            <TransparentTableCell>{producto.precio}</TransparentTableCell>
                                            <TransparentTableCell>{new Date(producto.fechaRegistro).toLocaleDateString()}</TransparentTableCell>
                                            <TransparentTableCell>{producto.stock}</TransparentTableCell>
                                            <TransparentTableCell>{estadosAnime[producto.estadoAnimeId] || 'Desconocido'}</TransparentTableCell>
                                            <TransparentTableCell>
                                                <Button variant="contained" onClick={() => verDetalleProducto(producto.id)}>Ver</Button>
                                                <Button variant="contained" onClick={() => alternarEstadoProducto(producto.id)}>
                                                    {estadosAnime[producto.estadoAnimeId] === 'Activo' ? 'Desactivar' : 'Activar'}
                                                </Button>
                                            </TransparentTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TransparentTable>
                    </TransparentTableContainer>
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" onClick={agregarProducto}>Agregar Producto</Button>
                </Grid>

                <PaginationContainer item xs={12}>
                    <CustomPagination
                        count={Math.ceil(productosFiltrados.length / 15)}
                        page={pagina}
                        onChange={cambiarPagina}
                        variant="outlined"
                        shape="rounded"
                        previousButtonText="Anterior"
                    />
                </PaginationContainer>
            </Grid>
        </Container>
    );
};

export default ListaProductos;
