import React from "react";

const CustomBooleanAnswer = (props) => {

	const clickBooleanHandler = (e)=>{
		// let pa = [true,false];	
		// props.setCorrect(e.currentTarget.attributes.answer.value==="true"?true:false);
		// props.setIncorrectBooleanAnswer(e.currentTarget.attributes.answer.value==="false"?pa.splice(0,1):pa.splice(1,1));
		
		let correct = e.currentTarget.attributes.answer.value;

		props.setCorrect(correct);
		props.setIncorrectBooleanAnswer([correct==="True" ? "False" : "True"]);
	};
	// let label = <div><i className="material-icons prefix">forward</i></div>;
	let label = <div className="symbol ">{"\u25B6"}</div>;
	return (

		<div>
			<a 
				className="waves-effect waves-light btn answer"
				onClick={clickBooleanHandler} 				
				answer="True"
			>{props.correct_answer==="True" ? label : null} True</a>
			<br/>
			<a
				className="waves-effect waves-light btn answer"
				onClick={clickBooleanHandler} 				
				answer="False"
			>{props.correct_answer==="False" ? label : null} False</a>

		</div>
	);
};

export default CustomBooleanAnswer;