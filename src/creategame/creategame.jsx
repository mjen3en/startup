import React, { useEffect} from 'react';
import './creategame.css';
import { Button } from 'react-bootstrap';




export function CreateGame() {
  const [gameCode, setGameCode] = React.useState('10000');

  useEffect(() => {
    const n = generateRandomCode();
    setGameCode(n);
    CreateGame(n);
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

    async function CreateGame(gameCode) {
      const response = await fetch('/api/createGame', {
        method: 'post',
        body: JSON.stringify({ code: gameCode, player: localStorage.getItem('userName') }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (response?.status !== 200) {
        const body = await response.json();
        setDisplayError(`⚠ Error: ${body.msg}`);
      }
    }


  return (
    <main>
      <h1>Game Code</h1>
      <div>Game Code: {gameCode}</div>

      <form method = "get" action = "play">
        <div>
          <Button variant="primary" type="submit" >Start Game</Button>
        </div>
      </form>
      
      <h1> Websocket Data</h1>
      <div>Will automatically notify player and change screens when another player has joined the game</div>
    </main>
  );
}