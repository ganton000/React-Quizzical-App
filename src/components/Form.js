import React from "react";



export default function Form(props) {

    const {formData, handleChange} = props;

    return (
        <div className="form">
                <form>
                    <label htmlFor="amount">Amount of Questions:</label>
                    <br />
                    <select
                    id="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    name="amount"
                    >
                        <option value="">-- Choose Amount --</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <br />
                    <label htmlFor="category">Select Category:</label>
                    <br />
                    <select
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    name="category"
                    >
                        <option value="">Any Category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals & Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science &amp; Nature</option>
                        <option value="18">Computers</option>
                        <option value="19">Mathematics</option>
                        <option value="20">Mythology </option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities </option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                        <option value="32">Entertainment: Cartoons &amp; Animations</option>
                    </select>
                    <br />
                    <label htmlFor="difficulty">Select Difficulty:</label>
                    <br />
                    <select
                    id="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    name="difficulty"
                    >
                        <option value="">Any Difficulty</option>
                        <option value="easy">easy</option>
                        <option value="medium">medium</option>
                        <option value="hard">hard</option>
                    </select>
                    <br />
                    <label htmlFor="type">Select Type: </label>
                    <br />
                    <select
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                    name="type"
                    >
                        <option value="">Any Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True/False</option>
                    </select>
                    <br />
                </form>
        </div>
    )
}