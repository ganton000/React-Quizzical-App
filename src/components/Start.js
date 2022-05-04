import React from "react";
import Form from "./Form";

export default function Start(props) {

    return (
        <section
        className={props.start ? "start game" : "start"}
        >
            <h1 className="start--title">Quizzical</h1>
            {/*<p className="start--description">Insert Description Here</p>*/}
            <Form
            formData={props.formData}
            handleChange={props.handleChange}
            />
            <button
            className="start--button"
            onClick={props.startQuiz}
            > Start quiz </button>
        </section>
    )
}