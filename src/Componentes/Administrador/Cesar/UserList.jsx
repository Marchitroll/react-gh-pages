import SearchIcon from "@mui/icons-material/Search";
import { Container, Grid } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Pagination from "@mui/material/Pagination";

import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

//Titulo
const UserTitle = () => {
    return (
        <div
        style={{
            backgroundColor: "#C9C9C9",
            width: "auto",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            height: "50px",
            paddingLeft: "15px",
            fontSize: "20px",
            fontWeight: "bold",
            borderRadius: "5px",
        }}>
        Usuarios Registrados
    </div>
    );
};

//Buscador
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up("sm")]: {
        width: "auto",
    },
    border: "2px solid #C9C9C9",
    width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
        width: "50ch",
        "&:focus": {
        width: "100ch",
        },
    },
    },
}));

//tabla de usuarios
const TransparentTableContainer = styled(TableContainer)({
    backgroundColor: "transparent",
    overflow: "hidden",
    height: "500px",
});

const TransparentTable = styled(Table)({
    border: "1px solid transparent",
    margin: "10px",
    padding: "5px",
});

const TransparentTableCell = styled(TableCell)({
    borderBottom: "none",
    color: "black",
    padding: "5px",
});

const FirstRowTableCell = styled(TransparentTableCell)({
    fontWeight: "bold",
    padding: "10px 5px 10px 5px",
});

//paginacion
const PaginationContainer = styled(Grid)({
    display: "flex",
    justifyContent: "flex-end",
});

const CustomPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": { border: "none" },
    "& .MuiPaginationItem-root:hover": { backgroundColor: "#a6d4f2" },
});

//Estilo de botones
const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
}

function UserList() {

    //Cambio de paginacion
    const [page, setPage] = useState(1);

    // Almacen de usuarios
    const [usuarios, setUsuarios] = useState([]);

    //Actualizado para usar la base de datos
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('https://backendgrupo4.azurewebsites.net/Usuario')
                const data = await response.json()
                setUsuarios(data)
            } catch (error) {
                console.error("Error en el fetch de usuarios: ", error)
            }
        }
        
        fetchUsuarios()
    }, []);

    //Actualizado para cambiar el estado en la base de datos
    const handleDesactivar = async (id) => {
        const usuarioActualizar = usuarios.find(user => user.id === id)

        if (!usuarioActualizar) {
            console.error(`User with ID ${id} not found.`);
            return;
        }

        const estadoActualizado = usuarioActualizar.estadoUsuarioId === 1 ? 2 : 1
        const { correo, nombre, apellido, contrasenia } = usuarioActualizar;

        const datosUsuario = {
            correo,
            nombre,
            apellido,
            contrasenia,
            estadoUsuarioId: estadoActualizado
        };

        try {
            const response = await fetch(`https://backendgrupo4.azurewebsites.net/Usuario/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosUsuario)
            });
            console.log(response)
            
            if (response.ok) {
                const usuarioActualizado = await response.json();
                const listaUsuariosAct = usuarios.map(user =>
                    user.id === id ? usuarioActualizado : user
                );
                setUsuarios(listaUsuariosAct);
            } else {
                console.error("Error al actualizar estado de usuario:", response.statusText);
            }

        } catch (error) {
            console.error("Error al actualizar estado de usuario: ", error)
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    // Calcula el índice inicial y final para mostrar los datos según la página actual
    const startIndex = (page - 1) * 10; // 10 elementos por página
    const endIndex = startIndex + 10;

    //Filtro del buscador
    const [searchItem, setSearchItem] = useState('');
    
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchItem(value);
    };

    //Normalizar texto
    const normalizar = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filteredUsers = usuarios.filter(user =>
        normalizar(user.nombre).includes(normalizar(searchItem)) ||
        normalizar(user.apellido).includes(normalizar(searchItem)) ||
        normalizar(user.correo).includes(normalizar(searchItem))
    ).sort((a,b) => a.id - b.id)

    return (
        <Container maxWidth="auto">
            <Grid container spacing={1.5}>
                <Grid item xs={12}>
                    <UserTitle />
                </Grid>

                <Grid item xs={12}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Buscar por correo, nombre o apellidos..."
                            inputProps={{ "aria-label": "search" }} 
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
                                        <FirstRowTableCell>Nombre</FirstRowTableCell>
                                        <FirstRowTableCell>Apellido</FirstRowTableCell>
                                        <FirstRowTableCell>Correo</FirstRowTableCell>
                                        <FirstRowTableCell>Fecha de Registro</FirstRowTableCell>
                                        <FirstRowTableCell>Estado</FirstRowTableCell>
                                        <FirstRowTableCell>Acciones</FirstRowTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredUsers.slice(startIndex, endIndex).map( row => (
                                        <TableRow key={row.id}>
                                            <TransparentTableCell>{row.id}</TransparentTableCell>
                                            <TransparentTableCell>{row.nombre}</TransparentTableCell>
                                            <TransparentTableCell>{row.apellido}</TransparentTableCell>
                                            <TransparentTableCell>{row.correo}</TransparentTableCell>
                                            <TransparentTableCell>{row.fechaRegistro}</TransparentTableCell>
                                            <TransparentTableCell>{row.estadoUsuarioId === 1 ? 'Activo' : 'Inactivo'}</TransparentTableCell>
                                            <TransparentTableCell>
                                                <button style={buttonStyle}><Link to={`/detalleUsuario/${row.id}`} target="_blank">Ver</Link></button>
                                                <button style={buttonStyle} onClick={() => handleDesactivar(row.id)}>
                                                        {row.estadoUsuarioId  === 1 ? 'Desactivar' : 'Activar'}</button>
                                            </TransparentTableCell>
                                        </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TransparentTable>
                    </TransparentTableContainer>
                </Grid>

                <PaginationContainer item xs={12}>
                    <CustomPagination
                        count={Math.ceil(filteredUsers.length/10)}
                        page={page}
                        onChange={handleChangePage}
                        variant="outlined"
                        shape="rounded"
                    />
                </PaginationContainer>
            </Grid>
        </Container>
    );
}

export default UserList;
