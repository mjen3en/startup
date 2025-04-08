import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { GameOver } from './gameover/gameover';
import { CreateGame } from './creategame/creategame';
import { JoinGame } from './joingame/joingame';
import { AuthState } from './login/authState';
import { WebSocketProvider } from './WebSocketContext.jsx';
import { LoseScreen } from './gameover/losescreen.jsx';

 function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  

    return (
      <WebSocketProvider>
        <BrowserRouter>
      <div className="body">
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-dark">
            <div className="navbar-brand">
              Maze Race
            </div>
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="">
                  Home
                </NavLink >
              </li>
              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="creategame">
                    Create Game
                  </NavLink >
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="joingame">
                    Join Game
                  </NavLink >
                </li>
              )}
              
            </menu>
          </nav>
        </header>

        
  
<Routes>
  <Route path='/' element={
            <Login 
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
                />
              } 
                exact 
                />
    <Route path='/play' element={<Play />} />
    <Route path='/creategame' element={<CreateGame />} />
    <Route path='/joingame' element={<JoinGame />} />
    <Route path='/gameover' element={<GameOver />} />
    <Route path= '/lose' element={<LoseScreen />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
  
        <footer className="bg-dark text-white-50">
          <div className="container-fluid">
            <span className="text-reset">Micah Jensen</span>
            <NavLink className="text-reset" to="https://github.com/mjen3en/startup">
              Source
            </NavLink >
          </div>
        </footer>
      </div>
    </BrowserRouter>  
</WebSocketProvider>   
      
    );

    function NotFound() {
        return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
      }
  }

  export default App;