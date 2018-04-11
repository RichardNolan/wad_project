import React from "react";
import Question from "./Question";
import Score from "./Score";

import "./quiz.css";


const ResultsQuiz = (props) => {
	let questions = props.questions ? props.questions.map((q, index)=>(
		<Question 
			key={index}
			questionNumber={index+1}
			question={q} 
			correct={props.correct}
		/>
		
	)) 
		: null;
		
	return (
		<div>
			<h3><Score questions={props.questions} /></h3>
			<h3>Review</h3>
			{questions.questionNumber}{questions}

		</div>
	);
};

export default ResultsQuiz;
