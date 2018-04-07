import React from 'react';
import Question from './Question';
import Score from './Score';

const Quiz = (props) => {
  let questions = props.questions 
    ? props.questions.map((q, index)=><Question questionNumber={props.current+1} question={q} onCorrect={props.onCorrect} onIncorrect={props.onIncorrect} onMoveForward={props.onNext}/>) 
    : null;
  return (
    <div>
      <button onClick={props.onPrevious}>Previous</button>
      <Score questions={props.questions} />
      <button onClick={props.onNext}>Next</button>
      {questions ? questions[props.current] : null}

    </div>
  );
};

export default Quiz;
