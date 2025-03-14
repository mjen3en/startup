import React, { useEffect } from 'react';
import './gameover.css';

export function GameOver() {
  const [imageUrl, setImageUrl] = React.useState('Trophy.jpg');

  useEffect(() => {
    const random = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
      .then((response) => response.json())
      .then((data) => {


        
        // const apiUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
        const url = data[0].download_url;
        setImageUrl(url);
      })
      .catch();
    }, []);


  //   fetch(`https://api.pexels.com/v1/search?query=trophy`, {
  //     headers: { Authorization: "49331477-a1e82a3dad3b715f88f9a8352" }
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const apiUrl = response.pageUrl;
  //       setImageUrl(apiUrl);
  //     })
  //     .catch();
  // }, []);


  // async function getVictoryImage(){
  //   try {
  //   image = await fetch("https://api.pexels.com/v1/search?query=trophy", {
  //     headers: { Authorization: "49331477-a1e82a3dad3b715f88f9a8352" }
  //   })
  //   .then((res) => res.json())
  //   .then((data) => setImageUrl(data.photos[0].src.original));
  //   return image;
  // }
  // catch (error) {
  //   console.error("Error fetching image:", error);
  //   return "Trophy.jpg"; // Fallback image
  // }
  // }

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