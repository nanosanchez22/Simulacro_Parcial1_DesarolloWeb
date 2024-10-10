import React from "react";
import './Detalles.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Detalles() {

    const [game, setGame] = useState([]); 
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/api/games/${id}`)
            .then(response => response.json())
            .then(data => setGame(data))
            .catch(error => console.log('Error fetching game details:', error))
    }, [id])

    if(game.length === 0) {
        return <h1>Loading...</h1>
    }

    console.log(game);

    return (
        <div>
            <div>
                <Link to="/">
                <button>Atras</button>
                </Link>
            </div>
            <div>
                <h3>Nombre: {game[0].title}</h3>
                <h3>Descripcion: {game[0].description}</h3>
                <h3>Cantidad de Jugadores: {game[0].players}</h3>
                <h3>Categorias: {game[0].categories}</h3>
            </div>
        </div>
    )
}

export default Detalles;