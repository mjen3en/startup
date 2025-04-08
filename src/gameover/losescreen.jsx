import React, { useEffect } from 'react';
import './gameover.css';


export function LoseScreen() {
  return (
    <main>
      <h1>GAME OVER</h1>
      <h1>YOU LOST</h1>
      <form method="get" action="/">
        <div>
          <button type="submit" >Go Home</button>
        </div>
      </form>
    </main>
  );
}