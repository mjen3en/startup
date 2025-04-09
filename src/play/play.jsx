import React, { use } from 'react';
import './play.css';
import Maze from './maze';
import { useLocation } from 'react-router-dom';



export function Play() {
  const location = useLocation();
  const gameCode = location.state?.gameCode || 'defaultGameCode'; // Use a default value if gameCode is not available
  console.log('Game code:', gameCode);
  return (
    <main>
      <h1>RACE</h1>
      <div>
        <Maze gameCode = {gameCode}/>
      </div>
    </main>

  );
}