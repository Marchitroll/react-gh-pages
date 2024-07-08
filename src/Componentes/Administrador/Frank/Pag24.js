//----------------------------------------------------//
//  PDF - PÁGINA 24 - Pantalla con Listado de Series  //
//----------------------------------------------------//
// RESPONSABLE: FRANK //

//-----------------------------------//
//  FUNCIONALIDADES DE LA PÁGINA 24  //
//-----------------------------------//
// [A] FUNCIONALIDADES AUTOMÁTICAS
// (A.1) En "TableBody", mostrar los datos acorde a los archivos json

// [B] FUNCIONALIDADES DE INTERACCIÓN
// (B.1) En "TextField", al escribir solo debe mostrarse las series cuyo nombre, descripción o ID coincida con el valor ingresado
// (B.2) En "Button" "Ver", se mostrar el contenido de la serie (?)
// (B.3) En "Pagination", dirigir a la página correspondiente

//IMPORT
import React, {useState, useEffect} from 'react';
import {Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Pagination} from '@mui/material';

//FUNCTION
function Pag_24() {
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
  
    // Estado para manejar los datos mostrados en la tabla (filtrados o no)
    const [displayData, setDisplayData] = useState(originalData);
  
    //RETURN
    return (
      <Container component={Paper} sx={{ p: 4, height: '100vh', width: '100vw' }}>
        <Typography variant="body1" fontWeight="bold" sx={{ px: 2, py: 1, mx: 2, my: 1, backgroundColor: 'lightgrey', border: '4px solid grey' }}>
          Series
        </Typography>
  
        <Box sx={{ mx: 2, py: 1 }}>
          <TextField
            fullWidth
            placeholder="Buscar por nombre, descripción o ID..."
            onChange={(e) => {
              const inputValue = e.target.value.toLowerCase();
              // Filtrar las series cuyo nombre, descripción o ID coincida con el valor ingresado
              const filteredData = originalData.filter((item) =>
                item.name.toLowerCase().includes(inputValue) ||
                item.description.toLowerCase().includes(inputValue) ||
                item.id.toString().includes(inputValue)
              );
              // Actualizar el estado con los datos filtrados si hay un valor en el TextField, de lo contrario, mostrar todos los datos
              setDisplayData(inputValue ? filteredData : originalData);
            }}
            InputProps={{ inputProps: { style: { fontStyle: 'italic' } } }}
          />
        </Box>
        <Box sx={{ mx: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Fecha de Creación</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nro. Productos</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayData.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.creationDate}</TableCell>
                    <TableCell>{row.productCount}</TableCell>
                    <TableCell>
                      <Button variant="outlined">Ver</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
  
        <Box sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination count={11} variant="outlined" shape="rounded" sx={{ '& .Mui-selected': { color: 'blue', backgroundColor: 'lightblue' } }} />
        </Box>
      </Container>
    );
  }
  
  export default Pag_24;
