import wordBank from "../wordle-bank.txt"
export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
]

export const generateWordSet = async () =>
{
    let wordSet;
    let randWinWord;
    await fetch(wordBank).then((response) => response.text()).then((result) =>
    {
        const wordArr = result.split("\n")
        wordSet = new Set(wordArr)
        randWinWord = wordArr[Math.floor(Math.random() * wordArr.length)]
    });
    return { wordSet, randWinWord };
};