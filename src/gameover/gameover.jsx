import React from 'react';

export function GameOver() {
  return (
    <main>
      <h1>GAME OVER</h1>
      <h1>YOU WON</h1>
      <form method="get" action="index.html">
        <div>
          <button type="submit" >Go Home</button>
        </div>
      </form>
      <img src="Trophy.jpg" />
    </main>
  );
}