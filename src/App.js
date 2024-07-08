import './App.css';
import Rutas from './Router/Rutas';
import { ThemeProvider, CssBaseline } from "@mui/material"
import { temaClaro, temaOscuro } from './theme/Temas';
import useLocalStorage from 'use-local-storage';
import { RouterProvider } from 'react-router-dom';

let usuarios = [
  {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Perez",
    "correo": "juan.perez@correo.com",
    "contrasenia": "contraseña123",
    "fechaRegistro": "2023-01-01",
    "estado": "activo"
  },
  {
    "id": 2,
    "nombre": "Maria",
    "apellido": "Gomez",
    "correo": "maria.gomez@correo.com",
    "contrasenia": "contraseña456",
    "fechaRegistro": "2023-02-15",
    "estado": "activo"
  },
  {
    "id": 3,
    "nombre": "Luis",
    "apellido": "Rodriguez",
    "correo": "luis.rodriguez@correo.com",
    "contrasenia": "contraseña789",
    "fechaRegistro": "2023-03-10",
    "estado": "inactivo"
  },
  {
    "id": 4,
    "nombre": "Patricio",
    "apellido": "Paypa",
    "correo": "patricio@gmail.com",
    "contrasenia": "123456789",
    "fechaRegistro": "2020-12-25",
    "estado": "activo"
  }
];

let productos = [
  {
    "producto": {
      "id": 1,
      "genero": "acción",
      "url": "http://ejemplo.com/anime1",
      "fechaInicioPublicacion": "2023-01-01",
      "nombre": "Anime 1",
      "stock": 100,
      "fechaFinPublicacion": "2023-06-01",
      "fechaRegistro": "2023-01-01",
      "estado": "disponible",
      "demografia": "shonen",
      "sinopsis": "Sinopsis del Anime 1",
      "vendedor": "Vendedor A",
      "metodoEnvio": {
        "metodo1": "DHL",
        "metodo2": "FedEx"
      },
      "ordenAsociada": "Orden 1"
    },
    "anime": {
      "extends": "producto",
      "nroEpisodios": 24,
      "casaAnimadora": "Estudio A",
      "casaProductora": "Productora A",
      "basadoEn": "Manga"
    }
  },
  {
    "producto": {
      "id": 2,
      "genero": "aventura",
      "url": "http://ejemplo.com/anime2",
      "fechaInicioPublicacion": "2022-05-15",
      "nombre": "Anime 2",
      "stock": 150,
      "fechaFinPublicacion": "2022-12-15",
      "fechaRegistro": "2022-05-15",
      "estado": "disponible",
      "demografia": "seinen",
      "sinopsis": "Sinopsis del Anime 2",
      "vendedor": "Vendedor B",
      "metodoEnvio": {
        "metodo1": "UPS",
        "metodo2": "Correo Postal"
      },
      "ordenAsociada": "Orden 2"
    },
    "anime": {
      "extends": "producto",
      "nroEpisodios": 12,
      "casaAnimadora": "Estudio B",
      "casaProductora": "Productora B",
      "basadoEn": "Novela Ligera"
    }
  },
  {
    "producto": {
      "id": 3,
      "genero": "fantasía",
      "url": "http://ejemplo.com/manga1",
      "fechaInicioPublicacion": "2021-03-10",
      "nombre": "Manga 1",
      "stock": 200,
      "fechaFinPublicacion": "2022-03-10",
      "fechaRegistro": "2021-03-10",
      "estado": "disponible",
      "demografia": "shoujo",
      "sinopsis": "Sinopsis del Manga 1",
      "vendedor": "Vendedor C",
      "metodoEnvio": {
        "metodo1": "FedEx",
        "metodo2": "Correo Postal"
      },
      "ordenAsociada": "Orden 3"
    },
    "manga": {
      "extends": "producto",
      "nroVolumenes": 15,
      "nroCapitulos": 150,
      "autor": "Autor A"
    }
  },
  {
    "producto": {
      "id": 4,
      "genero": "ciencia ficción",
      "url": "http://ejemplo.com/manga2",
      "fechaInicioPublicacion": "2020-07-20",
      "nombre": "Manga 2",
      "stock": 250,
      "fechaFinPublicacion": "2021-07-20",
      "fechaRegistro": "2020-07-20",
      "estado": "disponible",
      "demografia": "josei",
      "sinopsis": "Sinopsis del Manga 2",
      "vendedor": "Vendedor D",
      "metodoEnvio": {
        "metodo1": "DHL",
        "metodo2": "UPS"
      },
      "ordenAsociada": "Orden 4"
    },
    "manga": {
      "extends": "producto",
      "nroVolumenes": 10,
      "nroCapitulos": 100,
      "autor": "Autor B"
    }
  }
];

let ordenes = [
  {
    "id": 1,
    "productoAsociado": [1, 4, 1, 1],
    "estado": "procesando",
    "metodoEnvio": {
      "metodo1": "DHL",
      "metodo2": "FedEx"
    },
    "tipoPago": "tarjeta de crédito",
    "direccionEnvio": "Calle Falsa 123, Ciudad Ejemplo",
    "usuarioAsociado": 1, // Asociado al usuario con id 1 (Juan Perez)
    "fecha": "2024-05-01"
  },
  {
    "id": 2,
    "productoAsociado": [3, 1, 1, 1],
    "estado": "enviado",
    "metodoEnvio": {
      "metodo1": "FedEx",
      "metodo2": "Correo Postal"
    },
    "tipoPago": "PayPal",
    "direccionEnvio": "Avenida Siempre Viva 742, Ciudad Ejemplo",
    "usuarioAsociado": 2, // Asociado al usuario con id 2 (Maria Gomez)
    "fecha": "2024-05-15"
  }
];

// Verificar si los datos ya existen en el localStorage
if (!localStorage.getItem("usuarioEnSesion")) {
  let usuarioEnSesion = { "id": 0 };
  let usuarioEnSesionJSON = JSON.stringify(usuarioEnSesion);
  localStorage.setItem("usuarioEnSesion", usuarioEnSesionJSON);
}

if (!localStorage.getItem("ordenes")) {
  let ordenesJSON = JSON.stringify(ordenes);
  localStorage.setItem('ordenes', ordenesJSON);
}

if (!localStorage.getItem("productos")) {
  let productosJSON = JSON.stringify(productos);
  localStorage.setItem("productos", productosJSON);
}

if (!localStorage.getItem("usuarios")) {
  let usuariosJSON = JSON.stringify(usuarios);
  localStorage.setItem("usuarios", usuariosJSON);
}


// Verificar almacenamiento (opcional)
console.log(JSON.parse(localStorage.getItem('ordenes')));
console.log(JSON.parse(localStorage.getItem('productos')));
console.log(JSON.parse(localStorage.getItem('usuarios')));

function App() {
  const [tema,] = useLocalStorage("tema_preferido", "light")
  return (
    <ThemeProvider theme={tema === "light" ? temaClaro : temaOscuro}>
      <CssBaseline />
      <RouterProvider router={ Rutas()} />
    </ThemeProvider>
  );
}
export default App;