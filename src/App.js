import React from "react";
import Start from "./components/Start";
import Question from "./components/Questions";
import { nanoid } from 'nanoid';
import swal from '@sweetalert/with-react';

export default function App() {

    const [startGame, setStartGame] = React.useState(false)

    const [allQuestions, setAllQuestions] = React.useState([])

    const [score, setScore] = React.useState(0)

    const [numSelected, setNumSelected] = React.useState(0)

    const [getScore, setGetScore] = React.useState(false)

    const [formData, setFormData] = React.useState({
        amount: "",
        category: "",
        difficulty: "",
        type: ""
    })

    //handles form data

    function handleChange(event) {

        const {name, value} = event.target

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }
        ))
    }

    //Sweet Alert
    function emptyerror() {
    swal({
        title: "Oh No...",
        text: "Please submit an answer for every question!",
        icon: "error"
      });
    }

    //parse strings
    function replaceStr(inp) {
        let res = inp.replaceAll("&#039;", "'").replaceAll("&quot;", '"').replaceAll("&amp;", "&").replaceAll("&auml;", "ä").replaceAll("&ouml;", "ö").replaceAll("&deg;","°").replaceAll("&ldquo;","“").replaceAll("&rdquo;","”").replaceAll("&hellip;","…").replaceAll("&lrm;","").replaceAll("&rlm;","").replaceAll("&aacute;","Á").replaceAll("&Aacute;","Á").replaceAll("&eacute;", "é").replaceAll("&shy;","-").replaceAll("&Uuml;", "Ü").replaceAll("&uuml;","ü").replaceAll("&rsquo;","’").replaceAll("&lsquo;","‘")
        return res
    }

    function startQuiz() {

        setScore(0)
        setNumSelected(0)
        setGetScore(false)
        setStartGame( prevState => !prevState )
    };

    function endQuiz() {

        if (numSelected < allQuestions.length){
            return emptyerror()
        }

        setGetScore(prevState => !prevState)
    }

    function toggleSelect(event) {

        const { name: selectedChoice, value: id } = event.target

        let setArr = []
        for (let obj of allQuestions){
            for (let item of obj){

                if (item.id === id){
                    //Adjusts toggle from prevMade selection to newSelection
                    if ((item.selected) && (selectedChoice !== item.selected)){
                        //if previous choice was correct
                        if (item.selected === item.correct) {
                            setArr.push([{
                                ...item,
                                selected: selectedChoice,
                            }])
                            setScore(prevState => prevState-1)
                        //if new choice is correct
                        } else if (selectedChoice === item.correct){
                            setArr.push([{
                                ...item,
                                selected: selectedChoice,
                            }])
                            setScore(prevState => prevState+1)
                        //if new and previous choices are incorrect
                        } else {
                            setArr.push([{
                                ...item,
                                selected: selectedChoice,
                            }])
                        }
                    //Accounts for previously selected
                    } else if (item.selected) {
                        //unselect a correct choice
                        if (selectedChoice === item.correct){
                            setArr.push([{
                                ...item,
                                selected: false,
                            }])
                            setScore(prevState => prevState-1)
                            setNumSelected(prevState => prevState-1)
                        //unselect an incorrect choice
                        } else {
                            setArr.push([{
                                ...item,
                                selected: false,
                            }])
                            setNumSelected(prevState => prevState-1)
                        }
                    //Account for brand new selections
                    } else {
                        //made correct choice
                        if (selectedChoice === item.correct){
                            setArr.push([{
                                ...item,
                                selected: selectedChoice,
                            }])
                            setScore(prevState => prevState+1)
                            setNumSelected(prevState => prevState+1)
                        //made incorrect choice
                        } else {
                            setArr.push([{
                                ...item,
                                selected: selectedChoice,
                            }])
                            setNumSelected(prevState => prevState+1)
                        }
                    }
                //set remaining items to as they were
                } else {
                    setArr.push([item])
                }
            }
        }
        setAllQuestions(setArr)
    }

    React.useEffect( () => {
        fetch(`https://opentdb.com/api.php?amount=${formData.amount}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`)
        .then(res => res.json())
        .then(data => data.results)
        .then(parsedData => {

            const questionsArray = parsedData.map(item => {

                const { question, correct_answer, incorrect_answers } = item

                incorrect_answers.push(correct_answer)
                let choicesArr = incorrect_answers.map(replaceStr)
                choicesArr.sort((a,b) => { return 0.5 - Math.random() } )

                const questionsArr = []
                questionsArr.push({
                    id: nanoid(),
                    question: replaceStr(question),
                    correct: replaceStr(correct_answer),
                    choices: choicesArr,
                    selected: false,
                    isCorrectAndSelected: false
                })

                return questionsArr;
            });

        setAllQuestions(questionsArray);
        });

    }, [startGame, formData]);


    const questions = allQuestions.map(item => (
        item.map(el => (
            <Question
            key={el.id}
            id={el.id}
            selected={el.selected}
            choice={el.choices}
            correct={el.correct}
            question={el.question}
            getScore={getScore}
            toggleSelect={toggleSelect}
            />
            ))
    ))

    return (
        <main>
            <div className="yellow--blob"></div>
            <div className="blue--blob"></div>
            <Start
            start={startGame}
            startQuiz={startQuiz}
            formData={formData}
            handleChange={handleChange}
            />
            <section
            className={startGame ? "questions--container" : "questions--container game"}>
                {questions}
            </section>
            {
                startGame && !getScore &&
                <button
                className="check--button"
                onClick={endQuiz}
                > Check answers </button>
            }
            {
                startGame && getScore &&
                <div className="play--again">
                    <p className="score">You scored {score}/{allQuestions.length} correct answers </p>
                    <button
                    className="play-again--button"
                    onClick={startQuiz}
                    > Play again </button>
                </div>
            }
        </main>
    )
}