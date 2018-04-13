import React from "react";

const CustomBooleanAnswer = (props) => {

	const clickBooleanHandler = (e)=>{
		let pa = [true,false];
		let ia = pa.slice();	
		props.setPossibleAnswers(pa);
		props.setCorrect(e.currentTarget.attributes.answer.value==="true"?true:false);
		props.setIncorrectBooleanAnswer(e.currentTarget.attributes.answer.value==="false"?ia.splice(0,1):ia.splice(1,1));
	};
	
	return (

		<div>
			<a 
				className="waves-effect waves-light btn answer"
				onClick={clickBooleanHandler} 				
				answer="true"
			>true</a>
			<a 
				className="waves-effect waves-light btn answer"
				onClick={clickBooleanHandler} 				
				answer="false"
			>false</a>
		</div>
	);
};

export default CustomBooleanAnswer;