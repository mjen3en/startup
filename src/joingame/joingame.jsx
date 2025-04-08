import React, { useRef, useEffect, useContext } from 'react';
import './joingame.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { WebSocketContext } from '../WebSocketContext.jsx';


export function JoinGame() {

  const [gameCode, setGameCode] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [winners, setWinners] = React.useState([]);
  const navigate = useNavigate();
  const ws = useContext(WebSocketContext); // Use useRef to keep the WebSocket instance

  useEffect(() => {
    getWinners();
    console.log('Winners:', winners);

  }, []);


  async function getWinners() {
    const response = await fetch('api/getWinners', {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200 || response?.status === 304) {
      const data = await response.json();
      setWinners(data.winners);
      console.log('Winners:', data.winners);

    } else {
      setDisplayError('Failed to fetch winners');
    }   
  }
  

  async function joinGame() {
    // const response = await fetch('/api/joinGame', {
    //   method: 'put',
    //   body: JSON.stringify({ code: gameCode, player: localStorage.getItem('userName') }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // });
    // if (response?.status !== 200) {
    //   const body = await response.body;
    //   setDisplayError (`Error: ${body}`);
      
    // }

    // ws.current = new WebSocket('ws://localhost:3000');

    // ws.current.onopen = () => {
    //   console.log('WebSocket connection established');
    //   ws.current.send(JSON.stringify({ type: 'join', roomCode: gameCode }));
    // };

    ws.send(JSON.stringify({ type: 'join', roomCode: gameCode }));

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data); 
      console.log('Received message from server:', data);
      if (data.type === 'joined') {
        console.log('Joined room:', data.message);
      } else if (data.type === 'start') {
        navigate('/play'); // Pass the WebSocket instance to the play component
      }
      else if (data.type === 'error') {
        console.error('Error:', data.message);
      }

  }
}
  return (
    <main>
      <h1>Join Game</h1>
      <div className='input-group3'>
          <input className='form-control' type= 'text' onChange={(e) => setGameCode(e.target.value)} placeholder='6-digit code' />
        </div>
        <Button className = 'join-button' variant='primary' type='submit' onClick={() => joinGame()} disabled={!gameCode}>
          Join</Button>
    
      <h1>Leaderboard</h1>
      <div>
        {winners.length > 0 ? (
          <div>
            {winners.map((winner, index) => (
              <div key={index}>{winner.username} has won {winner.win_count} time(s)</div>
            ))}
          </div>
        ) : (
          <p>No winners yet</p>
        )}
      </div>
    </main>    
  );
}