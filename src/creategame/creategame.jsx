import React, { useEffect} from 'react';
import './creategame.css';
import { Button } from 'react-bootstrap';




export function CreateGame() {



  const [gameCode, setGameCode] = React.useState(localStorage.getItem('gameCode') || '10000');

  useEffect(() => {
    if (!localStorage.getItem('gameCode')) {
    const n = generateRandomCode();
    setGameCode(n);
    localStorage.setItem('gameCode', n);
    }
    },[]);

    function generateRandomCode() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let code = '';
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
      return code;
    }


  return (
    <main>
      <h1>Game Code</h1>
      <div>Randomly generated game code goes here</div>
      <div>Game Code: {gameCode}</div>

      <form method = "get" action = "play">
      <button type="submit"> Play Game</button>
      </form>
      
      <h1> Websocket Data</h1>
      <div>Will automatically notify player and change screens when another player has joined the game</div>
    </main>
  );
}