import React, { useState, useEffect } from 'react';
import Caja from './Caja';
import ResumenPeriodo from './ResumenPeriodo';

const Dashboard = () => {
    const [fechaInicio, setFechaInicio] = useState(sessionStorage.getItem('fechaInicio') || '');
    const [fechaFin, setFechaFin] = useState(sessionStorage.getItem('fechaFin') || '');
    const [numOrdenes, setNumOrdenes] = useState(0);
    const [numUsuarios, setNumUsuarios] = useState(0);
    const [totalIngresos, setTotalIngresos] = useState(0);

    useEffect(() => {
        if (fechaInicio && fechaFin) {
            const fetchOrdenes = async () => {
                try {
                    const response = await fetch('https://backendgrupo4.azurewebsites.net/orden');
                    const ordenes = await response.json();

                    const responseAnimeOrden = await fetch('https://backendgrupo4.azurewebsites.net/animeorden');
                    const animeOrden = await responseAnimeOrden.json();

                    const responseAnimes = await fetch('https://backendgrupo4.azurewebsites.net/anime');
                    const animes = await responseAnimes.json();

                    const inicio = new Date(fechaInicio).setHours(0, 0, 0, 0);
                    const fin = new Date(fechaFin).setHours(23, 59, 59, 999);

                    const ordenesFiltradas = ordenes.filter((orden) => {
                        const fechaOrden = new Date(orden.createdAt);
                        return fechaOrden >= inicio && fechaOrden <= fin;
                    });

                    let total = 0;
                    ordenesFiltradas.forEach((orden) => {
                        let subtotal = 0;
                        const orderAnimes = animeOrden.filter(item => item.idOrden === orden.id);
                        orderAnimes.forEach(item => {
                            const anime = animes.find(a => a.id === item.idAnime);
                            if (anime) {
                                subtotal += parseFloat(anime.precio);
                            }
                        });
                        const costoEnvio = orden.metodoEnvioId === 1 ? 10.00 : 17.00;
                        const impuesto = 18.00; // impuesto fijo
                        total += subtotal + costoEnvio + impuesto;
                    });

                    setNumOrdenes(ordenesFiltradas.length);
                    setTotalIngresos(total.toFixed(2));
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            };

            const fetchUsuarios = async () => {
                try {
                    const response = await fetch('https://backendgrupo4.azurewebsites.net/usuario');
                    const usuarios = await response.json();

                    const inicio = new Date(fechaInicio).setHours(0, 0, 0, 0);
                    const fin = new Date(fechaFin).setHours(23, 59, 59, 999);

                    const usuariosFiltrados = usuarios.filter((usuario) => {
                        const fechaUsuario = new Date(usuario.createdAt);
                        return fechaUsuario >= inicio && fechaUsuario <= fin;
                    });

                    setNumUsuarios(usuariosFiltrados.length);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };

            fetchOrdenes();
            fetchUsuarios();
        }
    }, [fechaInicio, fechaFin]);

    return (
        <>
            <ResumenPeriodo setFechaInicio={setFechaInicio} setFechaFin={setFechaFin} style={{ marginBottom: '20px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Caja numero={numOrdenes} texto="Órdenes en el periodo" />
                <Caja numero={numUsuarios} texto="Usuarios registrados en el periodo" />
                <Caja numero={`S/. ${totalIngresos}`} texto="Ingresos en el periodo" />
            </div>
        </>
    );
};

export default Dashboard;
