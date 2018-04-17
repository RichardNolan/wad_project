import React from "react";
import Question from "./Question";
import Score from "./Score";

import "./quiz.css";


const Quiz = (props) => {
	let questions = props.questions ? props.questions.map((q, index)=>(
		<Question 
			key={index}
			questionNumber={props.current+1} 
			question={q} 
			onCorrect={props.onCorrect} 
			// onIncorrect={props.onIncorrect} 
			onMoveForward={props.onNext}
		/>
	)) 
		: null;
	return (
		<div>
			<a 
				className="waves-effect btn "
				onClick={props.onPrevious}
			>&#9666;</a>
			{/* <button onClick={props.onPrevious}>Previous</button> */}
			<Score questions={props.questions} />
			{/* <button onClick={props.onNext}>Next</button> */}
			<a 
				className="waves-effect btn "
				onClick={props.onNext}
			>&#9656;</a>

			{questions ? questions[props.current] : null}



		</div>
	);
};

export default Quiz;
