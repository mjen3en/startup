import React from 'react';
import './creategame.css';

export function CreateGame() {
  return (
    <main>
      <h1>Game Code</h1>
      <div>Randomly generated game code goes here</div>
      <div> Use 100ms api to generate and manage room codes</div>
      
      <h1> Websocket Data</h1>
      <div>Will automatically notify player and change screens when another player has joined the game</div>
    </main>
  );
}