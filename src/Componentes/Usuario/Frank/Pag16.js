//----------------------------------------------------------------------------------------------------//
//  PDF - PÁGINA 16 - Pantalla de detalle de una orden desde la lista de órdenes de usuario logueado  //
//----------------------------------------------------------------------------------------------------//
// RESPONSABLE: FRANK //

//-----------------------------------//
//  FUNCIONALIDADES DE LA PÁGINA 16  //
//-----------------------------------//
// [A] FUNCIONALIDADES AUTOMÁTICAS
// (A.1) En "Toda la página", mostrar los datos acorde al archivo json "Ordenes.json"
// (A.2) En "Resumen de la orden", calcular el subtotal, envío, impuestos, total

// [B] FUNCIONALIDADES DE INTERACCIÓN
// (B.1) En "Button" "Cancelar pedido" debe eliminar el pedido de los datos de los archivos json

//IMPORT
import React,{useState, useEffect} from 'react';
import {Container, Box, Card, CardContent, Grid, Typography, RadioGroup, FormControlLabel, Radio, Button, Paper} from '@mui/material';
import Lista_Ordenes from '../../../StaticData/Ordenes.json'

//FUNCTION
function Pag_16(){
    
    //DATOS
    const [datos_ordenes, setDatos_ordenes] = useState([]);  // "datos_ordenes" se inicializa con una lista vacía
    useEffect(() => {setDatos_ordenes(Lista_Ordenes);}, []); // Se cargan los datos del archivo "Ordenes.json" en "datos_ordenes"
    const orden_solicitada = datos_ordenes.find(orden => orden.id === 1) || {}; // "orden_solicitada" guarda el objeto cuyo "id" es "1"

    const handleCancelarPedido = (id) => {
        /*
        // CREACIÓN DE NUEVA LISTA
        const nuevos_datos_ordenes = datos_ordenes.filter(orden => orden.id !== id);
        */
    };

    const cst_subtotal = orden_solicitada.total ? parseFloat(orden_solicitada.total.substring(3)) : 0; // ¡¡CORREGIR!! SE DEBERÍA CALCULAR EN BASE A "ITEM EN PEDIDO"
    const cst_envio = orden_solicitada.metodoEnvio === "economico" ? 10.00 : 17.00;
    const cst_impuesto = parseFloat((cst_subtotal * 0.18).toFixed(2));
    const cst_total = cst_subtotal + cst_envio + cst_impuesto;

    //RETURN
    return (
        <>
            {Object.keys(orden_solicitada).length > 0 && (
            <Container component={Paper} sx={{p:4, height: '100vh', width: '100vw'}}>
                <Typography variant="h4" fontWeight="bold" sx={{px:2, mb:2}}>
                    Detalles de Orden Nro {orden_solicitada.nroOrden}
                </Typography>

                <Typography variant="body1" fontWeight="bold" sx={{px:2, py:1, mx:2, my:1, backgroundColor:'lightgrey', border:'4px solid grey'}}>
                    Datos de compra
                </Typography>
                
                <Box component="section" sx={{mx:2, mt:2, mb:4, display:'flex', justifyContent:'space-around'}}>
                    <Card sx={{minWidth:400, maxWidth:700}}>
                        <CardContent>
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography variant="body1" fontWeight="bold" sx={{m:1, p:1, backgroundColor:'lightblue', border:'2px solid black'}}>
                                        Dirección de envío
                                    </Typography>
                                </Grid>

                                <Grid item sx={{mx:4}}>
                                    <Typography variant="body1" sx={{px:1, py:0.8, backgroundColor:'lightgreen', border:'2px solid grey', whiteSpace:'pre-line', wordWrap:'break-word'}}>
                                        Línea 1: {orden_solicitada.direction}
                                    </Typography>
                                </Grid>

                                <Grid item sx={{mx:4}}>
                                    <Typography variant="body1" sx={{px:1, py:0.8, backgroundColor:'lightgreen', border:'2px solid grey', whiteSpace:'pre-line', wordWrap:'break-word'}}>
                                        Línea 2: {orden_solicitada.direction}
                                    </Typography>
                                </Grid>

                                <Grid item sx={{mx:4}}>
                                    <Typography variant="body1" sx={{px:1, py:0.8, backgroundColor:'lightgreen', border:'2px solid grey', whiteSpace:'pre-line', wordWrap:'break-word'}}>
                                        Distrito: {orden_solicitada.direction}
                                    </Typography>
                                </Grid>

                                <Grid item sx={{mx:4}}>
                                    <Typography variant="body1" sx={{px:1, py:0.8, backgroundColor:'lightgreen', border:'2px solid grey', whiteSpace:'pre-line', wordWrap:'break-word'}}>
                                        Ciudad: {orden_solicitada.direction}
                                    </Typography>
                                </Grid>

                                <Grid item sx={{mx:4}}>
                                    <Typography variant="body1" sx={{px:1, py:0.8, backgroundColor:'lightgreen', border:'2px solid grey', whiteSpace:'pre-line', wordWrap:'break-word'}}>
                                        País: {orden_solicitada.direction}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card sx={{minWidth:300}}>
                        <CardContent>
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography variant="body1" fontWeight="bold" sx={{m:1, p:1, backgroundColor:'lightblue', border:'2px solid black'}}>
                                        Pago
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <RadioGroup column value={orden_solicitada.metodoPago.tipo} sx={{mx:4}}>
                                        <FormControlLabel value="qr" control={<Radio/>} label="Pago con código QR" />
                                        <FormControlLabel value="tarjeta" control={<Radio/>} label="Pago con tarjeta de crédito" />
                                    </RadioGroup>

                                    <Typography variant="body1" sx={{m:4}}>
                                        {orden_solicitada.metodoPago.tipo === "tarjeta" ? (
                                            <> Tarjeta de crédito que termina en: ****{orden_solicitada.metodoPago.numeroTarjeta.slice(-4)} </>
                                        ) : (
                                            <>No hay información de tarjeta de crédito disponible</>
                                        )}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>

                <Typography variant="body1" fontWeight="bold" sx={{px:2, py:1, mx:2, my:1, backgroundColor:'lightgrey', border:'4px solid grey'}}>
                    Métodos de envío
                </Typography>

                <Card sx={{mx:2, mt:2, mb:1}}>
                    <CardContent sx={{pt:'24px'}}>
                        <RadioGroup row value={orden_solicitada.metodoEnvio} sx={{display:'flex', justifyContent:'space-evenly'}}>
                            <FormControlLabel sx={{mx:4}} value="economico" control={<Radio/>} label="Económico Aéreo - S/10.00"/>
                            <FormControlLabel sx={{mx:4}} value="prioritario" control={<Radio/>} label="Envío prioritario (5 a 10 días) - S/17.00" />
                        </RadioGroup>
                    </CardContent>
                </Card>

                <Box component="section" sx={{display:'flex', justifyContent:'space-around'}}>
                    <Card sx={{minWidth:400, maxWidth:600}}>
                        <CardContent>
                            <Typography variant="body1" fontWeight="bold" sx={{m:1, p:1, backgroundColor:'lightblue', border:'2px solid black'}}>
                                Item en pedido
                            </Typography>
                            
                            {/* ITEM EN PEDIDO */}
                            {/* Dependiendo de la cantidad de items en el pedido se tendrán que mostrar más filas*/}
                            <Grid container direction="row" sx={{display:'flex', justifyContent:'space-between', flexWrap: 'nowrap'}}>
                                <Grid item sx={{mx:2}}>
                                    <Typography variant="body1" sx={{p:'5px', mb:'5px', backgroundColor:'lightseagreen', border:'2px solid grey', whiteSpace:'pre-line', wordWrap:'break-word'}}>
                                        1x
                                    </Typography>
                                </Grid>

                                <Grid item width={400} sx={{mx:2}}>
                                    <Typography variant="body1" sx={{p:'5px', mb:'5px', backgroundColor:'lightgreen', border:'2px solid grey', whiteSpace:'pre-line', wordWrap:'break-word'}}>
                                        Juego de Cartas Pokemon Masters League
                                    </Typography>
                                </Grid>

                                <Grid item sx={{mx:2}}>
                                    <Typography variant="body1" sx={{p:'5px', mb:'5px', backgroundColor:'orange', border:'2px solid grey', whiteSpace:'pre-line', wordWrap:'break-word'}}>
                                        S/50.00
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container direction="row" sx={{display:'flex', justifyContent:'space-between', flexWrap: 'nowrap' }}>
                                <Grid item sx={{mx:2}}>
                                    <Typography variant="body1" sx={{p:'5px', mb:'5px', backgroundColor:'lightseagreen', border:'2px solid grey', whiteSpace:'pre-line', wordWrap:'break-word'}}>
                                        2x
                                    </Typography>
                                </Grid>

                                <Grid item width={400} sx={{mx:2}}>
                                    <Typography variant="body1" sx={{p:'5px', mb:'5px', backgroundColor:'lightgreen', border:'2px solid grey', whiteSpace:'pre-line', wordWrap:'break-word'}}>
                                        Juego de Cartas Magic The Gathering
                                    </Typography>
                                </Grid>

                                <Grid item sx={{mx:2}}>
                                    <Typography variant="body1" sx={{p:'5px', mb:'5px', backgroundColor:'orange', border:'2px solid grey', whiteSpace:'pre-line', wordWrap:'break-word'}}>
                                        S/50.00
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card sx={{minWidth:300}}>
                        <CardContent>
                            <Typography variant="body1" fontWeight="bold" sx={{m:1, p:1, backgroundColor:'lightblue', border:'2px solid black'}}>
                                Resumen de la orden
                            </Typography>

                            <Grid direction="column" sx={{m:2}}>
                                {/* ¡¡MODIFICAR!! - Mostrar los valores respectivos de la orden */}
                                <Typography sx={{display:'flex', justifyContent:'center'}}>
                                    Subtotal: S/{cst_subtotal.toFixed(2)}
                                </Typography>
                                <Typography sx={{display:'flex', justifyContent:'center'}}> 
                                    Envío: S/{cst_envio.toFixed(2)}
                                </Typography>
                                <Typography sx={{display:'flex', justifyContent:'center'}}>
                                    Impuestos: S/{cst_impuesto.toFixed(2)}
                                </Typography>
                                <Typography sx={{display:'flex', justifyContent:'center'}}>
                                    Total: S/{cst_total.toFixed(2)}
                                </Typography>
                            </Grid>

                            <Grid sx={{display:'flex', justifyContent:'center'}}>
                                <Button variant="contained" color="warning" onClick={() => handleCancelarPedido(orden_solicitada.id)}>
                                    Cancelar Pedido
                                </Button>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
            )}
        </>
    );
}

export default Pag_16;

