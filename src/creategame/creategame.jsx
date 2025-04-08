import React, { useContext, useEffect, useRef} from 'react';
import './creategame.css';
import { Button }  from 'react-bootstrap';
import { WebSocketContext } from '../WebSocketContext.jsx';




export function CreateGame() {
  const [gameCode, setGameCode] = React.useState('10000');
  const [displayError, setDisplayError] = React.useState(null);
  const ws = useContext(WebSocketContext); 

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
      // const response = await fetch('/api/createGame', {
      //   method: 'post',
      //   body: JSON.stringify({ code: gameCode, player: localStorage.getItem('userName') }),
      //   headers: {
      //     'Content-type': 'application/json; charset=UTF-8',
      //   },
      // });
      // if (response?.status !== 200) {
      //   const body = await response.json();
      //   setDisplayError(`⚠ Error: ${body.msg}`);
      // }

      // ws.current = new WebSocket('ws://localhost:3000');
      // ws.current.onopen = () => {
      //   console.log('WebSocket connection established');
      //   ws.current.send(JSON.stringify({ type: 'join', roomCode: gameCode }));
      // };


      ws.send(JSON.stringify({ type: 'join', roomCode: gameCode }));

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data); 
        console.log('WebSocket message:', data);
        if (data.type === 'joined') {
          console.log('Player joined the game:', data.message);
        } else if (data.type === 'start') {
          console.log('Game started for player:', data.playerNumber);
          // navigate to the game screen
          navigate('/play');
        }
      }

    //   if (ws.current && ws.current.readyState === WebSocket.OPEN) {
    //     ws.current.send(JSON.stringify({ type: 'join', roomCode: gameCode }));

    //     ws.current.onmessage = (event) => {
    //         const data = JSON.parse(event.data);
    //         console.log('WebSocket message:', data);

    //         if (data.type === 'joined') {
    //             console.log('Player joined the game:', data.message);
    //         } else if (data.type === 'start') {
    //             console.log('Game started for player:', data.playerNumber);
    //             navigate('/play');
    //         }
    //     };
    // } else {
    //     console.error('WebSocket is not ready to send messages');
    //     setDisplayError('WebSocket connection is not ready. Please try again.');
    // }
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