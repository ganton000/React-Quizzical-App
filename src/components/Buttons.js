import React from "react";

export default function Buttons(props) {

    //pop out props.id in order to pass into button as value
    let id = props.choices.shift();
    let choices = ''

    if (props.getScore) {

        choices = props.choices.map(choice =>
            (<button
            key={id+choice}
            className={
                props.correct === choice ? "choice correct" :
                props.selected === choice ? "choice incorrect" :
                "choice"
            }
            name={choice}
            value={id}
            onClick={props.toggleSelect}
            >
                {choice}
            </button>
            ))
    } else {

        choices = props.choices.map(choice =>
            (<button
            key={id+choice}
            className={props.selected === choice ? "choice selected" : "choice"}
            name={choice}
            value={id}
            onClick={props.toggleSelect}
            >
                {choice}
            </button>
            ))
    }

    return (
    <div className="choices--container">
        {choices}
    </div>
    )

}