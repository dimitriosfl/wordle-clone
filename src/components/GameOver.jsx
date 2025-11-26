import { useContext } from "react"
import { AppContext } from "../App"

export default function GameOver()
{
    const { gameOver, currAttempt, correctWord } = useContext(AppContext)
    return (
        <div className="gameOver">
            <h3>{gameOver.guessedWord ? "Great, you found the word!" : "You didn't find the word this time."}</h3>
            <h1>Correct word is: {correctWord}</h1>
            <h3>Refresh the page to play again.</h3>
            {gameOver.guessedWord && (<h3>You found the word in {currAttempt.attempt + 1} attempts.</h3>)}
        </div>
    );
}
