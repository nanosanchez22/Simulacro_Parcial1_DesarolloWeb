import React from 'react';
import './Home.css';
import TarjetaJuegos from '../../Components/TarjetaJuegos';
import { useState, useEffect } from 'react';



function Home ({games, setGames}) {
    const [newGame, setNewGame] = useState({
        title: '',
        description: '',
        players: '',
        categories: ''
    });

    const handleChange = (e) => {
        setNewGame({
            ...newGame,
            [e.target.name]: e.target.value
        })
    };

    const handleAddGame = () => {
        console.log('Adding game:', newGame); //log para ver si se esta agregando el juego
        fetch('http://localhost:3000/api/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGame)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Game added:', data); //log para ver si se agrego el juego
            setGames( prevGames => [...prevGames, data])
            setNewGame({ title: '', description: '', players: '', categories: ''})
    })
        .catch(error => console.log('Error adding game:', error))
    };

    const handleDeleteGame = (id) => {
        console.log('Deleting game:', id); //log para ver si se esta eliminando el juego
        fetch(`http://localhost:3000/api/games/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => {
            console.log('Game deleted:', id); //log para ver si se elimino el juego
            setGames(prevGames => prevGames.filter(game => game.id !== id));
        })
        .catch(error => console.log('Error deleting game:', error))
    };

    useEffect(() => {
        console.log('Games updated:', games); //log para ver si se estan trayendo los juegos
    }, [games]);

    if(games.length === 0) {
        return <h1>Loading...</h1>
    }





    return (
        <div>
            <div>
                <h1>Juegos Olimpicos 2024</h1>
            </div>
{/*             <div>
                <button>Agregar Juego</button>
            </div> */}

            <div>
                <input type="text" name="title" placeholder="Nombre" onChange={handleChange} />
                <input type="text" name="description" placeholder="Descripcion" onChange={handleChange} />
                <input type="text" name="players" placeholder="Cantidad de Jugadores" onChange={handleChange} />
                <input type="text" name="categories" placeholder="Categorias" onChange={handleChange} />
                <button onClick={handleAddGame}>Agregar Juego</button>
            </div>

            <div id='home_card_container'>

                {games.map((game) => (
                    <TarjetaJuegos  key={game.id} nombre={game.title} id={game.id} onDelete={() => handleDeleteGame(game.id)}/>
                ))}
            </div>

        </div>
    );
}

export default Home;