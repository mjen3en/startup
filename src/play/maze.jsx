import React, { useRef, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import './maze.css';

function Maze({web}) {
    const [playerPosition, setPlayerPosition] = React.useState({ x: 1, y: 1 });
    const [opponentPosition, setOpponentPosition] = React.useState({ x: 1, y: 1 });
    const goalPosition = {x:18, y:18};
    const ws = web; // Use useRef to keep the WebSocket instance
    let navigate = useNavigate();
    const mazeData = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
        [1,0,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1],
        [1,0,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1],
        [1,0,1,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
        [1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
        [1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1],
        [1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1],
        [1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1],
        [1,0,1,0,1,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,1,0,1,1,1,0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
        [1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    const moveHero = (direction) => {
        const {x,y} = playerPosition;
        let newX = x;
        let newY = y;

        if (direction === 'up') newX -= 1 
        if (direction === 'down') newX += 1;
        if (direction === 'left') newY -= 1;
        if (direction === 'right') newY += 1; //


        if (
            newX >= 0 && newX < mazeData[0].length &&
            newY >= 0 && newY < mazeData.length &&
            mazeData[newY][newX] !== 1
          ) {
            const newPosition = { x: newX, y: newY };
            setPlayerPosition(newPosition);

            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                console.log('Sending move to WebSocket:', newPosition);
                ws.current.send(JSON.stringify({
                    type: 'move',
                    position: newPosition
                }));
            } else {
                console.error('WebSocket is not ready to send messages');
                console.log('WebSocket state:', ws.current ? ws.current.readyState : 'WebSocket not initialized');
            }
            
          }
        }

        useEffect(() => {
            // Connect to the WebSocket server
            // ws.current = new WebSocket('ws://localhost:3000');
    
            // ws.current.onopen = () => {
            //     console.log('Connected to WebSocket server');
            // };
    
            ws.current.onmessage = (event) => {
                console.log('Message from WebSocket server:', event.data);
                const data = JSON.parse(event.data);

                if (data.type === 'connection') {
                    console.log(data.message); // Logs: "Welcome to the WebSocket server!"
                }
                 else if (data.type === 'move') {
                    setOpponentPosition(data.position); // Update opponent's position
                }
            };
    
            ws.current.onclose = () => {
                console.log('Disconnected from WebSocket server');
            };
    
            return () => {
                ws.current.close();
            };
        }, []);

    

    useEffect(() => {
        const handleKeyPress = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    console.log('ArrowUp');
                    moveHero('up');
                    break;
                case 'ArrowDown':
                    console.log('ArrowDown');
                    moveHero('down');
                    break;
                case 'ArrowLeft':
                    console.log('Left');
                    moveHero('left');
                    break;
                case 'ArrowRight':
                    console.log('right')
                    moveHero('right');
                    break;
                default:
                    break;
            }
        }

        
        window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [playerPosition]);

useEffect(() => {
    if (playerPosition.x === goalPosition.x && playerPosition.y === goalPosition.y) {
        // put game in database
        sendGame();
        navigate('/gameover');
    }
}, [playerPosition, goalPosition, navigate]);

useEffect(() => {
    if (opponentPosition.x === goalPosition.x && opponentPosition.y === goalPosition.y) {
        // navigate to loose screen if opponent reaches goal first
        navigate('/gameover');
    }
}, [opponentPosition, goalPosition, navigate]);


async function sendGame() {
    const response = await fetch('/api/sendGame', {
      method: 'put',
      body: JSON.stringify({ winner: localStorage.getItem('userName') }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
        const body = await response.json();
        setDisplayError(`Game ${body.msg}`);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }





  const renderMaze = () => {
    return (
        <div className="maze">
            {mazeData.map((row, rowIndex) => (
                <div key={rowIndex} className="maze-row">
                    <ul>
                        {row.map((cell, cellIndex) => {
                            let cellClass = 'maze-cell';
                            if (rowIndex === playerPosition.y && cellIndex === playerPosition.x) {
                                cellClass += ' hero';
                            } else if (rowIndex === goalPosition.y && cellIndex === goalPosition.x) {
                                cellClass += ' goal';
                            } else if (rowIndex === opponentPosition.y && cellIndex === opponentPosition.x) {
                                cellClass += ' opponent'; // Add class for opponent
                            } else {
                                cellClass += cell !== 0 ? ' wall' : ' path';
                            }
                            return <div key={cellIndex} className={cellClass}></div>;
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
}

    return <div>{renderMaze()}</div>;
};

export default Maze;


