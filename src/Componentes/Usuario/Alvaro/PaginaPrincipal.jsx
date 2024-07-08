import BarraDeNavegacion from '../../BarraCompleta';
import BarraBusqueda from './BarraBusqueda';
import CuerpoAlva2 from './CuerpoAlva2';
import PieDePaginaTODOS from '../../PieDePaginaTODOS';
import { Box } from '@mui/material';

function PaginaPrincipal() {
    return (
        <Box>
            <BarraDeNavegacion />
            <br />
            <br />
            <br />
            <br />
            <BarraBusqueda />
            <CuerpoAlva2 />
            <PieDePaginaTODOS />
        </Box>
    )
}
export default PaginaPrincipal;