import React, { useEffect } from 'react';
import './gameover.css';

export function GameOver() {
  const [imageUrl, setImageUrl] = React.useState('');

  useEffect(() => {
    
    fetch(`https://pixabay.com/api/?key=49331477-a1e82a3dad3b715f88f9a8352&q=trophy&image_type=photo`)
      .then((response) => response.json())
      .then((data) => {

        const random = Math.floor(Math.random() * 1000) % data.hits.length;
        const url = data.hits[random].largeImageURL;
        setImageUrl(url);
      })
      .catch();
    }, []);

  return (
    <main>
      <h1>GAME OVER</h1>
      <h1>YOU WON</h1>
      <form method="get" action="/">
        <div>
          <button type="submit" >Go Home</button>
        </div>
      </form>
      <img src={imageUrl}
      alt="Victory Image"
      height="400" 
      width="auto" />
    </main>
  );
}