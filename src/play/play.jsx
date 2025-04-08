import React, { use } from 'react';
import { useLocation } from 'react-router-dom';
import './play.css';
import Maze from './maze';



export function Play() {
  const location = useLocation();
  const ws = location.state?.ws; // Get the WebSocket instance from location state
  return (
    <main>
      <h1>RACE</h1>
      <div>
        <Maze ws={ws.current} />
      </div>
      <div> Websocket placeholder</div>
      <div>Upon one player completing the maze, Websocket will automatically transition both players to game over screen</div>
      <li><a href="gameover">GameOver</a></li>
    </main>
  );
}