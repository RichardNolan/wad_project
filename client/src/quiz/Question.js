import React from "react";
import "./question.css";

const clean = text => {
	let x = (text.indexOf("&")>=0 && text.indexOf("<span")<0) ? <span dangerouslySetInnerHTML={{__html: text}}/> : text;
	return x;
};

const Incorrect = (props)=>{
	return (
		<div className="result">
			{/* <div className="symbol incorrect">{'\u2718'}</div> */}
			<h5>The correct answer is: {props.text}</h5>
		</div>
	);
};

const Correct = (props)=>{
	return (
		<div className="result">
			{/* <div className="symbol correct">{'\u2714'}</div> */}
			{/* <h5>{props.text}</h5> */}
		</div>
	);
};


const Question = (props) => {
	let { category, correct, difficulty, question, chosen_index } = props.question;
	let raw_answers = props.question.possible_answers.slice();

	let correct_index = props.question.possible_answers.indexOf(props.question.correct_answer);
	
	let possible_answers = props.question.possible_answers.map(el=> clean(el));
	question = clean(question);

	possible_answers = possible_answers.map((pa, key)=>{
		let isDisabled = correct!==undefined;
		let tick_incorrect = correct===false && key===chosen_index ? <div className="symbol incorrect">{"\u2718"}</div> : null;
		let tick_correct = correct===true && key===chosen_index ? <div className="symbol correct">{"\u2714"}</div> : null;
		return (
			<div key={key} className="question_div"> 
				{tick_incorrect} 		
				{tick_correct} 		
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
		(selected_index===correct_index) && props.onCorrect(selected_index, true);
		(selected_index!==correct_index) && props.onCorrect(selected_index, false);
		moveForward();
	}

	function moveForward(){
		setTimeout(()=>{props.onMoveForward();},1500);
	}

	function difficultyStars(){
		if(difficulty==="easy") return "\u2605\u2606\u2606";
		if(difficulty==="medium") return "\u2605\u2605\u2606";
		if(difficulty==="hard") return "\u2605\u2605\u2605";
	}

	let correct_answer= clean(raw_answers[correct_index]);

	let statement = correct===true ? <Correct text={correct_answer}/>  : (correct===false ? <Incorrect text={correct_answer}/> : null);
	return (
		<div>
			<hr/>
			<h5>{category} - <span className="amber-text">{difficultyStars()}</span></h5>
			<h4 className="question_text">{props.questionNumber}. {question}</h4>
			{possible_answers}
			{statement}
			
		</div>
	);
};

export default Question;