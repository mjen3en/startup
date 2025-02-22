import React from "react";
import './maze.css';

function Maze( { MazeData } ) {
    return (
        <div className = "maze">
            {MazeData.map((row, rowIndex) => (
                <div key={rowIndex} className="maze-row">
                    <ul>{row.map((cell, cellIndex) => (
                        <div key={cellIndex} className={`maze-cell ${cell != 0 ? cell != 3 ? 'wall':'hero': 'path'}`}></div>
                    ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Maze;