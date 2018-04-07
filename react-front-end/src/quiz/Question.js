import React from 'react';
import './question.css'
const Question = (props) => {
    let { category, correct, correct_answer, difficulty, incorrect_answers, possible_answers, question, type } = props.question;
    possible_answers = possible_answers.map((pa, key)=>{
        let label_correct = (correct && pa===correct_answer) ? "true" : null
        return (
            <button 
                onClick={checkAnswer} 
                key={key}
                correct={label_correct}
            >
            {pa}
            </button>
        )
    })

    function checkAnswer(e){
       (e.target.innerText===correct_answer) && props.onCorrect()
       (e.target.innerText!==correct_answer) && props.onIncorrect()
    }

    return (
        <div>
            <h2>{question}</h2>
            {possible_answers}
            <h4>{correct!=undefined ? correct : null}</h4>
        </div>
    );
};

export default Question;