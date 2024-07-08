import React from 'react';
import Box from '@mui/material/Box';

const Caja = ({ numero, texto }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      p={2}
      border="2px solid grey"
      textAlign="center"
    >
      <h1>{numero}</h1>
      <label>{texto}</label>
    </Box>
  );
};

export default Caja;
