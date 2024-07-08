import React from 'react';
import Caja from './Caja';
import ResumenPeriodo from './ResumenPeriodo';

const Dashboard = () => {
    return (
        <>
            <ResumenPeriodo style={{ marginBottom: '20px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Caja numero={68} texto="Órdenes el día de hoy" />
                <Caja numero={42} texto="Usuarios registrados hoy" />
                <Caja numero={'S/. 123'} texto="Ingresos de hoy" />
            </div>
        </>
    );
};

export default Dashboard;
