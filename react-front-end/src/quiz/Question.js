import React from 'react';
import './question.css'
const Question = (props) => {
    let { category, correct, correct_answer, difficulty, possible_answers, question } = props.question;
    
    possible_answers = possible_answers.map((pa, key)=>{
        // let label_correct = (correct && pa===correct_answer) ? "true" : null
        let isDisabled = correct!==undefined;
        return (
            <button 
                onClick={checkAnswer} 
                key={key}
                disabled={isDisabled}
            >
            {pa}
            </button>
        )
    })

    function checkAnswer(e){
       (e.target.innerText===correct_answer) && props.onCorrect();
       (e.target.innerText!==correct_answer) && props.onIncorrect();
        moveForward();
    }

    function moveForward(){
        console.log("we are in moveForward");
        setTimeout(()=>{props.onMoveForward()},4000)
    }

    function difficultyStars(){
        if(difficulty==="easy") return "*"
        if(difficulty==="medium") return "**"
        if(difficulty==="hard") return "***"
    }

    let incorrect_statement = `Incorrect  -  The correct answer is: ${correct_answer}`
    let correct_statement = `Correct  -  The answer is: ${correct_answer}`

    return (
        <div>
            <h5>{category} - {difficultyStars()}</h5>
            <h2>{props.questionNumber}._ {question}</h2>
            {possible_answers}
            <h4>{correct===true ? correct_statement : (correct===false ? incorrect_statement : null)}</h4>
        </div>
    );
};

export default Question;