import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import './styles/App.css';
import Card from './components/Card';
import StartGameModal from './components/StartGameModal';
import PlayAgainModal from './components/PlayAgainModal';

function App() {
  const [pokemons, setPokemons] = useState(['default']);
  const [clickedCard, setClickedCard] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameState, setGameState] = useState('start');
  const [numberOfPokemons, setNumberOfPokemons] = useState(6); //can be called as gamemode, 6 = easy, 12 = medium, 18 = hard

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  const getPokemon = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    let name = data.name;
    name = name.charAt(0).toUpperCase() + name.slice(1)
    const imageSrc = data.sprites.front_default;
    return ({ id, name, imageSrc });
  };

  function handleClick(message) {
    if (!clickedCard.includes(message)) {
      const clickedCardArray = [...clickedCard];
      clickedCardArray.push(message);
      setClickedCard(clickedCardArray);
      setScore(score => (score + 1));
      shuffle(pokemons);

      if (numberOfPokemons === score + 1) {
        setGameState('over');
        if (score + 1 > bestScore) {
          setBestScore(score + 1);
        }
      } 
    } else {
      setGameState('over');
      if (score > bestScore) {
        setBestScore(score);
      }
    }
  }

  function handleStartGame(event) {
    if (event) {
      event.preventDefault();
    }
    setScore(0);
    setPokemons([]);
    setClickedCard([]);
    setGameState('game');
  }

  const fetchPokemonData = async () => {
    const newPokemons = [];
    for (let i = 0; i < numberOfPokemons; i++) {
      let randomPokemonId;
      do {
        randomPokemonId = getRandomNumber(1, 151);
      } while (newPokemons.some(pokemon => pokemon.pokemonData.id === randomPokemonId));
    
      const pokemonData = await getPokemon(randomPokemonId);
      newPokemons.push({
        id: uniqid(),
        pokemonData,
      });
    }
    setPokemons(newPokemons);
  }

  useEffect(() => {
    if (pokemons.length === 0) {
      fetchPokemonData();
    }
  }, [pokemons.length]);

  function renderGame() {
    switch(gameState) {
      case 'start':
        return <StartGameModal gamemode={numberOfPokemons} setGamemode={setNumberOfPokemons} handleStartGame={handleStartGame}/>;
      case 'game':
        return (
          <div className="cardsDiv">
            <p>Best score: {bestScore}</p>
            <p>Score: {score}</p>
            <div className="cards">
              {pokemons.map(({ id, pokemonData }) => (
                <Card key={id} pokemonData={pokemonData} handler={handleClick}/>
              ))}
            </div>
          </div>
        );
      case 'over':
        return <PlayAgainModal setGameState={setGameState} handlePlayAgain={handleStartGame} isWin={numberOfPokemons === score}/>
    }
  }

  return (
    <>
      {renderGame()}
    </>
  )
}

export default App;
