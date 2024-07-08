import SearchIcon from '@mui/icons-material/Search';
import { Container, Grid } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import * as React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Pagination from '@mui/material/Pagination';
import { useState , useEffect} from 'react';
import {Link} from 'react-router-dom';

//Titulo
const UserTitle = () => {
    return(
        <div style={{
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
            }}>
            Órdenes
        </div>
    )
}

//Buscador
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
    border: '2px solid #C9C9C9',
    width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
        width: '50ch',
        '&:focus': {
            width: '100ch',
        },
        },
    },
}));

//tabla de usuarios
const TransparentTableContainer = styled(TableContainer)({
    backgroundColor: 'transparent',
    overflow: 'hidden',
    height: "500px",
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

//paginacion
const PaginationContainer = styled(Grid)({
    display: 'flex',
    justifyContent: 'flex-end',
});

const CustomPagination = styled(Pagination)({
    '& .MuiPaginationItem-root': {
      border: 'none', // Borra los bordes de los números de la paginación
    },
    '& .MuiPaginationItem-root:hover': {
      backgroundColor: '#a6d4f2', // Cambia el color de fondo al pasar el mouse
    },
});

//Estilo de botones
const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
}

function OrderList() {
    const [page, setPage] = useState(1);
    const [ordenes, setOrdenes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [animeOrden, setAnimeOrden] = useState([]);
    const [animes, setAnimes] = useState([]);

    useEffect(() => {
        const fetchOrdenes = async () => {
            try {
                const response = await fetch('https://backendgrupo4.azurewebsites.net/orden');
                const data = await response.json();
                setOrdenes(data);
            } catch (error) {
                console.error("Error en el fetch de ordenes: ", error);
            }
        }
        
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('https://backendgrupo4.azurewebsites.net/usuario');
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error("Error en el fetch de usuarios: ", error);
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

        fetchUsuarios()
        fetchOrdenes()
        fetchAnimeOrden();
        fetchAnimes();
    }, []);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    // Calcula el índice inicial y final para mostrar los datos según la página actual
    const startIndex = (page - 1) * 10; // 10 elementos por página
    const endIndex = startIndex + 10;

    //Filtro de Ordenes
    const [searchItem, setSearchItem] = useState('');
    
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchItem(value);
    };

    //Normalizar texto
    const normalizar = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filteredOrders = ordenes.filter(order => {
        const usuario = usuarios.find(user => user.id === order.usuarioId);
        return usuario && (
            normalizar(usuario.nombre).includes(normalizar(searchItem)) ||
            normalizar(usuario.apellido).includes(normalizar(searchItem)) ||
            normalizar(usuario.correo).includes(normalizar(searchItem)) ||
            order.id.toString() === searchItem
        );
    });

    return (
        <Container maxWidth='auto'>
            <Grid container spacing={1.5}>

                <Grid item xs={12}>
                    <UserTitle/>
                </Grid>

                <Grid item xs={12}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Buscar por nombre o apellido de usuario o nro de orden..."
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchItem}
                            onChange={handleSearch}
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
                                        <FirstRowTableCell>Usuario</FirstRowTableCell>
                                        <FirstRowTableCell>Fecha de Orden</FirstRowTableCell>
                                        <FirstRowTableCell>Total</FirstRowTableCell>
                                        <FirstRowTableCell>Correo</FirstRowTableCell>
                                        <FirstRowTableCell>Estado</FirstRowTableCell>
                                        <FirstRowTableCell>Acciones</FirstRowTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredOrders.slice(startIndex,endIndex).map( row => {
                                        const usuario = usuarios.find(user => user.id === row.usuarioId);
                                        return(
                                            <TableRow key={row.id}>
                                            <TransparentTableCell>{row.id}</TransparentTableCell>
                                            <TransparentTableCell>{usuario.nombre + " " + usuario.apellido}</TransparentTableCell>
                                            <TransparentTableCell>{row.createdAt}</TransparentTableCell>
                                            <TransparentTableCell>{"S/. " + calcularTotal(row.id)}</TransparentTableCell>
                                            <TransparentTableCell>{usuario.correo}</TransparentTableCell>
                                            <TransparentTableCell>{
                                                row.estadoOrdenId === 1 ? 'Entregado' : 
                                                row.estadoOrdenId === 2 ? 'En proceso' : 'No entregado'
                                                }</TransparentTableCell>
                                            <TransparentTableCell>
                                                <button style={buttonStyle}><Link to={`/detalleOrden/${row.id}`} target="_blank">Ver</Link></button>
                                            </TransparentTableCell>
                                        </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TransparentTable>
                    </TransparentTableContainer>
                </Grid>

                <PaginationContainer item xs={12}>
                    <CustomPagination  
                        count={Math.ceil(ordenes.length/10)} 
                        page={page}
                        onChange={handleChangePage}
                        variant="outlined" 
                        shape="rounded" 
                    />
                </PaginationContainer>

            </Grid>
        </Container>
    )
};

export default OrderList;