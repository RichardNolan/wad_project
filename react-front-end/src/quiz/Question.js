import React from "react";
import "./question.css";

const Question = (props) => {
	let { category, correct, difficulty, question } = props.question;
	let correct_index = props.question.possible_answers.indexOf(props.question.correct_answer);
	const clean = text => {
		let x = (text.indexOf("&")>=0 && text.indexOf("<span")<0) ? <span dangerouslySetInnerHTML={{__html: text}}/> : text;
		// console.log(x);
		return x;
	};

	let possible_answers = props.question.possible_answers.map(el=> clean(el));
	question = clean(question);

	possible_answers = possible_answers.map((pa, key)=>{
		let isDisabled = correct!==undefined;
		return (
			<button 
				onClick={checkAnswer} 
				key={key}    //private to react
				index={key}
				disabled={isDisabled}
			>
				{pa}
			</button>
		);
	});

	function checkAnswer(e){
		console.log(e.target,"||", e.currentTarget);
		console.log("------------SELECTEDINDEX 1---------------", e.currentTarget.getAttribute("index"));
		let selected_index = parseInt(e.currentTarget.getAttribute("index"), 10);
		console.log("------------SELECTEDINDEX 2---------------", selected_index,correct_index);
		(selected_index===correct_index) && props.onCorrect();
		(selected_index!==correct_index) && props.onIncorrect();
		moveForward();
	}

	function moveForward(){
		setTimeout(()=>{props.onMoveForward();},1000);
	}

	function difficultyStars(){
		if(difficulty==="easy") return "*";
		if(difficulty==="medium") return "**";
		if(difficulty==="hard") return "***";
	}

	
	let correct_answer= clean(props.question.correct_answer);
	console.log("CLEANING======>", props.question.correct_answer, correct_answer);
	let incorrect_statement = `Incorrect  -  The correct answer is: ${correct_answer}`;
	let correct_statement = `Correct  -  The answer is: ${correct_answer}`;
	let statement = correct===true ? correct_statement : (correct===false ? incorrect_statement : null);
	return (
		<div>
			<h5>{category} - {difficultyStars()}</h5>
			<h2>{props.questionNumber}._ {question}</h2>
			{possible_answers}
			<h4>{statement}</h4>
		</div>
	);
};

export default Question;