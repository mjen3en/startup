import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { GameOver } from './gameover/gameover';
import { CreateGame } from './creategame/creategame';
import { JoinGame } from './joingame/joingame';

export default function App() {
    return (
        <BrowserRouter>
      <div className="body bg-dark text-light">
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-dark">
            <div className="navbar-brand">
              Maze Race<sup>&reg;</sup>
            </div>
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="">
                  Home
                </NavLink >
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="play">
                  Play
                </NavLink >
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="creategame">
                  Create Game
                </NavLink >
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="joingame">
                  Join Game
                </NavLink >
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="gameover">
                  Game Over
                </NavLink >
              </li>
            </menu>
          </nav>
        </header>
  
<Routes>
  <Route path='/' element={<Login />} exact />
  <Route path='/play' element={<Play />} />
  <Route path='/creategame' element={<CreateGame />} />
  <Route path='/joingame' element={<JoinGame />} />
   <Route path='/gameover' element={<GameOver />} />
  <Route path='*' element={<NotFound />} />
</Routes>
  
        <footer className="bg-dark text-white-50">
          <div className="container-fluid">
            <span className="text-reset">Author Name(s)</span>
            <NavLink className="text-reset" to="https://github.com/webprogramming260/simon-react">
              Source
            </NavLink >
          </div>
        </footer>
      </div>
      </BrowserRouter>
    );

    function NotFound() {
        return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
      }
  }