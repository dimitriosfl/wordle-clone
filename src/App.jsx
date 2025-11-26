import './App.css'
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import { createContext, useEffect, useState } from 'react';
import { boardDefault, generateWordSet } from './components/Words';
import GameOver from './components/GameOver';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const AppContext = createContext();

function App()
{
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })
  const [correctWord, setCorrectWord] = useState("")

  useEffect(() =>
  {
    generateWordSet().then((words) =>
    {
      setWordSet(words.wordSet);
      setCorrectWord(words.randWinWord)
    })
  }, [])

  const onSelectLetter = (keyVal) =>
  {
    if (gameOver.gameOver || currAttempt.letterPos > 4) return;

    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
  }

  const onDelete = () =>
  {
    if (gameOver.gameOver || currAttempt.letterPos === 0) return;

    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
  }

  const onEnter = () =>
  {
    if (gameOver.gameOver || currAttempt.letterPos !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++)
    {
      currWord += board[currAttempt.attempt][i]
    }

    if (!wordSet.has(currWord.toLowerCase()))
    {
      alert("Word not found.");
      const newBoard = [...board];
      for (let i = 0; i < 5; i++)
      {
        newBoard[currAttempt.attempt][i] = "";
      }
      setBoard(newBoard);
      setCurrAttempt({ ...currAttempt, letterPos: 0 });
    }


    if (currWord.toLowerCase() === correctWord)
    {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }


    if (currAttempt.attempt >= 5)
    {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }


    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
  }

  return (
    <div className="App">
      <nav>
        <h1>Wordle-clone</h1>
        <div className="social-links">
          <a href={"https://github.com/dimitriosfl"} target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} color="gray" />
          </a>
          <a href={"https://www.linkedin.com/in/dimitriosfl/"} target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} color="gray" />
          </a>
        </div>
      </nav>
      <p><b>Instructions:</b> Try and find the world. If a letter becomes yellow, it is in the word, if it is green, it is also in the correct position.</p>
      <AppContext.Provider value={{
        board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter,
        correctWord, disabledLetters, setDisabledLetters, gameOver, setGameOver
      }}>
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  )
}

export default App
