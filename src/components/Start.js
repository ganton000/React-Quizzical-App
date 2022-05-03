import React from "react";


export default function Start(props) {

    return (
        <section
        className={props.start ? "start game" : "start"}
        >
            <h1 className="start--title">Quizzical</h1>
            <p className="start--description">Insert Description Here</p>
            <button
            className="start--button"
            onClick={props.startQuiz}
            > Start quiz </button>
        </section>
    )
}