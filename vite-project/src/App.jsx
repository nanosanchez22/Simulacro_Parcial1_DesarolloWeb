import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Detalles from './Pages/Detalles/Detalles'
import { useEffect, useState } from 'react'

function App() {
/*   const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/games')
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.log('Error fetching games:', error))
  }, []) */

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/game/:id" element={<Detalles />} />
    </Routes>

    </>
  )
}

export default App
