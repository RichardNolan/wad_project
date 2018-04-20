import React from "react";
import "./customQuiz.css";

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

		<div className="row">
			<div className="card col s10 offset-s1 ">
				<div className="card-content">
					<a 
						className="btn waves-effect teal lighten-4 black-text waves-teal answer"
						onClick={clickBooleanHandler} 				
						answer="True"
					>{props.correct_answer==="True" ? label : null} True</a>
					<br/>
					<a
						className="btn waves-effect teal lighten-4 answer waves-teal black-text "
						onClick={clickBooleanHandler} 				
						answer="False"
					>{props.correct_answer==="False" ? label : null} False</a>
				</div>
			</div>
		</div>
	);
};

export default CustomBooleanAnswer;