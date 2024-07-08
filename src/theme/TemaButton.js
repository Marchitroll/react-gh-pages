import useLocalStorage from 'use-local-storage';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness5Icon from '@mui/icons-material/Brightness5';
function TemaButton() {
    const [tema, ] = useLocalStorage('tema_preferido');

    return (
        <>
            {
                (tema === "light") ? <Brightness5Icon /> :
                    <DarkModeIcon />
            }
        </>
    )
}
export default TemaButton;