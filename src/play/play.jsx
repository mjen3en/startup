import React from 'react';
import './play.css';


export function Play() {
  return (
    <main>
      <h1>RACE</h1>
      <img src="maze_placeholder.png" />
      <div> Websocket placeholder</div>
      <div>Upon one player completing the maze, Websocket will automatically transition both players to game over screen</div>
      <li><a href="gameover">GameOver</a></li>
    </main>
  );
}