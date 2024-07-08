//import QrCode2Icon from '@mui/icons-material/QrCode2';
import { Box, Button, Container, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BarraDeNavegacion from "../../BarraCompleta";
import PieDePaginaTODOS from '../../../Componentes/PieDePaginaTODOS';


// Botón de pago con estado controlado
function BotonPagoQ() {
    const [valor, setValor] = React.useState("female");
    const handleChange = (e) => {
        setValor((e.target.value));
    };
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valor}
                onChange={handleChange}
            >
                <FormControlLabel value="female" control={<Radio />} label="Pago con código QR" />
                <FormControlLabel value="male" control={<Radio />} label="Pago con tarjeta de crédito" />
            </RadioGroup>
        </FormControl>
    );
}

// Botón de pago
function BotonPago({ handlePaymentMethodChange }) {
    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                onChange={(e) => handlePaymentMethodChange(e.target.value)}
            >
                <FormControlLabel value="QR" control={<Radio />} label="Pago con código QR" />
                <FormControlLabel value="Tarjeta" control={<Radio />} label="Pago con tarjeta de crédito" />
            </RadioGroup>
        </FormControl>
    );
}

// Botón de envío con estado controlado
function BotonEnvioQ({ handleEnvioChange }) {
    const [valor, setValor] = React.useState("");
    const [metodosEnvio, setMetodosEnvio] = useState([]);

    useEffect(() => {
        // Hacer una solicitud fetch al backend para obtener los métodos de envío
        fetch('https://backendgrupo4.azurewebsites.net/metodoEnvio')
            .then(response => response.json())
            .then(data => {
                // Filtrar y transformar los datos recibidos para obtener solo los campos específicos
                const filteredData = data.map(metodo => ({
                    nombre: metodo.nombre,
                    precio: Number(metodo.precio) // Asegúrate de que el precio sea un número
                }));
                console.log('Fetched and filtered data:', filteredData);  // Mensaje de depuración
                setMetodosEnvio(filteredData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleChange = (e) => {
        const seleccionado = e.target.value;
        const metodoSeleccionado = metodosEnvio.find(metodo => metodo.nombre === seleccionado);
        const precio = metodoSeleccionado ? metodoSeleccionado.precio : 0;
        console.log('Selected value:', e.target.value, 'Precio:', precio);  // Mensaje de depuración
        setValor(seleccionado);
        handleEnvioChange(seleccionado, precio);
    };

    if (metodosEnvio.length === 0) {
        return <p>Cargando métodos de envío...</p>;
    }

    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={valor}
                onChange={handleChange}
                row
            >
                {metodosEnvio.map((metodo) => (
                    <FormControlLabel 
                        key={metodo.id} 
                        value={metodo.nombre} 
                        control={<Radio />} 
                        label={`${metodo.nombre} - S/${metodo.precio}`} 
                        sx={{ m: 2 }} 
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}



// Componente principal Cuerpo
function Cuerpo() {

    const location = useLocation();
    const navigate = useNavigate();
    const [subtotal, setSubtotal] = useState(0);
    const [metodoEnvio, setMetodoEnvio] = useState(""); // Estado para el método de envío seleccionado
    const [precioEnvio, setPrecioEnvio] = useState(0); // Estado para el precio del envío
    const [total, setTotal] = useState(0);
    const impuestos = 18;
    const [qrImageUrl, setQrImageUrl] = useState('');

    useEffect(() => {
        // Cargar selección de envío desde localStorage al cargar la página
        const savedEnvio = localStorage.getItem('metodoEnvio');
        if (savedEnvio) {
            setMetodoEnvio(savedEnvio);
        }

        // Cargar selección de pago desde localStorage al cargar la página
        const savedPago = localStorage.getItem('paymentMethod');
        if (savedPago) {
            setPaymentMethod(savedPago);
        }
    }, []);

    useEffect(() => {
        // Calculamos el subtotal al cargar la página
        let total = 0;
        if (location.state && location.state.productos) {
            location.state.productos.forEach((producto) => {
                total += producto.subtotal;
            });
        }
        setSubtotal(total);
    }, [location.state]);

    const handleCheckOut = async () => {
        if (!location.state || !location.state.productos) {
            console.error('No se encontraron productos en el estado de la ubicación');
            return;
        }
    
        const orden = {
            linea1: document.getElementById('linea1').value,
            linea2: document.getElementById('linea2').value,
            usuarioId: JSON.parse(localStorage.getItem('usuarioEnSesion')).id,
            metodoEnvioId: metodoEnvio === 'Económico Aéreo' ? 1 : 2, // Ajustar según tu lógica de selección
            tipoPagoId: paymentMethod === 'QR' ? 2 : 1, // Ajustar según tu lógica de selección
            estadoOrdenId: 2, // Estado fijo según tu especificación
            distritoId: 5, // Distrito fijo según tu especificación
        };
    
        try {
            const response = await fetch('https://backendgrupo4.azurewebsites.net/orden', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orden),
            });
    
            if (!response.ok) {
                throw new Error('Error al completar la orden');
            }
    
            // Si la respuesta es exitosa, puedes redirigir al usuario a la página de confirmación u otra página relevante
            navigate('/parte3');
        } catch (error) {
            console.error('Error al completar la orden:', error.message);
            // Manejar el error aquí según sea necesario (mostrar mensaje al usuario, registrar en consola, etc.)
        }
    };
    

    const handleEnvioChange = (metodo, precio) => {
        setMetodoEnvio(metodo); // Función para actualizar el método de envío seleccionado
        setPrecioEnvio(precio);
        localStorage.setItem('metodoEnvio', metodo); // Guardar selección de envío en localStorage
    };

    const handleSubtotalCambio = (nuevoSubtotal) => {
        setSubtotal(nuevoSubtotal);
    }

    useEffect(() => {
        const total = subtotal + precioEnvio + impuestos;
        setTotal(total);
    }, [subtotal, precioEnvio, impuestos]);

    useEffect(() => {
        fetch('https://backendgrupo4.azurewebsites.net/qr') // Ajusta el puerto y la URL según la configuración de tu backend
            .then(response => response.json())
            .then(data => {
                // Obtener una URL aleatoria de las imágenes de códigos QR
                const shuffledImages = data.sort(() => 0.5 - Math.random());
                const randomImageUrl = shuffledImages[0].direccionImagen; // Asegúrate de acceder al campo correcto de la respuesta
                setQrImageUrl(randomImageUrl);
            })
            .catch(error => console.error('Error fetching QR image data:', error));
    }, []);
    





    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        localStorage.setItem('paymentMethod', method); // Guardar selección de pago en localStorage
    };

    return (
        <>
            <Container sx={{ backgroundColor: "rgba(246,246,246,255)" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box sx={{ marginTop: 8, paddingLeft: 2, paddingTop: 2 }}>
                            <Typography sx={{ fontSize: "25px" }}>
                                ¡Casi Listo! Tu orden no estará completa hasta que revises y presiones el botón "completar orden" al final de la página
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ paddingLeft: 2, backgroundColor: "rgba(217,217,217,255)", border: "2px solid black" }}>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Datos de Compra
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", paddingTop: "20px" }}>
                            <Box sx={{ padding: '5px', backgroundColor: '#FFFFFF', flexGrow: 1 }}>
                                <Box>
                                    <Typography sx={{ fontWeight: 'bold' }}>Dirección de envío</Typography>
                                </Box>
                                <Box sx={{ paddingBottom: '10px', paddingTop: '10px', width: '100%' }}>
                                    <TextField variant="outlined" label="Linea 1" fullWidth id="linea1" />
                                </Box>
                                <Box sx={{ paddingBottom: '10px', paddingTop: '10px', width: '100%' }}>
                                    <TextField variant="outlined" label="Linea 2" fullWidth id="linea2" />
                                </Box>
                                <Box sx={{ paddingBottom: '10px', paddingTop: '10px' }}>
                                    <TextField variant="outlined" label="Distrito" fullWidth id="distrito" />
                                </Box>
                                <Box sx={{ paddingBottom: '10px', paddingTop: '10px' }}>
                                    <TextField variant="outlined" label="Ciudad" fullWidth id="ciudad" />
                                </Box>
                                <Box sx={{ paddingBottom: '10px', paddingTop: '10px' }}>
                                    <TextField variant="outlined" label="Pais" fullWidth id="pais" />
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", paddingTop: "20px" }}>
                            <Box sx={{ backgroundColor: "#FFFFFF", padding: "5px", flexGrow: 1 }}>
                                <Box> <Typography sx={{ fontWeight: "bold" }}> Pago </Typography></Box>
                                <Box> <BotonPago handlePaymentMethodChange={handlePaymentMethodChange} /> </Box>
                                {paymentMethod === 'QR' && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: "50px" }}>
                                        <img src={qrImageUrl} alt="QR Code" style={{ width: 200, height: 200 }} /> 
                                    </Box>

                                )}
                                {paymentMethod === 'Tarjeta' && (
                                    <>
                                        <Box sx={{ paddingBottom: "10px", paddingTop: "10px" }}> <TextField variant="outlined" label="Numero de Tarjeta" fullWidth /></Box>
                                        <Box sx={{ paddingBottom: "10px", paddingTop: "10px" }}> <TextField variant="outlined" label="Nombre en Tarjeta" fullWidth /></Box>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Box sx={{ paddingBottom: "10px", paddingTop: "10px", flexGrow: 1 }}> <TextField variant="outlined" label="Vencimiento" fullWidth /></Box>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Box sx={{ paddingBottom: "10px", paddingTop: "10px", flexGrow: 1 }}> <TextField variant="outlined" label="CVV" fullWidth /></Box>
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ paddingTop: "40px" }}>
                        <Box sx={{ paddingLeft: 2, backgroundColor: "rgba(217,217,217,255)", border: "2px solid black" }}>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Método de Envío
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid>
                    <Box sx={{ paddingBottom: "20px", paddingTop: "20px" }}>
                        <Box sx={{ backgroundColor: "#FFFFFF" }}> <BotonEnvioQ handleEnvioChange={handleEnvioChange} /> {/* Renderizar el componente BotonEnvioQ */} </Box>
                    </Box>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            <Box sx={{ padding: "5px", backgroundColor: "#FFFFFF", flexGrow: 1 }}>
                                <Box> <Typography sx={{ fontWeight: "bold" }}> Items en Pedido </Typography></Box>
                                {/* Mostramos los datos de los "Items en Pedido" recibidos de la página 1 */}
                                {location.state && location.state.productos && location.state.productos.map((producto, index) => (
                                    <Grid container spacing={2} key={index}>
                                        <Grid item xs={6}>
                                            <Box sx={{ paddingLeft: "30px" }}> <Typography>{producto.cantidad} x {producto.nombre}</Typography></Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box sx={{ paddingLeft: "80px" }}> <Typography> S/ {producto.subtotal.toFixed(2)}</Typography></Box>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sx={{ padding: "15px" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                            <Box sx={{ padding: "5px", backgroundColor: "#FFFFFF", flexGrow: 1 }}>
                                <Box> <Typography sx={{ fontWeight: "bold" }}> Resumen de orden </Typography></Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box sx={{ paddingLeft: "30px" }}> <Typography> SubTotal: </Typography></Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box sx={{ paddingLeft: "80px" }}> <Typography> S/ {subtotal.toFixed(2)} </Typography></Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box sx={{ paddingLeft: "30px" }}> <Typography> Envío: </Typography></Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box sx={{ paddingLeft: "80px" }}> <Typography> S/ {precioEnvio.toFixed(2)} </Typography></Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box sx={{ paddingLeft: "30px" }}> <Typography> Impuestos: </Typography></Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box sx={{ paddingLeft: "80px" }}> <Typography> S/ {impuestos.toFixed(2)}</Typography></Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Box sx={{ paddingLeft: "30px" }}> <Typography> Total: </Typography></Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box sx={{ paddingLeft: "80px" }}> <Typography> S/ {total.toFixed(2)} </Typography></Box>
                                    </Grid>
                                </Grid>
                                <Box sx={{ textAlign: 'center' }}> <Button onClick={handleCheckOut} sx={{ backgroundColor: "#000000", borderColor: "#000000", color: "#FFFFFF" }}>Completar orden</Button> </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}


function PaginaSebas2() {
    return (
        <div>
            <BarraDeNavegacion />
            <Cuerpo />
            <PieDePaginaTODOS />
        </div>
    )
}

export default PaginaSebas2