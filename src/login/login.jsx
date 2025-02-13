import React from 'react';
import './login.css';


export function Login() {
  return (
    <main>
      <h1>Ready to Race??</h1>
      <img src="laurels.png" alt="Maze>" />
      <form method="get" action="joingame">
        <div>
          <input type="text" placeholder="your@email.com" />
        </div>
        <div>
          <input type="password" placeholder="password" />
        </div>
        <button type="submit">Login</button>
        <button type="submit">Sign Up</button>
      </form>
    </main>
  );
}