//-------------------------------------------------------------------------------//
//  PDF - PÁGINA 25 - A - Pantalla de Mantenimiento de Serie (Aregar / Detalle)  //
//-------------------------------------------------------------------------------//
// RESPONSABLE: FRANK //

//------------------------------------//
//  FUNCIONALIDADES DE LA PÁGINA 25A  //
//------------------------------------//
// [A] FUNCIONALIDADES AUTOMÁTICAS
// (A.1) En "TableBody", mostrar los datos acorde a los archivos json

// [B] FUNCIONALIDADES DE INTERACCIÓN
// (B.1) En "TextField" "Imagen", se muestra la imagen subida mediante el "Button" "Agregar imagen"
// (B.2) En "Button" "Agregar imagen", permite subir la imagen de la serie, se guarda en archivos (?)
// (B.3) En "TextField" "Nombre", posteriormente se tiene que guardar esta información en un archivo
// (B.4) En "TextField" "Descripción", posteriormente se tiene que guardar esta información en un archivo
// (B.4) En "Button" "+", muestra una ventana emergente "Pag25B"
// (B.5) En "Button" "Remover", se elimina la fila de la tabla
// (B.6) En "Button" "Guardar", se guardan los datos de una nueva serie en un archivo json

//IMPORT
import React, {useState, useEffect} from 'react';
import {Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Grid} from '@mui/material';

//FUNCTION
function Pag_25_A(){
    //MANEJO DE DATA
    const [data, setData] = useState([
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

    //MANEJO DE DATOS
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState('');
    const [productos, setProductos] = useState([
      { id: 1, descripcion: 'Manga Dragon Ball Vol 1' },
      { id: 2, descripcion: 'Manga Dragon Ball Vol 2' }
    ]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(loadEvent) {
                setImagen(loadEvent.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddProduct = () => {
        // Obtiene las dimensiones de la pantalla
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        // Abre la ventana
        // Arreglarrrr!!!
        window.open('/Pag25B', '_blank', `width=${screenWidth},height=${screenHeight}`);
    };
  
    const handleRemoveProduct = (id) => {
        alert("Se ha removido un producto");
        setProductos(prev => prev.filter(product => product.id !== id));
    };

    const handleAddSerie = () => {
        alert("Se ha añadido una serie");
        // Implementar lógica para agregar serie
    };
  

    //RETURN
    return(
        <Container component={Paper} sx={{p:4, height: '100vh', width: '100vw'}}>
            <Typography variant="body1" fontWeight="bold" sx={{px:2, py:1, mx:2, my:1, backgroundColor:'lightgrey', border:'4px solid grey'}}>
                Agregar Serie
            </Typography>

            <Box component="section" sx={{mb:4, display:'flex', justifyContent:'space-evenly'}}>
                <Grid container direction="row" sx={{display:'flex', justifyContent:'space-around', alignItems:'flex-start'}}>
                    <Grid item direction="column" sx={{py:2, minWidth:'40%', display:'flex', justifyContent:'center'}}>
                        {imagen && (
                            <Box mt={2} sx={{ display: 'flex', justifyContent: "center" }}>
                                <img src={imagen} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />
                            </Box>
                        )}

                        <Button variant="contained" component="label" sx={{my:4}}>
                            Agregar Imagen
                            <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                        </Button>
                    </Grid>

                    <Grid item sx={{py:2, minWidth:'55%'}}>
                        <Typography fontWeight="bold">
                            Nombre
                        </Typography>
                        
                        <TextField fullWidth required id="nombre" label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} sx={{mt:1, mb:2}}/>

                        <Typography fontWeight="bold">
                            Descripción
                        </Typography>

                        <TextField fullWidth required id="descripcion" label="Descripción" multiline rows={4} value={descripcion} onChange={e => setDescripcion(e.target.value)} sx={{mt:1, mb:2}}/>

                        <Typography fullWidth variant="body1" fontWeight="bold" sx={{px:2, py:1, backgroundColor:'lightgrey', display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            Productos en la serie
                            <Button variant="contained" onClick={handleAddProduct}> + </Button>
                        </Typography>

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
                                    {data.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row"> {row.id} </TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>
                                                <Button variant="outlined" onClick={handleRemoveProduct}>Remover</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box sx={{py:4, display:'flex', justifyContent:'flex-end'}}>
                            <Button variant="contained" sx={{px:4}} onClick={handleAddSerie}>
                                Guardar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Pag_25_A;
