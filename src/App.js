import React from "react";
import Start from "./components/Start";
import Question from "./components/Questions";
import { nanoid } from 'nanoid';
import swal from '@sweetalert/with-react';

export default function App() {

    const [startGame, setStartGame] = React.useState(false)

    const [allQuestions, setAllQuestions] = React.useState([])

    const [endQuiz, setEndQuiz] = React.useState({
        score: 0,
        numSelected: 0
    })

    let endScore = 0;

    //Sweet Alert
    function emptyerror() {
    swal({
        title: "Oh No...",
        text: "Please submit an answer for every question!",
        icon: "error"
      });
    }

    function endGame() {
        if (endQuiz.numSelected < 5){
            return emptyerror()
        }

        endScore = endQuiz.score
        setEndQuiz({score:0, numSelected:0})
    }

    function startQuiz() {
        setStartGame( prevState => !prevState )
    };

    function replaceStr(inp) {
        let res = inp.replaceAll("&#039;", "'").replaceAll("&quot;", '"').replaceAll("&amp;", "&").replace("&auml;", "ä").replace("&ouml;", "ö")
        return res
    }

    React.useEffect( () => {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
        .then(res => res.json())
        .then(data => data.results)
        .then(obj => obj.map(item => {

            let { question, incorrect_answers, correct_answer } = item

            let correct = replaceStr(correct_answer)
            let answerChoice = incorrect_answers.concat(correct).map( choice => replaceStr(choice))

            let container = {}

            container.id = nanoid()
            container.correct = correct
            container.question = replaceStr(question)
            container.choices = answerChoice.map( choice => (
                { id: nanoid(), choice: choice, selected: false }
            ))
            return container
        }))
        .then(parsedData => setAllQuestions(parsedData));
    }, []);

    function toggleSelect(event) {
        const { name: userChoice, selected, value: correctAns } = event.target

        let isCorrect = userChoice === correctAns;
        let mask = question => question.correct === correctAns;
        let mask2 = choices => choices.choice === userChoice;

        let indexToReplace = allQuestions.findIndex(mask)

        let currentQuestion = allQuestions.filter(mask)
        let currentQuestionChoices = currentQuestion[0].choices
        let indexToReplace2 = currentQuestionChoices.findIndex(mask2)

        //let userChoiceToUpdate = currentQuestionChoices.filter(mask2)
        //userChoiceToUpdate[0].selected = true

        if (!selected && isCorrect){
            allQuestions[indexToReplace].choices[indexToReplace2].selected = true
            setEndQuiz(prevState => ({
                score: prevState.score + 1,
                numSelected: prevState.numSelected + 1
            }))
        } else if (!selected && !isCorrect) {
            allQuestions[indexToReplace].choices[indexToReplace2].selected = true
            setEndQuiz(prevState => ({
                ...prevState,
                numSelected: prevState.numSelected + 1
            }))
        } else if (selected && !isCorrect) {
            allQuestions[indexToReplace].choices[indexToReplace2].selected = false
            setEndQuiz(prevState => ({
                ...prevState,
                numSelected: prevState.numSelected - 1
            }))
        } else {
            allQuestions[indexToReplace].choices[indexToReplace2].selected = false
            setEndQuiz(prevState => ({
                score: prevState.score - 1,
                numSelected: prevState.numSelected - 1
            }))
        }
        console.log(endQuiz.score, endQuiz.numSelected)
    }

    const questions = allQuestions.map(item => (
        <Question
        key={item.id}
        choice={item.choices}
        correct={item.correct}
        question={item.question}
        toggleSelect={toggleSelect}
        />
    ))
    return (
        <main>
            <div className="yellow--blob"></div>
            <div className="blue--blob"></div>
            <Start
            start={startGame}
            startQuiz={startQuiz}
            />
            <section
            className={startGame ? "questions--container" : "questions--container game"}>
                {questions}
            </section>
            {startGame && <button
            className="check--button"
            onClick={endGame}
            > Check answers </button> }
            {!startGame && endScore &&
            <div className="play--again">
                <p className="score">You scored {endScore}/5 correct answers </p>
                <button
            className="play-again--button"
            > Play again </button>
            </div>}
        </main>
    )
}