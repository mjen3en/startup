import React from 'react';
import './joingame.css';


export function JoinGame() {
  return (
    <main>
      <form method = "get" action = "creategame.html">
      <button type="submit"> Create Game</button>
      </form>

      <h1>Join Game</h1>
      <form method="get" action="gamecscreen.html">
        <div>
          <span></span>
          <input type="text" placeholder="Game Code" />
        </div>
        <button type="submit">Join</button>
      </form>
      <h1> Recent Matches</h1>
      <div>Database Placeholder, display outcomes of 3 recent matches. ex User1 beat User2</div>
    </main>
  );
}