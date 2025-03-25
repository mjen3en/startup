import React from 'react';
import './joingame.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


export function JoinGame() {

  const [gameCode, setGameCode] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const navigate = useNavigate();
  

  async function joinGame() {
    const response = await fetch('/api/joinGame', {
      method: 'put',
      body: JSON.stringify({ code: gameCode, player: localStorage.getItem('userName') }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status !== 200) {
      const body = await response.body;
      setDisplayError (`Error: ${body}`);
      
    }
    navigate('/play');
  }
  return (
    <main>
      <h1>Join Game</h1>
      <div className='input-group mb-3'>
          <input className='form-control' type= 'text' onChange={(e) => setGameCode(e.target.value)} placeholder='6-digit code' />
        </div>
        <Button className = 'Join Button' variant='primary' type='submit' onClick={() => joinGame()} disabled={!gameCode}>
          Join</Button>
      <h1> Recent Matches</h1>
      <div>Database Placeholder, display outcomes of 3 recent matches. ex User1 beat User2</div>
    </main>    
  );
}