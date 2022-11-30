import React, { useEffect, useState} from "react";
import './App.css';
import SingleCard from "./components/SingleCard";
import Card from "./components/Card";
import CardBack from "./components/CardBack";
import CountDownTimerDisplay from "./components/CountDownTimerDisplay";
import TurnDisplay from "./components/TurnDisplay";
import HighScore from "./components/HighScores";
import axios from 'axios';


// function builds array of color cards and randomizes their indexes
function fillArray()
{
  let colorCode;
  let swatches = [];

  for (var i = 0; i < 10; ++i)
  {
   colorCode = randColor();
   swatches.push(<div card = {i + 1} ><Card color = {colorCode} /></div>);
   swatches.push(<div card = {i + 1} ><Card color = {colorCode} /></div>);
  }  

  for (let i = swatches.length - 1; i > 0; i--)
  {
    const j = Math.floor(Math.random() * (i + 1));
    [swatches[i], swatches[j]] = [swatches[j], swatches[i]];
  }

  function randColor()
  {
    var colorCode = "#";
    var hex = "0123456789ABCDEF";

    for (var i = 0; i < 6; i++) 
    {
      colorCode += hex[Math.floor(Math.random() * 16)];
    }

    return colorCode;

  }

  return swatches;
}



 export default function App() {

  // declaration of variables with setState functions
  const [cardFront, setCardFront] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(true) 
  const [count, setCount] = useState(0)
  const [finished, setFinished] = useState(true)
  const [gameOne, setGameOne] = useState(true)
  const [playerName, setPlayerName] = useState("")
  const [time2, setTime2] = useState('0:00')
  const [scores, setScores] = useState([])
  const [scores2, setScores2] = useState([])
  const [isOver, setIsOver] = useState(true)
  

  const startGame = () =>
  {
    const firstCards = fillArray()
      .map((cardFront) => ({...cardFront, id: Math.random(), matched: false}))

      setCardFront(firstCards)
  }

  // function call on start or when New Game button is pushed
  // fills cardFront array...adds id and matched boolean to each card front
  // resets card choices to null and integers to 0
  const newCards = () => {
    const newCards = fillArray()
      .map((cardFront) => ({...cardFront, id: Math.random(), matched: false}))
 
    //setPlayerName(prompt("Please Enter Your Name."));
    setCardFront(newCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
    setCount(0)
    setFinished(false)
    setGameOne(false)
    setDisabled(false)
    setIsOver(false)
  }

  // checks if a choice has been made when card is clicked and sets choiceOne or choiceTwo
 const handleChoice = (cardFront) => {
    choiceOne ? setChoiceTwo(cardFront): setChoiceOne(cardFront)
 }

// once two card choices have been made this function checks if the choice match
// if they match it iterates through the previous state of cardFront, finds cardFront
// that match choice and sets a new cardFront with its matched property to true
// finally it calls the reset function
 useEffect(() => {
    if (choiceOne && choiceTwo)
    {
      setDisabled(true)
        if (choiceOne.props.card === choiceTwo.props.card){
          setCount(prevCount => prevCount + 1)
            if(count === 9)
            {
              setFinished(true)
              submit()
              countScores()
              //deleteMax()
            }
          setTimeout(() =>
          setCardFront(prevCardFront => {
            return prevCardFront.map(cardFront => {
              if (cardFront.props.card === choiceOne.props.card)
              {
              
                return {...cardFront, matched: true}
              }
              else
              {
          
                return cardFront
              }
            })
          }), 1300)
          setTimeout(() => resetTurn(), 1300)
        }
        else{
          setTimeout(() => resetTurn(), 1300)
        }
    }
 }, [choiceOne, choiceTwo])


// sets choices back to null, add 1 to the turn count and re-enables onclick to choose card
 const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setDisabled(false)
  setTurns(prevTurns => prevTurns + 1)
 }

// calls the newCards function when the page initially loads
// without this there would be no cards visible on initial load
 useEffect(() =>{
    startGame()
 }, [])

 const submit = () => {
    const data = {
      name: playerName,
      time: time2
    };

    axios({
      url: 'https://mynodeserver.duckdns.org:8080/api/save',
      method: 'POST',
      data: data
    })
    .then(() => {
      console.log('Data has been sent to the server!')
    })
    .catch(() => {
      console.log('There was an error in sending the data to the server.')
    })

 };
 const countScores = () =>{
  axios.get('https://mynodeserver.duckdns.org:8080/api/size')
  .then((response) => {
    if (response.data >= 10)
      deleteMax()
    console.log('Data has been received!')
  })
  .catch(() => {
    console.log('There was an error receiving the data.')
  })
    setIsOver(true)
 }

 const deleteMax = () => {
  
    try{
        axios.delete('https://mynodeserver.duckdns.org:8080/api/delete/')
    }
    catch (error)
    {
      console.log(error)
    }
  
 };

 const handleChange = (event) => {
      const target = event.target
      const value = target.value

      setPlayerName(value);
 };

    return (
      <>
      <div className="score">
        {!isOver && <HighScore scores = {setScores}/>}
        {isOver && <HighScore scores = {setScores}/>}
        </div>
      <div className="App">
        <h1 className="App-header">Memory Game</h1>
        {!finished && <CountDownTimerDisplay active = {finished ? false : true} time = {setTime2}/>}
        {finished && <CountDownTimerDisplay time = {time2}/>}
        
        <TurnDisplay count={turns} />


          
            <div className="cards">
            {cardFront.map(cardFront => (
              <SingleCard 
                key = {cardFront.id}  
                cardFront = {cardFront}
                cardBack = {<CardBack />}
                handleChoice ={handleChoice}
                flipped={cardFront === choiceOne || cardFront === choiceTwo} 
                solved={cardFront.matched}
                disabled={disabled}/>
            ))}
          </div>
          <div>
            <input type={"text"} 
                    required placeholder="Name" 
                    value={playerName}
                    onChange={handleChange}> 
            </input>
          </div>
          {gameOne ?
          <button 
          onClick = {() => {
            newCards()
          }}> Start Game </button> : <button 
          onClick = {() => {
            newCards();
          }}> New Game </button>}
      </div>
      </>
    );
    
  }
