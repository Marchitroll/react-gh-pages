import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MasterPassword = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin) {
      navigate('/admin');
    }
  }, [navigate]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (password === 'ulima-2024') {
      sessionStorage.setItem('isAdmin', 'true');
      onSuccess();
      navigate('/admin');
    } else {
      alert('Contraseña incorrecta');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Ingresa la contraseña maestra
      </Typography>
      <TextField
        type="password"
        label="Contraseña"
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Enviar
      </Button>
    </Box>
  );
};

export default MasterPassword;
