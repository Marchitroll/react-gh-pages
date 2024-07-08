import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import {useParams, Link} from 'react-router-dom';
import { useEffect, useState } from 'react';

//Titulo
const CustomTitle = styled('div')({
    backgroundColor: '#C9C9C9',
    width: 'auto',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    height: '50px',
    paddingLeft: '15px',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '5px',
});

//tabla de usuarios
const TransparentTableContainer = styled(TableContainer)({
    backgroundColor: 'transparent',
    overflow: 'hidden',
  height: '500px' //lo dejo asi por el momento
});

const TransparentTable = styled(Table)({
    border: '1px solid transparent',
    margin: '10px',
    padding: '5px',
});

const TransparentTableCell = styled(TableCell)({
    borderBottom: 'none',
    color: 'black',
    padding: '5px',
});

const FirstRowTableCell = styled(TransparentTableCell)({
    fontWeight: 'bold',
    padding: '10px 5px 10px 5px',
});

//Estilo de botones
const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
}

function UserDetail() {

    // LocalStorage almacen de usuarios
    const { id } = useParams();
    const userId = parseInt(id);
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [ordenes, setOrdenes] = useState([]);
    const [animeOrden, setAnimeOrden] = useState([]);
    const [animes, setAnimes] = useState([]);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await fetch(`https://backendgrupo4.azurewebsites.net/Usuario/${userId}`);
                const data = await response.json();
                setUsuario(data);
            } catch (error) {
                console.error("Error en el fetch de usuario: ", error)
            } finally {
                setTimeout(() => setIsLoading(false), 1000);
            }
        }

        const fetchOrdenes = async () => {
            try {
                const response = await fetch('https://backendgrupo4.azurewebsites.net/Orden');
                const data = await response.json();
                setOrdenes(data);
            } catch (error) {
                console.error('Error en el fetch de ordenes:', error);
            }
        }

        const fetchAnimeOrden = async () => {
            try {
                const response = await fetch('https://backendgrupo4.azurewebsites.net/animeorden');
                if (!response.ok) throw new Error('No se pudo obtener los animeorden.');
                const data = await response.json();
                setAnimeOrden(data);
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

        fetchOrdenes()
        fetchUsuario()
        fetchAnimeOrden();
        fetchAnimes();
    }, [userId]);

    const calcularSubtotal = (orderId) => {
        let subtotal = 0;
        const orderAnimes = animeOrden.filter(item => item.idOrden === orderId);
        orderAnimes.forEach(item => {
            const anime = animes.find(a => a.id === item.idAnime);
            if (anime) {
                subtotal += parseFloat(anime.precio);
            }
        });
        return subtotal.toFixed(2);
    };

    const calcularTotal = (orderId) => {
        const subtotal = parseFloat(calcularSubtotal(orderId));
        const orden = ordenes.find(order => order.id === orderId);
        const costoEnvio = orden.metodoEnvioId === 1 ? 10.00 : 17.00;
        const impuesto = 18.00; // impuesto fijo
        const total = subtotal + costoEnvio + impuesto;
        return total.toFixed(2);
    };

    const calcularCantidadTotal = (orderId) => {
        const orderAnimes = animeOrden.filter(item => item.idOrden === orderId);
        return orderAnimes.length;
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if(!usuario){
        return <alert>Usuario no Encontrado</alert>;
    }

    //Ordenes por usuario
    const userOrders = ordenes.filter(order => order.usuarioId === userId);

    return (
    <Container maxWidth='auto'>
        <Grid container spacing={1.5}>
            <Grid item xs={12}>
                <CustomTitle>Detalle de Usuario Registrado</CustomTitle>
            </Grid>

            <Grid item xs={12}>
                <TransparentTableContainer component={Paper} sx={{ height: 'auto' }}>
                    <TransparentTable>
                        <Table>
                            <TableBody>
                                <TransparentTableCell><b>ID:</b> {usuario.id}</TransparentTableCell>
                                <TransparentTableCell><b>Nombre:</b> {usuario.nombre + " " + usuario.apellido}</TransparentTableCell>
                                <TransparentTableCell><b>Correo:</b> {usuario.correo}</TransparentTableCell>
                                <TransparentTableCell><b>Fecha de Registro:</b> {usuario.fechaRegistro}</TransparentTableCell>
                            </TableBody>
                        </Table>
                    </TransparentTable>
                </TransparentTableContainer>
            </Grid>

            <Grid item xs={12}>
                <CustomTitle>Órdenes recientes (Maximo 10)</CustomTitle>
            </Grid>

            <Grid item xs={12}>
                <TransparentTableContainer component={Paper}>
                    <TransparentTable>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <FirstRowTableCell>ID</FirstRowTableCell>
                                    <FirstRowTableCell>Fecha de Orden</FirstRowTableCell>
                                    <FirstRowTableCell>Total</FirstRowTableCell>
                                    <FirstRowTableCell>Productos</FirstRowTableCell>
                                    <FirstRowTableCell>Estado</FirstRowTableCell>
                                    <FirstRowTableCell>Acciones</FirstRowTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {userOrders.slice(0,10).map((row) => (
                                <TableRow key={row.id}>
                                    <TransparentTableCell>{row.id}</TransparentTableCell>
                                    <TransparentTableCell>{row.createdAt}</TransparentTableCell>
                                    <TransparentTableCell>{"S/. " + calcularTotal(row.id)}</TransparentTableCell>
                                    <TransparentTableCell>{calcularCantidadTotal(row.id)}</TransparentTableCell>
                                    <TransparentTableCell>{
                                        row.estadoOrdenId === 1 ? 'Entregado' : 
                                        row.estadoOrdenId === 2 ? 'En proceso' : 'No entregado'
                                        }</TransparentTableCell>
                                    <TransparentTableCell>
                                        <button style={buttonStyle}><Link to={`/detalleOrden/${row.id}`} target="_blank">Ver</Link></button>
                                    </TransparentTableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TransparentTable>
                </TransparentTableContainer>
            </Grid>

        </Grid>
    </Container>
    )
};

export default UserDetail;