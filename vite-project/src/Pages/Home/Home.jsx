import React from 'react';
import './Home.css';
import TarjetaJuegos from '../../Components/TarjetaJuegos';
import { useState, useEffect } from 'react';



function Home () {
    const [newGame, setNewGame] = useState({
        title: '',
        description: '',
        players: '',
        categories: ''
    });

    const [games, setGames] = useState([]);

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

            setGames([...data]); //data por newGame
            setNewGame({ title: '', description: '', players: '', categories: ''});
        })
        .catch(error => console.log('Error adding game:', error))
    };

    const handleDeleteGame = (id) => {
        console.log('Deleting game:', id); //log para ver si se esta eliminando el juego
        fetch(`http://localhost:3000/api/games/${id}`, {
            method: 'DELETE'
        })
        // .then(response => response.json())
        .then((response) => {
            console.log('Game deleted:', id); //log para ver si se elimino el juego

            if (response.status !== 204) {
                return console.log('Error deleting game:', response.status);
            }

            const remainingGames = games.filter(game => game.id !== id);
            setGames(remainingGames);
        })
        .catch(error => console.log('Error deleting game:', error))
    };

    useEffect(() => {
        fetch('http://localhost:3000/api/games')
          .then(response => response.json())
          .then(data => setGames(data))
          .catch(error => console.log('Error fetching games:', error))
      }, [])

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
                <input type="text" name="title" placeholder="Nombre" value={newGame.title} onChange={handleChange} />
                <input type="text" name="description" placeholder="Descripcion" value={newGame.description} onChange={handleChange} />
                <input type="text" name="players" placeholder="Cantidad de Jugadores" value={newGame.players} onChange={handleChange} />
                <input type="text" name="categories" placeholder="Categorias" value={newGame.categories} onChange={handleChange} />
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