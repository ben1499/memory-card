import { useState, useEffect } from 'react';
import Header from './components/Header';
import Card from "./components/Card";
import Scoreboard from './components/Scoreboard';

const gifIds = ["HP7mtfNa1E4CEqNbNL", "D8xNev92dfqdG9FPx4", "pkKt4lHJuZj9KjsxoS", "BY8ORoRpnJDXeBNwxg", "HjKG2nRz7NOv6ch12D", "A14XC5WFpDpHjyH9Pz", "BcMJvmwkmbyWpKkBj3", "bC9czlgCMtw4cj8RgH", "xU0yHlYfvJdVrHzVUI", "F3BeiZNq6VbDwyxzxF"]
const params =  {
  api_key: "TKxL5wdyhk6OzBvFMWDJtNt9xCOvpVfw",
  ids: gifIds
}


function App() {

  const [gifs, setGifs] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    fetch(`https://api.giphy.com/v1/gifs/?${new URLSearchParams(params)}`, {
      method: "GET",
      mode: "cors",      
    }).then((response) => response.json())
    .then((res) => {
      const names = ["Jim Halpert", "Pam Beesly", "Dwight Schrute", "Michael Scott", "Toby Flenderson", "Angela Martin", "Oscar Martinez", "Kevin Malone", "Kelly Kapoor", "Stanley Hudson"]
      const formattedGifArray = res.data.map((item, index) => {
        return {
          id: item.id,
          name: names[index],
          image_url: item.images.downsized_medium.url,
          isClicked: false,
        }
      })
      setGifs(formattedGifArray);
    });
  }, [])

  const shuffleArray = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const handleClick = (selectedGif) => {
    console.log(selectedGif.isClicked);
    let updatedArray;
    if (selectedGif.isClicked) {
      // Reset all items' isClicked value to false
      updatedArray = gifs.map((gif) => ({...gif, isClicked: false}))
      setHighScore(prevHigh => prevHigh > score ? prevHigh : score);
      setScore(0);
    } else {
      setScore(score + 1);
      updatedArray = gifs.map((gif) => {
        if (gif.id === selectedGif.id) return {...gif, isClicked: true}
        return gif;
      })
    }
    
    const shuffledArray = shuffleArray(updatedArray);
    setGifs(shuffledArray);
  }

  return (
    <>
      <Header />
      <main>
        <Scoreboard score={score} highScore={highScore} />
        <div className='cards-container'>
        {gifs.map((gif) => (
          <Card key={gif.id} data={gif} onClick={handleClick} />
        ))}
        </div>
      </main>
    </>
  )
}

export default App;
