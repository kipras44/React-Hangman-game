import { useState, useEffect } from "react"; // Importing necessary resources.
import State2 from './images/state2.GIF'
import State3 from './images/state3.GIF'
import State4 from './images/state4.GIF'
import State5 from './images/state5.GIF'
import State6 from './images/state6.GIF'
import State7 from './images/state7.GIF'
import State8 from './images/state8.GIF'
import State9 from './images/state9.GIF'
import State10 from './images/state10.gif'
import State11 from './images/state11.GIF'
import './Game.css'
import React from "react";
import GameOutcome from "./GameOutcome";

function Game () {
    let images = [State2, State3, State4, State5, State6, State7, State8, State9, State10, State11] // Creating an array for the images.

    const [word, setWord] = useState("") // Initialising necessary state using the use State hook.
    const [displayedWord, setDisplayedWord] = useState("")
    const [attempts, setAttempts] = useState(0)
    const [guessedLetters, setGuessedLetters] = useState([])
    const [gameResult, setGameResult] = useState(null)
    const [showPopUp, setShowPopUp] = useState(false)

    const fetchRandomWord = async () => {
        let url = `https://random-word-api.vercel.app/api?words=1&length=9` // This API I found provides a random word, and you can customise the length,
        const response = await fetch(url)                                   // so I chose it to be 9 characters long, to match up with the amount of images.
        const data = await response.json()
        const randomWord = data[0]
        setWord(randomWord)
        setDisplayedWord(randomWord.split("").fill("_").join(" ")) // Formatting the word to be displayed in the iconic hangman style.
    };

    useEffect(() => {
        fetchRandomWord()
    }, [])

    const handleClick = (letter) => { // Creating a function for the letters to be processed.
      letter = letter.toUpperCase();
      if(word.toUpperCase().includes(letter)) { // Here, I am checking whether or not the letters on the screen are in the random word I got from the API.
        let newDisplayedWord = displayedWord.split(" ")
        for(let i = 0; i < word.length; i++) {
          if(word[i].toUpperCase() === letter) {
            newDisplayedWord[i] = letter;
          }
        }
        setDisplayedWord(newDisplayedWord.join(" ")) // Setting the word to represent the letters that have been guessed correctly.
        if(!newDisplayedWord.includes("_")) { // Once the word doesn't contain any _ characters, the user wins.
          setGameResult(true);
          setShowPopUp(true);
        }
      }else{ 
          setAttempts(attempts + 1); // Incresing the attemps when the user gets it wrong.
          if(attempts === 8){
            setGameResult(false)
            setShowPopUp(true)
        }
      }
      setGuessedLetters([...guessedLetters, letter]) // Pushing the letters that have been used into an array.
  }

    const handlePlayAgain = () => { // Creating a function for if the Play Again button is clicked to simply refresh the page, hence getting a new word.
      window.location.reload();
  }

    const alphabet = ["A", "B", "C", "D", "E", "F", "G", // Creating an array for the letters.
        "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X", "Y", "Z"];

        // Mapping through the array to display all of the letters, giving them each a unique key.
    return (
        <div>
            <img src={images[attempts]} alt="hangman"></img>
            <p>{displayedWord}</p>
            {alphabet.map((letter) => ( 
                <button className="Buttons"
                        key={letter}
                        onClick={() => handleClick(letter)}
                        disabled={guessedLetters.includes(letter)}>
                    {letter}
                </button>
            ))}
             {showPopUp && (
                <GameOutcome result={gameResult} onPlayAgain={handlePlayAgain} />
            )}
        </div>
    )
}

export default Game
