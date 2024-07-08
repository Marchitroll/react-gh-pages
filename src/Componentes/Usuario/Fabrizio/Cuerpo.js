import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BarraDeNavegacion from "../../BarraCompleta";
import PieDePaginaTODOS from '../../../Componentes/PieDePaginaTODOS';

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function SelectorCantidad({ precio, onCantidadChange }) {
    const [cantidad, setCantidad] = useState(1);

    const handleChangeSelector = (e) => {
        const newCantidad = parseInt(e.target.value);
        setCantidad(newCantidad);
        onCantidadChange(newCantidad);
    };

    return (
        <div className="quantity-selector">
            <input type="number" value={cantidad} onChange={handleChangeSelector} min="1" />
        </div>
    );
}

function Cuerpo() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [guardados, setGuardados] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Hacer una solicitud fetch al backend para obtener todos los animes
        fetch('https://backendgrupo4.azurewebsites.net/anime')
            .then(response => response.json())
            .then(data => {
                // Obtener solo 3 animes aleatorios
                const shuffledAnimes = data.sort(() => 0.5 - Math.random());
                const selectedAnimes = shuffledAnimes.slice(0, 3);
                const productosInicializados = selectedAnimes.map(anime => ({
                    ...anime,
                    cantidad: 1,
                    subtotal: anime.precio * 1  // Inicializar subtotal igual al precio por cantidad inicial
                }));
                setProductos(productosInicializados);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleCheckout = () => {
        
        navigate('/parte2', { state: { productos } });
    };

    const handleCantidadChange = (id, newCantidad) => {
        const updatedProductos = productos.map((producto) =>
            producto.id === id
                ? {
                    ...producto,
                    cantidad: newCantidad,
                    subtotal: newCantidad * producto.precio,
                }
                : producto
        );
        setProductos(updatedProductos);
    };

    const handleEliminar = (id) => {
        setProductos(productos.filter((producto) => producto.id !== id));
    };

    const handleGuardarParaDespues = (id) => {
        const productoGuardado = productos.find((producto) => producto.id === id);
        setGuardados([...guardados, { ...productoGuardado, id: generateUniqueId() }]);
        setProductos(productos.filter((producto) => producto.id !== id));
    };

    const handleEliminarGuardado = (id) => {
        setGuardados(guardados.filter((guardado) => guardado.id !== id));
    };

    useEffect(() => {
        // Calcular el total cada vez que productos cambia
        const newTotal = productos.reduce((acc, producto) => acc + (producto.subtotal || 0), 0);
        setTotal(newTotal);
    }, [productos]);

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box sx={{ marginTop: 8, paddingLeft: 2, paddingTop: 2 }}>
                        <Typography sx={{ fontSize: "25px" }}>
                            {productos.length} Items en tu Carrito de Compras
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ paddingLeft: 2, backgroundColor: "rgba(217, 217, 217, 1)", border: "2px solid black" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Items Disponibles para Envío
                        </Typography>
                    </Box>
                </Grid>

                {productos.map((producto) => (
                    <Grid item xs={12} key={producto.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', padding: 0.5, border: "1px solid #ccc", marginBottom: 2 }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 128, height: 128 } }}>
                                <Paper elevation={3} sx={{ backgroundImage: `url(${producto.urlImagen})`, backgroundSize: 'cover', backgroundPosition: 'center', width: 100, height: 128, marginRight: 2 }} />
                            </Box>

                            <Box sx={{ flexGrow: 1, display: 'grid', gridTemplateRows: '1fr auto' }}>
                                <Typography variant="subtitle1">{producto.nombre}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Link component="button" variant="body2" sx={{ color: "inherit" }} onClick={() => handleEliminar(producto.id)}>
                                        Eliminar
                                    </Link>
                                    <span> | </span>
                                    <Link component="button" variant="body2" sx={{ color: "inherit" }} onClick={() => handleGuardarParaDespues(producto.id)}>
                                        Guardar para después
                                    </Link>
                                </Box>
                            </Box>

                            <Box>
                                <Typography>Cantidad:
                                    <SelectorCantidad precio={producto.precio} onCantidadChange={(newCantidad) => handleCantidadChange(producto.id, newCantidad)} />
                                </Typography>
                            </Box>

                            <Box>
                                <Typography>Precio: S/{producto.precio}</Typography>
                            </Box>
                            <Box>
                                <Typography>Subtotal: S/{producto.subtotal.toFixed(2)}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Box sx={{ paddingLeft: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography>
                            Total: {total.toFixed(2)} soles
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ paddingLeft: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleCheckout} sx={{ backgroundColor: "#000000", borderColor: "#000000", color: "#FFFFFF" }}>
                        Checkout
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ paddingLeft: 2, backgroundColor: "rgba(217, 217, 217, 1)", border: "2px solid black" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Guardado para después
                        </Typography>
                    </Box>
                </Grid>

                {guardados.map((guardado) => (
                    <Grid item xs={12} key={guardado.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', padding: 0.5, border: "1px solid #ccc", marginBottom: 2 }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 128, height: 128 } }}>
                                <Paper elevation={3} sx={{ backgroundImage: `url(${guardado.urlImagen})`, backgroundSize: 'cover', backgroundPosition: 'center', width: 100, height: 128, marginRight: 2 }} />
                            </Box>

                            <Box sx={{ flexGrow: 1, display: 'grid', gridTemplateRows: '1fr auto' }}>
                                <Typography variant="subtitle1">{guardado.nombre}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Link component="button" variant="body2" sx={{ color: "inherit" }} onClick={() => handleEliminarGuardado(guardado.id)}>
                                        Eliminar
                                    </Link>
                                </Box>
                            </Box>

                            <Box>
                                <Typography>Cantidad: {guardado.cantidad}</Typography>
                            </Box>

                            <Box>
                                <Typography>Precio: S/{guardado.precio}</Typography>
                            </Box>
                            <Box>
                                <Typography>Subtotal: S/{(guardado.cantidad * guardado.precio).toFixed(2)}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

function PaginaSebas1() {
    return (
        <div>
            <BarraDeNavegacion />
            <Cuerpo />
            <PieDePaginaTODOS />
        </div>
    )
}

export default PaginaSebas1;
