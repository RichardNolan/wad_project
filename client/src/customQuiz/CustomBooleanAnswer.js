import React from "react";

const CustomBooleanAnswer = (props) => {

	const clickBooleanHandler = (e)=>{
		// let pa = [true,false];	
		// props.setCorrect(e.currentTarget.attributes.answer.value==="true"?true:false);
		// props.setIncorrectBooleanAnswer(e.currentTarget.attributes.answer.value==="false"?pa.splice(0,1):pa.splice(1,1));
		
		let correct = e.currentTarget.attributes.answer.value==="true" ? true : false;

		// true/false might need to be strings and capitalize first letter

		props.setCorrect(correct);
		props.setIncorrectBooleanAnswer([!correct]);
	};
	let label = <i className="material-icons prefix">forward</i>;
	return (

		<div>
			<a  style={{maxWidth:"50%"}}
				className="waves-effect waves-light btn answer"
				onClick={clickBooleanHandler} 				
				answer="true"
			>{props.correct && label} true</a>
			<br/>
			<a style={{maxWidth:"50%"}}
				className="waves-effect waves-light btn answer"
				onClick={clickBooleanHandler} 				
				answer="false"
			>{!props.correct && label} false</a>

		</div>
	);
};

export default CustomBooleanAnswer;