import React, { useEffect} from 'react';
import './creategame.css';



export function CreateGame() {
const { code, setCode } = React.useState('000000');
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Code to execute on refresh
      const newCode =Math.floor(100000 + Math.random() * 900000).toString();
      setCode(newCode);

      console.log('Page is refreshing or closing!');
      // Perform actions like saving data to localStorage or sending analytics events
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return (
    <main>
      <h1>Game Code</h1>
      <div>Randomly generated game code goes here</div>
      <div> Use 100ms api to generate and manage room codes</div>
      <div>Game Code: {code}</div>
      
      <h1> Websocket Data</h1>
      <div>Will automatically notify player and change screens when another player has joined the game</div>
    </main>
  );
}