import { useContext, useEffect } from "react"
import { AppContext } from "../App"

export default function Letter({ letterPos, attemptVal })
{
    const { board, correctWord, currAttempt, setDisabledLetters } = useContext(AppContext);
    const letter = board[attemptVal][letterPos]


    let letterState = "";

    if (currAttempt.attempt > attemptVal)
    {
        const correctLetter = correctWord.toUpperCase()[letterPos];
        const isCorrect = correctLetter === letter;

        if (isCorrect)
        {
            letterState = "correct";
        } else if (letter !== "" && correctWord.toUpperCase().includes(letter))
        {
            letterState = "almost";
        } else if (letter !== "")
        {
            letterState = "error";
        }
    }


    useEffect(() =>
    {
        if (currAttempt.attempt > attemptVal && letter !== "" && !correctWord.toUpperCase().includes(letter))
        {
            setDisabledLetters((prev) => [...prev, letter]);
        }
    }, [currAttempt.attempt])

    return <div className="letter" id={letterState}>
        {letter}
    </div>
}
