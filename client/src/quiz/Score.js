import React from "react";

const Score = (props) => {
	let score = props.questions.filter(element=>element.correct===true).length;
	let Tscore =0;
	let dif = 0;
	props.questions.map((q)=>{
		if (q.correct){
			switch (q.difficulty){
			case "easy": dif = 1;
				break;
			case "medium": dif = 2;
				break;  
			case "hard": dif = 3;
				break;   
			default: dif= 0; 
	 		}
			Tscore = Tscore + dif;
		}		
	});

	return (
		<span>
		&nbsp; Correct: {score} / {props.questions.length}&nbsp;
		- Score: {Tscore} &nbsp;
		</span>
	);
};

export default Score;