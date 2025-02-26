import React, { useEffect} from 'react';
import './creategame.css';
import { Button } from 'react-bootstrap';



export function CreateGame() {
  return (
    <main>
      <h1>Game Code</h1>
      <div>Randomly generated game code goes here</div>
      <div> Use 100ms api to generate and manage room codes</div>
      <div>Game Code: 000000</div>

      <form method = "get" action = "play">
      <button type="submit"> Play Game</button>
      </form>
      
      <h1> Websocket Data</h1>
      <div>Will automatically notify player and change screens when another player has joined the game</div>
    </main>
  );
}