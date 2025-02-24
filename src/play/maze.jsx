import React, { useEffect } from "react";
import './maze.css';

function Maze() {
    const [playerPosition, setPlayerPosition] = React.useState({ x: 1, y: 1 });
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
        [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    const moveHero = (direction) => {
        const {x,y } = playerPosition;
        let newX = x;
        let newY = y;

        // if (direction === 'up') newY -= 1;
        // if (direction === 'down') newY += 1;
        // if (direction === 'left') newX -= 1;
        // if (direction === 'right') newX += 1 //
        if (direction === 'up') newX -= 1 
        if (direction === 'down') newX += 1;
        if (direction === 'left') newY -= 1;
        if (direction === 'right') newY += 1; //


        if (
            newX >= 0 && newX < mazeData[0].length &&
            newY >= 0 && newY < mazeData.length &&
            mazeData[newY][newX] !== 1
          ) {
            setPlayerPosition({ x: newX, y: newY });
          }
        }

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


    const renderMaze = () => {
        return (
            <div className = "maze">
                {mazeData.map((row, rowIndex) => (
                    <div key={rowIndex} className="maze-row">
                        <ul>{row.map((cell, cellIndex) => (
                            <div key={cellIndex} className={`maze-cell ${rowIndex === playerPosition.y && cellIndex === playerPosition.x ? 'hero' : cell !== 0 ? 'wall' : 'path'}`}></div>
                        ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
}

    return <div>{renderMaze()}</div>;
};

export default Maze;


