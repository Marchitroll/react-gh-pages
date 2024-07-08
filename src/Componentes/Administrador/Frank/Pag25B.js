//-------------------------------------------------------------------//
//  PDF - PÁGINA 25 - B - Diálogo para agregar producto a una serie  //
//-------------------------------------------------------------------//
// RESPONSABLE: FRANK //

//------------------------------------//
//  FUNCIONALIDADES DE LA PÁGINA 25B  //
//------------------------------------//
// [A] FUNCIONALIDADES AUTOMÁTICAS
// (A.1) En "TableBody", mostrar los datos acorde a los archivos json "Productos.json"

// [B] FUNCIONALIDADES DE INTERACCIÓN
// (B.1) En "TextField" "Imagen", se muestra lo que uno escribe
// (B.4) En "Button" "Buscar", muestra las coincidencias del valor ingresado en "TextField" con los datos de la tabla
// (B.5) En "Button" "Agregar", se agrega la fila de esta tabla a la tabla de la página "Pag25A"

//IMPORT
import React, {useState, useEffect} from 'react';
import {Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Pagination, Grid} from '@mui/material';

//FUNCTION
function Pag_25_B(){
    //MANEJO DE DATA
    const [originalData] = useState([
        {
            id: 1,
            name: 'Manga Dragon Ball VIZ',
            description: 'Colección del manga de Dragon Ball publicada por VIZ',
            creationDate: '11/02/2022',
            productCount: 12
        },
        {
            id: 2,
            name: 'Manga Naruto VIZ',
            description: 'Colección del manga de Naruto publicada por VIZ',
            creationDate: '15/05/2022',
            productCount: 20
        },
        {
            id: 3,
            name: 'Manga One Piece VIZ',
            description: 'Colección del manga de One Piece publicada por VIZ',
            creationDate: '20/06/2022',
            productCount: 95
        }
    ]);

    // Estado para manejar los datos filtrados
    const [displayData, setDisplayData] = useState(originalData);
    
    return(
        <Container component={Paper} sx={{p:4, height: '100vh', width: '100vw'}}>
            <Typography fullWidth variant="body1" fontWeight="bold" sx={{px:2, py:1, backgroundColor:'lightgrey', border:'4px solid grey'}}>
                Agregar Producto
            </Typography>

            <Box sx={{mx:2, py:2, display:'flex', justifyContent:'space-around', alignItems:'center', flexDirection:'row'}}>
                <TextField 
                    fullWidth 
                    minWidth='80%' 
                    placeholder="Buscar por nombre, descripción o ID..."
                    onChange={(e) => {
                        const inputValue = e.target.value.toLowerCase();
                        const filteredData = originalData.filter(
                            item => item.name.toLowerCase().includes(inputValue) ||
                                    item.description.toLowerCase().includes(inputValue) ||
                                    item.id.toString().includes(inputValue)
                        );
                        setDisplayData(inputValue ? filteredData : originalData);
                    }}
                    InputProps={{ inputProps: { style: { fontStyle: 'italic' } } }}
                />
                <Button variant="contained" style={{ height: '40px' }} sx={{ mx: 4 }}>
                    Buscar
                </Button>
            </Box>

            <TableContainer fullWidth component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}> ID </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}> Descripción </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}> Acción </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {displayData.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"> {row.id} </TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>
                                    <Button variant="outlined">Agregar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Pag_25_B;