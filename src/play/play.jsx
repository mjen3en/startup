import React from 'react';
import './play.css';
import Maze from './maze';



export function Play() {
  return (
    <main>
      <h1>RACE</h1>
      <div>
        <Maze MazeData />
      </div>
      <div> Websocket placeholder</div>
      <div>Upon one player completing the maze, Websocket will automatically transition both players to game over screen</div>
      <li><a href="gameover">GameOver</a></li>
    </main>
  );
}