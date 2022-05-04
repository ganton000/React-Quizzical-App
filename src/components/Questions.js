import React from "react";
import Buttons from "./Buttons";
export default function Question(props) {

    //Add props.id to front of props.choice list to be used
    //in Buttons.js Button element
    props.choice.unshift(props.id)

    return (
        <div className="question">
            <h2 className="question--title">{props.question}</h2>
                <Buttons
                choices={props.choice}
                toggleSelect={props.toggleSelect}
                selected={props.selected}
                correct={props.correct}
                getScore={props.getScore}
                />
            <div className="border"></div>
        </div>
    )
}