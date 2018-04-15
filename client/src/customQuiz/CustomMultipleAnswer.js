import React from "react";
import "../quiz/question.css";

const CustomMultipleAnswer = (props) => {

	const answerCorrectHandler = (e)=>{
		props.setCorrect(e.currentTarget.value);
	};

	const answerIncorrectHandler = (e,index)=>{		
		props.setIncorrectAnswers(e.currentTarget.value,index);
	};
	// props.problems.indexOf(1)>=0 ? {color:'red'} : null
	return (
		<div>
			<div className="row">
				<div className="card col s10 offset-s1">
					<div className="input-field">
						<i className="material-icons prefix">done</i>
						<input type="text" id="ans_correct" value={props.correct} style={{background:"#D6F6ED"}} onChange={answerCorrectHandler}/>
						<label htmlFor="ans_correct">right answer here</label>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="card col s10 offset-s1">
					<div className="input-field">
						<i className="material-icons prefix">clear</i>
						<input type="text" style={{background:"#F9D9D4"}} id="ans_incorrect1" value={props.incorrect_answers[0]} onChange={(e)=>answerIncorrectHandler(e,0)}/>
						<label htmlFor="ans_incorrect1" >write a possible answer here</label>
					</div>
					<div className="input-field">
						<i className="material-icons prefix">clear</i>
						<input type="text" style={{background:"#F9D9D4"}} id="ans_incorrect2" value={props.incorrect_answers[1]} onChange={(e)=>answerIncorrectHandler(e,1)}/>
						<label htmlFor="ans_incorrect2">write a possible answer here</label>
					</div>
					<div className="input-field">
						<i className="material-icons prefix">clear</i>
						<input type="text" style={{background:"#F9D9D4"}} id="ans_incorrect3" value={props.incorrect_answers[2]} onChange={(e)=>answerIncorrectHandler(e,2)}/>
						<label htmlFor="ans_incorrect3" >write a possible answer here</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomMultipleAnswer;