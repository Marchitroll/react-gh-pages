import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

function Barrita() {
    return (
        <AppBar position='fixed' sx={{ backgroundColor: "rgb(19, 25, 33)" }}>
            <Container>
                <Toolbar>
                    <MenuItem>
                        <Typography variant='h6' sx={{ color: "white", fontWeight: "bold", textDecoration: 'none', '&:hover': {textDecoration: 'none'}}} component={Link} to="/paginaAlvaro1">
                            TIENDA
                        </Typography>
                    </MenuItem>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Barrita;
