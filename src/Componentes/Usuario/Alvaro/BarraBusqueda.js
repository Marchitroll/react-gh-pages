import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ItemCard from './itemcard';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff',
  border: '1px solid #000',
  marginRight: theme.spacing(1),
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#808080',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#808080',
  },
}));

const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '50%',
  },
  margin: '0 auto',
}));

const NoResultsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '10vh',
  textAlign: 'center',
}));

export default function SearchAppBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
        const response = await fetch(`https://backendgrupo4.azurewebsites.net/anime?nombre=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResults(data);
        setSearched(true);
    } catch (error) {
        console.error('Error searching anime:', error);
    }
};


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <SearchContainer>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar anime por nombre..."
                sx={{ fontStyle: 'italic' }}
                inputProps={{ 'aria-label': 'search' }}
                value={query}
                onChange={handleInputChange}
              />
            </Search>
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ backgroundColor: '#D3D3D3', color: '#000', '&:hover': { backgroundColor: '#A9A9A9' } }}
            >
              Buscar
            </Button>
          </SearchContainer>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        {searched && results.length === 0 ? (
          <NoResultsContainer>
            <Typography variant="body1">No se encontraron animes</Typography>
          </NoResultsContainer>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {results.map((anime) => (
              <Grid item key={anime.id}>
                <ItemCard
                  title={anime.nombre}
                  description={anime.genero}
                  imageUrl={anime.urlImagen}
                  onLearnMore={() => alert(`Más información sobre: ${anime.title}`)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
