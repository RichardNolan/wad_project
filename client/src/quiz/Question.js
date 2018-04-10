import React from "react";
import "./question.css";

const clean = text => {
	let x = (text.indexOf("&")>=0 && text.indexOf("<span")<0) ? <span dangerouslySetInnerHTML={{__html: text}}/> : text;
	return x;
};

const Incorrect = (props)=>{
	return (
		<div className="result">
			<div className="symbol incorrect">{'\u2718'}</div>
			<h5>{props.text}</h5>
		</div>
	)
}

const Correct = (props)=>{
	return (
		<div className="result">
			<div className="symbol correct">{'\u2714'}</div>
			<h5>{props.text}</h5>
		</div>
	)
}


const Question = (props) => {
	let { category, correct, difficulty, question } = props.question;
	let raw_answers = props.question.possible_answers.slice();

	let correct_index = props.question.possible_answers.indexOf(props.question.correct_answer);
	
	let possible_answers = props.question.possible_answers.map(el=> clean(el));
	question = clean(question);

	possible_answers = possible_answers.map((pa, key)=>{
		let isDisabled = correct!==undefined;
		return (
			<div key={key}>  		
				<a 
					className="waves-effect waves-light btn answer"
					onClick={checkAnswer} 				
					index={key}
					disabled={isDisabled}
				>{pa}</a>
			</div>
		);
	});

	function checkAnswer(e){
		let selected_index = parseInt(e.currentTarget.getAttribute("index"), 10);
		(selected_index===correct_index) && props.onCorrect();
		(selected_index!==correct_index) && props.onIncorrect();
		moveForward();
	}

	function moveForward(){
		setTimeout(()=>{props.onMoveForward();},1000);
	}

	function difficultyStars(){
		if(difficulty==="easy") return '\u2718';
		if(difficulty==="medium") return '\u2718\u2718';
		if(difficulty==="hard") return '\u2718\u2718';
	}

	let correct_answer= clean(raw_answers[correct_index]);

	let statement = correct===true ? <Correct text={correct_answer}/>  : (correct===false ? <Incorrect text={correct_answer}/> : null);
	return (
		<div>
			<h5>{category} - {difficultyStars()}</h5>
			<h3>{props.questionNumber}. {question}</h3>
			{possible_answers}
			<h4>{statement}</h4>
		</div>
	);
};

export default Question;