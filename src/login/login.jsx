import React from 'react';
import './login.css';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';


export function Login({userName, authState, onAuthChange}) {
  return (
    <main>
      <h1>Welcome To Maze Race</h1>
      <img src="laurels.png" 
      width="400" 
      height="auto"
      alt="Maze" />
        {authState !== AuthState.Unknown && <h1>Ready To Race?!</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
    </main>
  );
}