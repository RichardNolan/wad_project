import React from 'react';
import Question from './Question';
const Quiz = (props) => {
  let questions = props.questions 
    ? props.questions.map((q, index)=><Question question={q} />) 
    : null;
  return (
    <div>
      <button onClick={props.onPrevious}>Previous</button>
      <button onClick={props.onNext}>Next</button>
      
      {questions ? questions[props.current] : null}

    </div>
  );
};

export default Quiz;
