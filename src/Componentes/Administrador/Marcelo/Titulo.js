// UserTitle.js
import React from 'react';

const Titulo = ({titulo}) => {
    return (
        <div
            style={{
                backgroundColor: "#C9C9C9",
                width: "auto",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                height: "50px",
                paddingLeft: "15px",
                fontSize: "20px",
                fontWeight: "bold",
                borderRadius: "5px",
            }}>
            {titulo}
        </div>
    );
};

export default Titulo;
