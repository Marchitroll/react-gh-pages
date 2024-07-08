import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Container, Grid, Box } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import {useParams} from 'react-router-dom';
import { useState, useEffect} from 'react';

//Titulo
const CustomTitle = styled('div')({
    backgroundColor: '#C9C9C9',
    width: 'auto',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    height: '50px',
    paddingLeft: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '3px',
    border: '2px solid #333',
});

//Estilo de botones
const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
}

function OrderDetail() {
    //Seleccion de orden
    const {id} = useParams();

    const [orden, setOrden] = useState(null);
    const [metodoPago, setMetodoPago] = useState(null);
    const [estadoOrden, setEstadoOrden] = useState(null);
    const [distrito, setDistrito] = useState(null);
    const [numeroTarjeta, setNumeroTarjeta] = useState(null);
    const [qrImagen, setQRImagen] = useState(null);
    const [animeOrden, setAnimeOrden] = useState([]);
    const [animes, setAnimes] = useState([]);

    useEffect(() => {
        // Función para obtener la orden por ID
        const fetchOrden = async () => {
            try {
                const response = await fetch(`https://backendgrupo4.azurewebsites.net/orden/${id}`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener la orden.');
                }
                const data = await response.json();
                setOrden(data);
            } catch (error) {
                console.error('Error al obtener la orden:', error);
            }
        };

        // Función para obtener el tipo de pago por ID
        const fetchTipoPago = async () => {
            try {
                const response = await fetch('https://backendgrupo4.azurewebsites.net/tipodePago');
                if (!response.ok) {
                    throw new Error('No se pudo obtener los tipos de pago.');
                }
                const data = await response.json();
                const tipoPago = data.find(tipo => tipo.id === orden?.tipoPagoId);
                setMetodoPago(tipoPago);
            } catch (error) {
                console.error('Error al obtener los tipos de pago:', error);
            }
        };

        // Función para obtener el estado de orden por ID
        const fetchEstadoOrden = async () => {
            try {
                const response = await fetch('https://backendgrupo4.azurewebsites.net/estadoOrden');
                if (!response.ok) {
                    throw new Error('No se pudo obtener los estados de orden.');
                }
                const data = await response.json();
                const estado = data.find(estado => estado.id === orden?.estadoOrdenId);
                setEstadoOrden(estado);
            } catch (error) {
                console.error('Error al obtener los estados de orden:', error);
            }
        };

        // Función para obtener el distrito por ID
        const fetchDistrito = async () => {
            try {
                const response = await fetch(`https://backendgrupo4.azurewebsites.net/distrito/${orden.distritoId}`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener el distrito.');
                }
                const data = await response.json();
                setDistrito(data.nombre);
            } catch (error) {
                console.error('Error al obtener el distrito:', error);
            }
        };

        // Función para obtener el número de tarjeta por ID
        const fetchNumeroTarjeta = async () => {
            try {
                const response = await fetch(`https://backendgrupo4.azurewebsites.net/tarjeta/${metodoPago?.tarjetaId}`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener el número de tarjeta.');
                }
                const data = await response.json();
                setNumeroTarjeta(data.numeroTarjeta);
            } catch (error) {
                console.error('Error al obtener el número de tarjeta:', error);
            }
        };

        const fetchQRImagen = async () => {
            try {
                const response = await fetch(`https://backendgrupo4.azurewebsites.net/qr/${metodoPago?.qrId}`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener el QR.');
                }
                const data = await response.json();
                
                setQRImagen(data.direccionImagen);
            } catch (error) {
                console.error('Error al obtener la imagen del QR:', error);
            }
        };

        const fetchAnimeOrden = async () => {
            try {
                const response = await fetch('https://backendgrupo4.azurewebsites.net/animeorden');
                if (!response.ok) throw new Error('No se pudo obtener los animeorden.');
                const data = await response.json();
                const filteredData = data.filter(item => item.idOrden === parseInt(id));
                setAnimeOrden(filteredData);
            } catch (error) {
                console.error('Error al obtener los animeorden:', error);
            }
        };

        const fetchAnimes = async () => {
            try {
                const response = await fetch('https://backendgrupo4.azurewebsites.net/anime');
                if (!response.ok) throw new Error('No se pudo obtener los animes.');
                const data = await response.json();
                setAnimes(data);
            } catch (error) {
                console.error('Error al obtener los animes:', error);
            }
        };

        // Llamar a las funciones de fetch al cargar el componente
        fetchOrden();
        fetchTipoPago();
        fetchEstadoOrden();
        fetchDistrito();
        fetchNumeroTarjeta();
        fetchQRImagen();
        fetchAnimeOrden();
        fetchAnimes();
        
    }, [id, orden?.tipoPagoId, orden?.estadoOrdenId, orden?.distritoId, metodoPago?.tarjetaId, metodoPago?.qrId]);

    const handleCancelarPedido = async () => {
        try {
            const response = await fetch(`https://backendgrupo4.azurewebsites.net/orden/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Orden cancelada correctamente');
                window.location.href = '/admin' //redireccionar a admin
            } else {
                const data = await response.json()
                alert(`Error: ${data.message}`)
            }
        } catch (error) {
            console.error('Error al cancelar la orden:', error)
            alert('Error al cancelar la orden')
        }
    };

    if (!orden || !metodoPago || !estadoOrden || !qrImagen) {
        return <p>Cargando...</p>;
    }

    if(!orden){
        return <alert>Orden no Encontrado</alert>;
    }

    const calcularSubtotal = () => {
        let subtotal = 0;
        animeOrden.forEach(item => {
            const anime = animes.find(a => a.id === item.idAnime);
            if (anime) {
                subtotal += parseFloat(anime.precio);
            }
        });
        return subtotal.toFixed(2);
    };

    const calcularTotal = () => {
        const subtotal = parseFloat(calcularSubtotal())
        const costoEnvio = orden.metodoEnvioId === 1 ? 10.00 : 17.00;
        const impuesto = 18.00;
        const total = subtotal + costoEnvio + impuesto;
        return total
    };

    const cantidades = animeOrden.reduce((acc, item) => {
        const idAnime = item.idAnime.toString(); // Convertir a string para asegurar coherencia en las claves
        acc[idAnime] = acc[idAnime] ? acc[idAnime] + 1 : 1;
        return acc;
    }, {});

    return (
        <Container maxWidth='auto'>
        <Grid container spacing={1.5}>

            <Grid item xs={12}>
            <h3>Detalles de Orden Nro {orden.id}</h3>
            </Grid>

            <Grid item xs={12}>
            <CustomTitle>Datos de compra</CustomTitle>
            </Grid>

            <Grid item xs={6}>
                <Box sx={{
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        padding: '10px',
                        borderRadius: '5px', 
                        height: '350px',}}>
                    <div style={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                        marginBottom: '10px', }}>
                        Dirección de Envío
                    </div>
                    <div style={{ fontSize: '16px', marginLeft: '15px', marginRight: '10px'}}>
                        {orden.linea1 + " " + orden.linea2 + " " + distrito}
                    </div>
                </Box>
            </Grid>

            <Grid item xs={6}>
                <Box sx={{
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        padding: '10px',
                        borderRadius: '5px', 
                        height: '350px',}}>
                    <div style={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                        marginBottom: '10px', }}>
                        Pago
                    </div>
                    <div style={{ fontSize: '12px', marginLeft: '15px'}}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="metodo-de-pago"
                                name="metodo-de-pago"s
                                value={metodoPago.id === 1 ? 'qr' : 'tarjeta'}>
                                <FormControlLabel value="qr" control={<Radio/>} label="Pago con código QR" sx={{ fontSize: '14px' }} />
                                <FormControlLabel value="tarjeta" control={<Radio/>} label="Pago con tarjeta de crédito" sx={{ fontSize: '14px' }} />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    {metodoPago.id === 2 && (
                        <div style={{ fontSize: '16px', margin: '50px 10px 0px 15px'}}>
                        Tarjeta de Credito que termina en: ***{numeroTarjeta && numeroTarjeta.slice(-4)}
                    </div>
                    )}
                    {metodoPago.id === 1 && (
                            <div style={{ marginTop: '20px' }}>
                                <h3>QR de Pago:</h3>
                                <img src={qrImagen} alt="QR de Pago" style={{ maxWidth: '200px' }} />
                            </div>
                        )}
                </Box>
            </Grid>

            <Grid item xs={12}>
            <CustomTitle>Método de Envío</CustomTitle>
            </Grid>

            <Grid item xs={12}>
                <Box sx={{
                        backgroundColor: 'white',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        padding: '10px',
                        borderRadius: '5px', }}>
                    <div style={{ fontSize: '16px' }}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="metodo-de-envio"
                                name="metodo-de-envio"
                                value={orden.metodoEnvioId === 1 ? 'economico' : 'prioritario'}
                                row>
                                <FormControlLabel 
                                    value="economico"
                                    control={<Radio></Radio>}
                                    label="Económico Aéreo - S/10.00"  
                                    sx={{ marginLeft: '50px' }} />
                                <FormControlLabel
                                    value="prioritario"
                                    control={<Radio />}
                                    label="Envío prioritario (5 a 10 días) - S/17.00"
                                    sx={{ marginLeft: '50px' }} />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </Box>
            </Grid>

            <Grid item xs={6}>
                <Box sx={{
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    padding: '10px',
                    borderRadius: '5px',
                    height: '350px',
                    }}>
                    <div style={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                        marginBottom: '10px',
                    }}>
                        Items en Pedido:
                    </div>
                    <ul style={{ listStyleType: 'none' }}>
                        {Object.keys(cantidades).map(idAnime => {
                            const anime = animes.find(a => a.id === parseInt(idAnime))
                            const cantidad =  cantidades[idAnime]
                            return(
                                <li key={idAnime}>
                                    {
                                        anime ? `x${cantidad} ${anime.nombre} - S/.${anime.precio}` : "Cargando..."
                                    }
                                </li>
                            )
                        })

                        }
                    </ul>
                </Box>
            </Grid>

            <Grid item xs={6}>
                <Box sx={{
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    padding: '10px',
                    borderRadius: '5px',
                    height: '350px', }}>
                    <div style={{
                        fontWeight: 'bold',
                        fontSize: '18px',
                        marginBottom: '10px', }}>
                        Resumen de Orden
                    </div>
                    <div style={{
                        marginLeft: '30px'
                    }}>
                        <p>Subtotal: {calcularSubtotal()}</p>
                        <p>Envío: {orden.metodoEnvioId === 1 ? 'S/10.00' : 'S/17.00'}</p>
                        <p>Impuestos: S/18.00</p>
                        <p>Total: S/{calcularTotal()}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                        <Button style={buttonStyle} variant="outlined" sx={{width: '70%'}} onClick={handleCancelarPedido} >Cancelar Pedido</Button>
                    </div>
                </Box>
            </Grid>

        </Grid>
        </Container>
    )
};

export default OrderDetail;