import React from 'react';
import './gameover.css';

export function GameOver() {
  return (
    <main>
      <h1>GAME OVER</h1>
      <h1>YOU WON</h1>
      <form method="get" action="/">
        <div>
          <button type="submit" >Go Home</button>
        </div>
      </form>
      <img src="Trophy.jpg"
      height="400" 
      width="auto" />
    </main>
  );
}