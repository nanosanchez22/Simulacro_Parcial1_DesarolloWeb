import React from "react";
import './TarjetaJuegos.css';
import { Link } from "react-router-dom";

function TarjetaJuegos({nombre, id, onDelete}) {
    return (
        <div id="card_container">
            <div>
                <h1 id="nombre_h1">{nombre}</h1>
            </div>
            <div>
                <Link to={`/game/${id}`}>
                <button>Detalles</button>
                </Link>
            </div>
            <div>
                <button onClick={() => onDelete(id)}>Borrar</button>
            </div>
            
        </div>
    )
}


export default TarjetaJuegos;