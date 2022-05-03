import React from "react";

export default function Question(props) {

    const choices = props.choice.map(item => (
        <button
        className="choice"
        key={item.id}
        name={item.choice}
        value={props.correct}
        selected={item.selected}
        onClick={ (event) => props.toggleSelect(event)}
        >
            {item.choice}
        </button>
    ))

    return (
        <div className="question">
            <h2 className="question--title">{props.question}</h2>
            <div className="choices--container">
                {choices}
            </div>
            <div className="border"></div>
        </div>
    )
}