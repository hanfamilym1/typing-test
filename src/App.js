import React, { useState, useEffect } from "react";
import ogWords from "./ogWords";
import "./App.css";

function App() {
  // let firstRandomNum = Math.floor(Math.random() * ogWords.length)
  // let firstWord = ogWords[firstRandomNum]
  const [count, setCount] = useState(0);
  const [usedWords, setUsedWords] = useState([]);
  const [word, setWord] = useState("");
  const [typedWord, setTypedWord] = useState("");
  const [finished, setFinished] = useState(false);
  const [initiatedGame, setInitiatedGame] = useState(false);
  const [timer, setTimer] = useState(60);

  const chooseNewWord = () => {
    // newWords are words filtered with the usedWords in order to take them out
    let newWords = ogWords.filter((word) => !usedWords.includes(word));
    let randomNum = Math.floor(Math.random() * newWords.length);
    // chosen word after this;
    let newWord = newWords[randomNum];
    if (newWords.length === 0) {
      setFinished(true);
    }
    setUsedWords((usedWords) => [...usedWords, newWord]);
    wordsPerMin();
    return newWord;
  };

  const wordsPerMin = () => {
    console.log(usedWords);
    setCount(usedWords.length);
  };

  // play Game needs to have the logic between the content.
  useEffect(() => {
    if (initiatedGame) {
      var countdown = setInterval(() => {
        setTimer((timer) => {
          const updatedTimer = timer - 1;
          if (timer === 0) {
            setFinished(true);
            return 60;
          }
          return updatedTimer;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [initiatedGame]);

  const playGame = () => {
    let newWord = chooseNewWord();
    setWord(newWord);
    setInitiatedGame(true);
    setFinished(false);
  };

  const handleChange = (event) => {
    if (usedWords.length === 0) {
      setInitiatedGame(true);
    }
    setTypedWord(event.target.value);
    if (typedWord === word) {
      let newWord = chooseNewWord();
      setWord(newWord);
      setTypedWord("");
    }
  };

  const tryAgain = () => {
    setInitiatedGame(false);
    setTimer(60);
    setFinished(false);
    setUsedWords([]);
  };

  return (
    <div className="App">
      {!initiatedGame ? (
        <>
          <h1>Start Game</h1>
          <button onClick={playGame}>Start</button>
        </>
      ) : (
        [
          finished ? (
            <>
              <h1>COMPLETED</h1>
              <h3>{count} WPM</h3>
              <button onClick={tryAgain}>Try Again</button>
            </>
          ) : (
            <>
              <h1>{word}</h1>
              <input type="text" value={typedWord} onChange={handleChange} />
              <h3>{count}</h3>
              <h4>{timer}</h4>
            </>
          ),
        ]
      )}
    </div>
  );
}

export default App;
