import React from "react";

const Score = (props) => {
	let score = props.questions.filter(element=>element.correct===true).length;
	// let Tscore =0;
	// let dif = 0;

	// props.questions.map((q)=>{
	// 	if (q.correct){
	// 		switch (q.difficulty){
	// 		case "easy": dif = 1;
	// 			break;
	// 		case "medium": dif = 2;
	// 			break;  
	// 		case "hard": dif = 3;
	// 			break;   
	// 		default: dif= 0; 
	//  		}
	// 		Tscore = Tscore + dif;
	// 	}		
	// });

	let difficultyArray = ["none", "easy", "medium", "hard"]
	let Tscore = props.questions.reduce((t,q)=>{
		return q.correct ?  t + difficultyArray.indexOf(q.difficulty) : t;
	},0);

	return (
		<span style={{marginLeft:"10px", marginRight:"10px"}}>
			Correct: {score} / {props.questions.length} - Score: {Tscore}
		</span>
	);
};

export default Score;